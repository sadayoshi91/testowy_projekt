import React from 'react';
import { Contract } from '../../models/contract';
import { useCurrency } from '../context/CurrencyContext';
import { useI18n } from '../i18n';

interface Props {
  contracts?: Contract[];
  onAccept: (id: string) => void;
  onRefreshOffers?: () => void;
  refreshCost?: number;
  canRefresh?: boolean;
  darkMode?: boolean;
  currentDay?: number;
}

export function ContractsPanel({ contracts = [], onAccept, onRefreshOffers, refreshCost = 0, canRefresh = true, darkMode, currentDay = 1 }: Props) {
  const { formatMoney } = useCurrency();
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [difficulty, setDifficulty] = React.useState<'all' | 'starter' | 'standard' | 'advanced' | 'expert'>('all');
  const [hideLocked, setHideLocked] = React.useState(true);

  const difficultyLabels = React.useMemo<Record<string, string>>(() => ({
    all: t('contracts.difficulty.all'),
    starter: t('contracts.difficulty.starter'),
    standard: t('contracts.difficulty.standard'),
    advanced: t('contracts.difficulty.advanced'),
    expert: t('contracts.difficulty.expert'),
  }), [t]);

  const filtered = React.useMemo(() => {
    return contracts.filter(contract => {
      if (hideLocked && (contract.status === 'locked' || contract.status === 'claimed')) return false;
      if (difficulty !== 'all' && contract.difficulty !== difficulty) return false;
      if (searchTerm) {
        const haystack = `${contract.name} ${contract.description} ${contract.industry}`.toLowerCase();
        if (!haystack.includes(searchTerm.toLowerCase())) return false;
      }
      return true;
    });
  }, [contracts, hideLocked, difficulty, searchTerm]);

  return (
    <div className="contracts-panel">
      <div className="contracts-toolbar">
        <input
          type="text"
          placeholder={t('contracts.search')}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select value={difficulty} onChange={e => setDifficulty(e.target.value as any)}>
          {Object.entries(difficultyLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <label className="toggle">
          <input type="checkbox" checked={hideLocked} onChange={e => setHideLocked(e.target.checked)} />
          {t('contracts.hideLocked')}
        </label>
        {onRefreshOffers && (
          <button
            className="refresh"
            onClick={onRefreshOffers}
            disabled={!canRefresh}
            title={!canRefresh ? t('contracts.refreshTooltip') : undefined}
          >
            {refreshCost ? t('contracts.refreshCost', { cost: formatMoney(refreshCost) }) : t('contracts.refresh')}
          </button>
        )}
      </div>

      {filtered.length === 0 && (
        <div className="contracts-empty">{t('contracts.empty')}</div>
      )}

      {filtered.map(contract => (
        <div key={contract.id} className={`contract-card status-${contract.status}`}>
          <header>
            <div>
              <strong>{contract.name}</strong> <small>({t(`contracts.status.${contract.status}`) ?? contract.status})</small>
            </div>
            <span className="badge">{contract.industry ?? t('contracts.industryFallback')}</span>
          </header>
          <p className="description">{contract.description}</p>
          <div className="meta">
            <div>{t('contracts.difficultyLabel')}: {contract.difficulty ?? t('contracts.difficulty.standard')}</div>
            <div>{t('contracts.reward')}: <strong>{formatMoney(contract.reward)}</strong>{contract.penalty ? ` (${t('contracts.penalty', { amount: formatMoney(contract.penalty) })})` : ''}</div>
            <div>
              {t('contracts.deadline')}: {contract.deadline ? new Date(contract.deadline).toLocaleDateString() : t('contracts.deadlineNA')} ({contract.durationDays ?? '?'} {t('contracts.days')})
            </div>
            {contract.dueDay && (
              <div>{t('contracts.daysLeft')}: {Math.max(0, contract.dueDay - currentDay)}</div>
            )}
            {contract.expectedEffort && <div>{t('contracts.expectedEffort')}: {contract.expectedEffort} pts</div>}
            <div>{t('contracts.roles')}: {(contract.requiredRoles || []).join(', ')}</div>
            {contract.minReputation && (
              <div className="warning">{t('contracts.requiresRep', { value: contract.minReputation })}</div>
            )}
          </div>
          {typeof contract.progress === 'number' && (
            <div className="progress-bar" aria-label="progress">
              <span style={{ width: `${Math.min(100, Math.max(0, contract.progress))}%` }} />
              <small>{Math.round(Math.min(100, Math.max(0, contract.progress)))}%</small>
            </div>
          )}
          <div className="actions">
            {contract.status === 'available' && (
              <button onClick={() => onAccept(contract.id)}>{t('contracts.accept')}</button>
            )}
            {contract.status === 'claimed' && (
              <span className="claimed">{t('contracts.claimed', { name: contract.claimedBy || t('contracts.claimedFallback') })}</span>
            )}
            {contract.status === 'locked' && (
              <span className="locked">{t('contracts.locked')}</span>
            )}
            {contract.status === 'accepted' && <span className="accepted">{t('contracts.accepted')}</span>}
            {contract.status === 'completed' && <span className="completed">{t('contracts.completed')}</span>}
            {contract.status === 'expired' && <span className="expired">{t('contracts.expired')}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
