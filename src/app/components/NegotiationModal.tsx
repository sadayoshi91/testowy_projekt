// src/app/components/NegotiationModal.tsx
import React, { useState } from 'react';

export function NegotiationModal({ open, onClose, employee, onPropose }: { open: boolean; onClose: ()=>void; employee: any; onPropose: (id:string, proposed:number)=>void }) {
  const [proposed, setProposed] = useState<number>(employee?.salary ?? Math.round((employee?.skill||50)*1.2));
  if (!open) return null;
  return (
    <div style={{ position:'fixed', left:0, top:0, right:0, bottom:0, background:'rgba(0,0,0,0.35)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:420, background:'#fff', padding:16, borderRadius:8 }}>
        <h3>Negotiate salary — {employee?.name}</h3>
        <div style={{ marginTop:8 }}>
          <div>Current salary: <strong>{(employee?.salary ?? Math.round((employee?.skill||50)*1.2)).toFixed(2)}</strong></div>
          <div style={{ marginTop:8 }}>
            <label>Propose new salary: </label><br />
            <input type="number" value={proposed} onChange={(e)=>setProposed(Number(e.target.value||0))} style={{ width:160 }} />
          </div>
        </div>
        <div style={{ marginTop:12, display:'flex', justifyContent:'flex-end', gap:8 }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={()=>{ onPropose(employee.id, proposed); onClose(); }}>Propose</button>
        </div>
      </div>
    </div>
  );
}
