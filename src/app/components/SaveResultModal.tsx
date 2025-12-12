// src/app/components/SaveResultModal.tsx
import React from 'react';
import { useI18n } from '../i18n';

export function SaveResultModal({ open, filepath, onClose }: { open: boolean; filepath: string|null; onClose: ()=>void }) {
  const { t } = useI18n();
  if (!open) return null;
  return (
    <div style={{ position:'fixed', left:0, top:0, right:0, bottom:0, background:'rgba(0,0,0,0.35)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:520, background:'#fff', padding:16, borderRadius:8 }}>
        <h3>{t('saveResult.title')}</h3>
        <div style={{ marginTop:8 }}>
          {filepath ? <div>{t('saveResult.saved')}<br/><code style={{ wordBreak:'break-all' }}>{filepath}</code></div> : <div>{t('saveResult.fallback')}</div>}
        </div>
        <div style={{ marginTop:12, display:'flex', justifyContent:'flex-end' }}>
          <button onClick={onClose}>{t('saveResult.ok')}</button>
        </div>
      </div>
    </div>
  );
}
