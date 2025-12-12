// src/app/components/EmployeePanel.tsx
import React from 'react';
import { Employee } from '../../models/employee';
import { useI18n } from '../i18n';

export function EmployeeRow({ emp, onToggleBreak, onSetPace }: { emp: Employee; onToggleBreak: (id: string)=>void; onSetPace: (id:string, pace:'slow'|'normal'|'fast')=>void }) {
  const { t } = useI18n();
  return (
    <div style={{ border: '1px solid #eee', padding: 8, marginBottom: 6, borderRadius: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <strong>{emp.name}</strong> <small>({emp.role} • {emp.level})</small>
          <div style={{ fontSize: 12, color: '#555' }}>{t('employeePanel.salary')}: {emp.salary} | {t('employeePanel.prod')}: {emp.productivity}</div>
        </div>
        <div>
          <button onClick={()=>onToggleBreak(emp.id)}>{emp.onBreak ? t('employeePanel.return') : t('employeePanel.break')}</button>
        </div>
      </div>
      <div style={{ marginTop: 6, display: 'flex', gap: 8 }}>
        <div style={{ width: 120 }}>
          <div style={{ fontSize: 12 }}>{t('employeePanel.morale')}</div>
          <div style={{ height: 8, background: '#ddd', borderRadius: 4 }}><div style={{ width: Math.max(0, emp.morale) + '%', height: 8, background: '#6ab04c', borderRadius: 4 }} /></div>
        </div>
        <div style={{ width: 120 }}>
          <div style={{ fontSize: 12 }}>{t('employeePanel.fatigue')}</div>
          <div style={{ height: 8, background: '#ddd', borderRadius: 4 }}><div style={{ width: Math.min(100, emp.fatigue) + '%', height: 8, background: '#f6b93b', borderRadius: 4 }} /></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button onClick={()=>onSetPace(emp.id, 'slow')}>{t('employeePanel.slow')}</button>
          <button onClick={()=>onSetPace(emp.id, 'normal')}>{t('employeePanel.normal')}</button>
          <button onClick={()=>onSetPace(emp.id, 'fast')}>{t('employeePanel.fast')}</button>
        </div>
      </div>
    </div>
  );
}
