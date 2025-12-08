// src/app/components/AssignModal.tsx
import React, { useState } from 'react';
import { Employee } from '../../models/employee';

export function AssignModal({ open, onClose, employees, onAssign }: {
  open: boolean;
  onClose: ()=>void;
  employees: Employee[];
  onAssign: (ids: string[])=>void;
}) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  if (!open) return null;

  const toggle = (id: string) => setSelected(s => ({ ...s, [id]: !s[id] }));
  const selectedIds = Object.keys(selected).filter(k=>selected[k]);

  const totalProd = selectedIds.reduce((acc, id) => {
    const e = employees.find(x=>x.id===id);
    return acc + (e?.productivity || 0);
  }, 0);

  return (
    <div style={{ position:'fixed', left:0,top:0,right:0,bottom:0, background:'rgba(0,0,0,0.35)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width: 560, background:'#fff', padding:16, borderRadius:8 }}>
        <h3>Assign employees</h3>
        <div style={{ maxHeight: 320, overflowY:'auto' }}>
          {employees.map(emp=> (
            <div key={emp.id} style={{ display:'flex', alignItems:'center', gap:8, padding:6, borderBottom:'1px solid #f0f0f0' }}>
              <input type="checkbox" checked={!!selected[emp.id]} onChange={()=>toggle(emp.id)} />
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600 }}>{emp.name} <small style={{color:'#666'}}>({emp.role})</small></div>
                <div style={{ fontSize:12, color:'#555' }}>Prod: {emp.productivity?.toFixed(2) ?? '0.00'} • Morale: {emp.morale}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:12, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>Selected: {selectedIds.length} • Estimated work/tick: {totalProd.toFixed(2)}</div>
          <div>
            <button onClick={()=>{ onAssign(selectedIds); setSelected({}); onClose(); }}>Assign selected</button>
            <button style={{ marginLeft:8 }} onClick={()=>{ setSelected({}); onClose(); }}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
