import React from 'react';
import { Training } from '../../models/training';
import { Employee } from '../../models/employee';
import { useCurrency } from '../context/CurrencyContext';
import { useI18n } from '../i18n';

export function TrainingsPanel({ trainings = [], employees = [], onStart, darkMode } : {
 trainings?: Training[],
 employees?: Employee[],
 onStart: (trainingId: string, employeeId: string) => void,
 darkMode?: boolean
}) {
 const { formatMoney } = useCurrency();
 const { t } = useI18n();
 const panelStyle = {
 border: '1px solid',
 borderColor: darkMode ? '#444' : '#ccc',
 borderRadius:6,
 padding:10,
 background: darkMode ? '#1e2a1e' : '#f9fff9',
 color: darkMode ? '#fff' : '#222',
 marginBottom:12
 };
 const trainingStyle = {
 borderBottom: '1px solid',
 borderColor: darkMode ? '#333' : '#eee',
 marginBottom:8,
 paddingBottom:8
 };
 const buttonStyle = {
 background: darkMode ? '#333' : '#fff',
 color: darkMode ? '#fff' : '#222',
 border: '1px solid',
 borderColor: darkMode ? '#555' : '#ccc',
 borderRadius:4,
 padding: '4px 10px',
 cursor: 'pointer',
 marginTop:4
 } as React.CSSProperties;
 if (!Array.isArray(trainings) || !Array.isArray(employees)) {
 return <div style={panelStyle}>{t('trainings.unavailable')}</div>;
 }
 const availableEmployees = (role: string) => employees.filter(e => e.role === role && !e.onTraining);

 const handleStart = (trainingId: string) => {
   const select = document.getElementById(`emp-sel-${trainingId}`) as HTMLSelectElement | null;
   if (select?.value) onStart(trainingId, select.value);
 };

 return (
 <div style={panelStyle}>
 <h3 style={{ color: darkMode ? '#fff' : '#222' }}>{t('trainings.title')}</h3>
 {(!trainings || trainings.length ===0) && <div style={{ color: darkMode ? '#aaa' : '#777' }}>{t('trainings.none')}</div>}
 {trainings && trainings.map(training => {
 const eligible = availableEmployees(training.role);
 const assigned = employees.find(e => e.id === training.assignedEmployeeId);
 const progressPct = Math.round(Math.min(100, Math.max(0, (training.progress || 0) * 100)));
 const daysLeft = training.status === 'in_progress'
   ? Math.max(0, (training.durationDays || 0) - Math.max(0, Math.floor((training.progress || 0) * (training.durationDays || 0))))
   : training.durationDays;
 return (
 <div key={training.id} style={trainingStyle}>
 <div><strong>{training.name}</strong> <small>({t(`trainings.status.${training.status}`) ?? training.status})</small></div>
 <div style={{ fontSize:13, color: darkMode ? '#ccc' : '#555' }}>{training.description}</div>
 <div>{t('trainings.role')}: {training.role}</div>
 <div>{t('trainings.skillGain')}: {training.skillGain}</div>
 <div>{t('trainings.duration')}: {training.durationDays} {t('trainings.days')}</div>
 <div>{t('trainings.cost')}: {formatMoney(training.cost || 0)}</div>
 {training.status === 'available' && (
 <div style={{ marginTop:4 }}>
 <select id={`emp-sel-${training.id}`} defaultValue="">
 <option value="">{t('trainings.chooseEmployee')}</option>
 {eligible.map(emp => (
 <option key={emp.id} value={emp.id}>{emp.name}</option>
 ))}
 </select>
 <button style={buttonStyle} disabled={!eligible.length} onClick={() => handleStart(training.id)}>{t('trainings.start')}</button>
 {!eligible.length && <div style={{ color: darkMode ? '#aaa' : '#777', fontSize:12 }}>{t('trainings.noEligible')}</div>}
 </div>
 )}
 {training.status === 'in_progress' && (
 <div style={{ marginTop:8 }}>
 <div>{t('trainings.assigned')}: {assigned?.name || 'N/A'}</div>
 <div>{t('trainings.daysLeft')}: {daysLeft}</div>
 <div className="progress-bar"><span style={{ width: `${progressPct}%` }} /><small>{progressPct}%</small></div>
 </div>
 )}
 {training.status === 'completed' && (
 <div style={{ marginTop:8, color: '#6fd17b' }}>
 {t('trainings.completed')}{assigned ? ` — ${assigned.name}` : ''}
 </div>
 )}
 </div>
 );
 })}
 </div>
 );
}
