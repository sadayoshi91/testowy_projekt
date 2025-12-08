// src/app/components/SaveResultModal.tsx
import React from 'react';

export function SaveResultModal({ open, filepath, onClose }: { open: boolean; filepath: string|null; onClose: ()=>void }) {
  if (!open) return null;
  return (
    <div style={{ position:'fixed', left:0, top:0, right:0, bottom:0, background:'rgba(0,0,0,0.35)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:520, background:'#fff', padding:16, borderRadius:8 }}>
        <h3>Save result</h3>
        <div style={{ marginTop:8 }}>
          {filepath ? <div>Payroll history saved to:<br/><code style={{ wordBreak:'break-all' }}>{filepath}</code></div> : <div>Payroll history was downloaded via browser fallback.</div>}
        </div>
        <div style={{ marginTop:12, display:'flex', justifyContent:'flex-end' }}>
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
}
