// src/app/components/EmployeePanel.tsx
import React from 'react';
import { Employee } from '../../models/employee';

export function EmployeeRow({ emp, onToggleBreak, onSetPace }: { emp: Employee; onToggleBreak: (id: string)=>void; onSetPace: (id:string, pace:'slow'|'normal'|'fast')=>void }) {
  return (
    <div style={{ border: '1px solid #eee', padding: 8, marginBottom: 6, borderRadius: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <strong>{emp.name}</strong> <small>({emp.role} • {emp.level})</small>
          <div style={{ fontSize: 12, color: '#555' }}>Salary: {emp.salary} | Prod: {emp.productivity}</div>
        </div>
        <div>
          <button onClick={()=>onToggleBreak(emp.id)}>{emp.onBreak ? 'Return' : 'Break'}</button>
        </div>
      </div>
      <div style={{ marginTop: 6, display: 'flex', gap: 8 }}>
        <div style={{ width: 120 }}>
          <div style={{ fontSize: 12 }}>Morale</div>
          <div style={{ height: 8, background: '#ddd', borderRadius: 4 }}><div style={{ width: Math.max(0, emp.morale) + '%', height: 8, background: '#6ab04c', borderRadius: 4 }} /></div>
        </div>
        <div style={{ width: 120 }}>
          <div style={{ fontSize: 12 }}>Fatigue</div>
          <div style={{ height: 8, background: '#ddd', borderRadius: 4 }}><div style={{ width: Math.min(100, emp.fatigue) + '%', height: 8, background: '#f6b93b', borderRadius: 4 }} /></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button onClick={()=>onSetPace(emp.id, 'slow')}>Slow</button>
          <button onClick={()=>onSetPace(emp.id, 'normal')}>Normal</button>
          <button onClick={()=>onSetPace(emp.id, 'fast')}>Fast</button>
        </div>
      </div>
    </div>
  );
}
