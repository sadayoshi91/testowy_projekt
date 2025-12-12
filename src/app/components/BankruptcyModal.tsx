import React from 'react';
import { useI18n } from '../i18n';

export function BankruptcyModal({ open, funds, onLoan, onInvestor, onRollback }: { open:boolean, funds:number, onLoan: (amt:number)=>void, onInvestor: ()=>void, onRollback: ()=>void }) {
  const { t } = useI18n();
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <p className="menu-eyebrow" style={{ marginBottom: 4 }}>{t('bankruptcy.eyebrow')}</p>
            <h2 style={{ margin: 0 }}>{t('bankruptcy.title')}</h2>
          </div>
          <span className="pill">{t('bankruptcy.badge', { funds: funds.toFixed(2) })}</span>
        </div>
        <p>{t('bankruptcy.body')}</p>
        <div className="option-grid">
          <div className="option-card">
            <h4>{t('bankruptcy.loan.title')}</h4>
            <p>{t('bankruptcy.loan.body')}</p>
            <button onClick={() => onLoan(2000)}>{t('bankruptcy.loan.action')}</button>
          </div>
          <div className="option-card">
            <h4>{t('bankruptcy.investor.title')}</h4>
            <p>{t('bankruptcy.investor.body')}</p>
            <button onClick={onInvestor}>{t('bankruptcy.investor.action')}</button>
          </div>
          <div className="option-card">
            <h4>{t('bankruptcy.rollback.title')}</h4>
            <p>{t('bankruptcy.rollback.body')}</p>
            <button onClick={onRollback}>{t('bankruptcy.rollback.action')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
