import React from 'react';
import { Office } from '../../models/office';
import { Employee } from '../../models/employee';
import { useCurrency } from '../context/CurrencyContext';
import { useI18n } from '../i18n';

export function OfficePanel({ offices, employees, onRent, onAssignDesk, onUpgradeDesk, darkMode }: {
 offices: Office[],
 employees: Employee[],
 onRent: (officeId: string) => void,
 onAssignDesk: (officeId: string, deskId: string, employeeId: string) => void,
 onUpgradeDesk: (officeId: string, deskId: string, upgradeId: string) => void,
 darkMode?: boolean
}) {
 const { formatMoney } = useCurrency();
 const { t } = useI18n();
 const panelStyle = {
 border: '1px solid',
 borderColor: darkMode ? '#444' : '#ccc',
 borderRadius:6,
 padding:10,
 background: darkMode ? '#232323' : '#fff',
 color: darkMode ? '#fff' : '#222',
 marginBottom:12
 };
 return (
 <div style={panelStyle}>
 <h3 style={{ color: darkMode ? '#fff' : '#222' }}>{t('office.title')}</h3>
 {offices.length ===0 && <div style={{ color: darkMode ? '#aaa' : '#777' }}>{t('office.none')}</div>}
 {offices.map(office => (
 <div key={office.id} style={{ borderBottom: '1px solid', borderColor: darkMode ? '#333' : '#eee', marginBottom:8, paddingBottom:8 }}>
 <div><strong>{office.name}</strong> <small>{office.owned ? t('office.owned') : t('office.forRent')}</small></div>
 <div>{t('office.rent')}: {formatMoney(office.rent || 0)}</div>
 {!office.owned && <button onClick={() => onRent(office.id)}>{t('office.rentAction')}</button>}
 {office.owned && (
 <div style={{ marginTop:8 }}>
 <strong>{t('office.desks')}</strong>
 <ul>
 {office.desks.map(desk => (
 <li key={desk.id}>
 {desk.name} — {t('office.assigned')}: {desk.assignedEmployeeId ? (employees.find(e => e.id === desk.assignedEmployeeId)?.name || t('office.assignedUnknown')) : t('office.assignedNone')}
 <select
 value={desk.assignedEmployeeId || ''}
 onChange={e => onAssignDesk(office.id, desk.id, e.target.value)}
 style={{ marginLeft:8 }}
 >
 <option value="">{t('office.assignPlaceholder')}</option>
 {employees.map(emp => (
 <option key={emp.id} value={emp.id}>{emp.name}</option>
 ))}
 </select>
 <button style={{ marginLeft:8 }} onClick={() => onUpgradeDesk(office.id, desk.id, 'upgrade1')}>{t('office.upgradeDesk')}</button>
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>
 ))}
 </div>
 );
}
