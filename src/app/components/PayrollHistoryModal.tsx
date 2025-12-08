// src/app/components/PayrollHistoryModal.tsx (uses electronAPI.savePayroll if available)
import React, { useEffect } from 'react';

export function PayrollHistoryModal({ open, onClose, history, onSaved }: { open: boolean; onClose: ()=>void; history: any[]; onSaved?: (filepath: string|null)=>void }) {
  useEffect(() => {
    if (!open) return;
    try {
      localStorage.setItem('payrollHistoryBackup', JSON.stringify(history || []));
    } catch (e) {
      console.warn('Could not autosave payroll history', e);
    }
  }, [history, open]);

  if (!open) return null;

  const exportCsv = async () => {
    const header = ['id','date','payroll','tax','rent','total'];
    const rows = history.map(h => [h.id, h.date, h.payroll, h.tax, h.rent, h.total]);
    const csv = [header, ...rows].map(r => r.join(',')).join('\n');

    // prefer secure IPC if available
    try {
      // @ts-ignore
      if (window && (window as any).electronAPI && typeof (window as any).electronAPI.savePayroll === 'function') {
        // send payload (structured array) to main process to save inside ./save
        const payload = history || [];
        // @ts-ignore
        const res = await (window as any).electronAPI.savePayroll(payload);
        if (res && res.success && res.path) {
          if (onSaved) onSaved(res.path);
          return;
        } else {
          // fallback to download if IPC indicates failure
          console.warn('IPC save failed', res && res.error);
        }
      }
    } catch (e) {
      console.warn('IPC save threw', e);
    }

    // browser fallback: download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payroll_history.csv';
    a.click();
    URL.revokeObjectURL(url);
    if (onSaved) onSaved(null);
  };

  return (
    <div style={{ position:'fixed', left:0, top:0, right:0, bottom:0, background:'rgba(0,0,0,0.35)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:760, maxHeight:'80vh', overflowY:'auto', background:'#fff', padding:16, borderRadius:8 }}>
        <h3>Payroll history</h3>
        <div style={{ marginTop:8 }}>
          <button onClick={exportCsv}>Save to file / Export CSV</button>
          <button style={{ marginLeft:8 }} onClick={onClose}>Close</button>
        </div>
        <div style={{ marginTop:12 }}>
          {history.length === 0 && <div style={{ color:'#666' }}>No payrolls yet</div>}
          {history.map((h:any, idx:number)=> (
            <div key={h.id || idx} style={{ padding:8, borderBottom:'1px solid #f0f0f0' }}>
              <div><strong>{new Date(h.date).toLocaleString()}</strong></div>
              <div>Payroll: {h.payroll.toFixed(2)} • Tax: {h.tax.toFixed(2)} • Rent: {h.rent.toFixed(2)} • Total: {h.total.toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:10, fontSize:12, color:'#666' }}>
          Autosaved copy stored in localStorage key: <code>payrollHistoryBackup</code>
        </div>
      </div>
    </div>
  );
}
