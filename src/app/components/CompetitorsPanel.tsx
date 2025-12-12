import React, { useMemo } from 'react';
import { HiArrowTrendingUp, HiCurrencyDollar, HiTrophy, HiUsers } from 'react-icons/hi2';
import { Competitor } from '../../models/competitor';
import { useI18n } from '../i18n';

type Props = {
  competitors: Competitor[];
  darkMode?: boolean;
};

const relationTone = (relation: string) => {
  if (relation === 'friendly') return 'relation-friendly';
  if (relation === 'hostile') return 'relation-hostile';
  return 'relation-neutral';
};

const resolveRelation = (competitor: Competitor & { relation?: string }) => {
  if (competitor.relation) return competitor.relation;
  if (competitor.aiLevel >= 70) return 'hostile';
  if (competitor.aiLevel <= 35) return 'friendly';
  return 'neutral';
};

export function CompetitorsPanel({ competitors }: Props) {
  const { t, lang } = useI18n();
  const sorted = useMemo(() => [...competitors].sort((a, b) => b.reputation - a.reputation), [competitors]);
  const top = sorted[0];
  const locale = lang === 'pl' ? 'pl-PL' : 'en-US';
  const compactCurrency = useMemo(() => new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }), [locale]);
  const compactNumber = useMemo(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }), [locale]);

  const totalFunds = sorted.reduce((sum, current) => sum + (current.funds || 0), 0);
  const totalContracts = sorted.reduce((sum, current) => sum + (current.completedContracts || 0), 0);
  const averageReputation = sorted.length
    ? Math.round(sorted.reduce((sum, current) => sum + (current.reputation || 0), 0) / sorted.length)
    : 0;

  const highlightCards = [
    { label: t('competitors.leader.label'), value: top?.name ?? t('competitors.leader.valueEmpty'), detail: top ? `${top.reputation} RP` : t('competitors.leader.detailWaiting'), Icon: HiTrophy },
    { label: t('competitors.capital.label'), value: compactCurrency.format(totalFunds), detail: t('competitors.capital.detail', { count: sorted.length || t('competitors.leader.valueEmpty') }), Icon: HiCurrencyDollar },
    { label: t('competitors.contracts.label'), value: compactNumber.format(totalContracts), detail: t('competitors.contracts.detail'), Icon: HiUsers },
    { label: t('competitors.reputation.label'), value: `${averageReputation} pkt`, detail: t('competitors.reputation.detail'), Icon: HiArrowTrendingUp },
  ];

  return (
    <div className="panel-stack">
      <div className="insight-grid">
        {highlightCards.map(({ label, value, detail, Icon }) => (
          <div className="insight-card" key={label}>
            <p className="insight-label">{label}</p>
            <h3>{value}</h3>
            <p className="insight-subtext">{detail}</p>
            <span className="insight-icon" aria-hidden="true">
              <Icon />
            </span>
          </div>
        ))}
      </div>

      {sorted.length === 0 ? (
        <div className="empty-state">{t('competitors.empty')}</div>
      ) : (
        <div className="competitors-grid">
          {sorted.map((competitor) => {
            const relation = resolveRelation(competitor as Competitor & { relation?: string });
            return (
              <article className="competitor-card" key={competitor.id}>
                <div className="competitor-head">
                  <div className="competitor-avatar">{competitor.name.slice(0, 2).toUpperCase()}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0 }}>{competitor.name}</h4>
                      <small className="muted">{t('officeMap.aiLevel', { value: competitor.aiLevel })}</small>
                  </div>
                    <span className={`relation-pill ${relationTone(relation)}`}>{t(`competitors.relation.${relation}`)}</span>
                </div>

                <div className="competitor-meta">
                    <span>{t('competitors.reputation')}: <strong>{competitor.reputation}</strong></span>
                    <span>{t('competitors.contracts')}: <strong>{competitor.completedContracts}</strong></span>
                    <span>{t('competitors.funds')}: <strong>{compactCurrency.format(competitor.funds)}</strong></span>
                </div>

                <div>
                    <small className="muted">{t('competitors.marketDynamics')}</small>
                  <div className="metric-bar">
                    <span style={{ width: `${Math.min(100, competitor.reputation)}%` }} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
