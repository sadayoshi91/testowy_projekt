// src/app/components/EmployeesList.tsx
import React from 'react';
import { Employee } from '../../models/employee';
import { useI18n } from '../i18n';

export function EmployeesList({ employees = [] }: { employees: Employee[] }) {
 const { t } = useI18n();
 if (!employees.length) {
 return <div className="empty-state">{t('employees.none')}</div>;
 }

 return (
 <div className="employee-grid">
 {employees.map((emp) => (
 <article key={emp.id} className="employee-card">
 <div className="employee-card__header">
 <div className="employee-card__name">
 <strong>{emp.name}</strong>
 <small>{emp.role}</small>
 </div>
 <span className="tag employee-card__level">{emp.level}</span>
 </div>
 <div className="employee-card__stats">
 <span>{t('employees.salary')}: {emp.salary?.toLocaleString?.() ?? emp.salary}</span>
 <span>{t('employees.prod')}: {Math.round(emp.productivity ?? 0)}</span>
 <span>{t('employees.morale')}: {Math.round(emp.morale ?? 0)}</span>
 <span>{t('employees.fatigue')}: {Math.round(emp.fatigue ?? 0)}</span>
 </div>
 {emp.unlockedRoles?.length ? (
 <div className="muted">{t('employees.unlocked')}: {emp.unlockedRoles.join(', ')}</div>
 ) : null}
 {emp.trainingHistory?.length ? (
 <div className="muted">{t('employees.trainingHistory')}: {emp.trainingHistory.join(', ')}</div>
 ) : null}
 {emp.trait && (
 <div className="employee-card__trait">
 {t('employees.trait')}: <strong>{emp.trait}</strong>
 {emp.traitDescription ? ` — ${emp.traitDescription}` : ''}
 </div>
 )}
 </article>
 ))}
 </div>
 );
}
