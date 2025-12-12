import React from 'react';
import { useI18n } from '../i18n';

export function ConfirmationModal({ open, title, body, onConfirm, onCancel }: { open: boolean, title: string, body: React.ReactNode, onConfirm: ()=>void, onCancel: ()=>void }) {
  const { t } = useI18n();
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <h3 style={{ margin: 0 }}>{title}</h3>
        </div>
        <div>{body}</div>
        <div className="actions">
          <button className="btn-outline" onClick={onCancel}>{t('confirm.cancel')}</button>
          <button className="primary" onClick={onConfirm}>{t('confirm.confirm')}</button>
        </div>
      </div>
    </div>
  );
}
