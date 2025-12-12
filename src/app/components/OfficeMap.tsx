import React from 'react';
import { Office } from '../../models/office';
import { Employee } from '../../models/employee';
import { useI18n } from '../i18n';

interface OfficeMapProps {
  offices: Office[];
  employees: Employee[];
  darkMode?: boolean;
  onRent?: (officeId: string) => void;
  onAssignDesk?: (officeId: string, deskId: string, employeeId: string) => void;
}

const getInitials = (name?: string) => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

export const OfficeMap: React.FC<OfficeMapProps> = ({ offices, employees, darkMode, onRent, onAssignDesk }) => {
  const { t } = useI18n();
  return (
    <div className={`office-map${darkMode ? ' dark' : ''}`}>
      {offices.map(office => {
        const desks = office.desks || [];
        const occupied = desks.filter(d => d.assignedEmployeeId).length;
        const occupancy = desks.length ? Math.round((occupied / desks.length) * 100) : 0;
        return (
          <div key={office.id} className="office-card">
            <header>
              <div>
                <div style={{ fontWeight: 700 }}>{office.name}</div>
                <small style={{ opacity: 0.7 }}>{t('officeMap.rent')}: {office.rent}</small>
              </div>
              <div className="office-badge">
                {office.owned ? t('officeMap.active') : t('officeMap.forRent')}
              </div>
            </header>
            <div className="office-capacity">
              <div>{t('officeMap.occupancy', { occupied, total: desks.length })}</div>
              <div className="capacity-bar">
                <span style={{ width: `${occupancy}%` }} />
              </div>
            </div>
            {!office.owned && onRent && (
              <button
                className="office-rent"
                onClick={() => onRent(office.id)}
              >
                {t('officeMap.rentAction')}
              </button>
            )}
            <div className="desk-grid">
              {desks.map((desk, index) => {
                const occupant = employees.find(e => e.id === desk.assignedEmployeeId);
                return (
                  <div key={desk.id} className="desk-cell">
                    <div className="desk-meta">
                      <span className="desk-label">{t('officeMap.desk', { index: index + 1 })}</span>
                      {occupant && <span className="employee-bubble">{getInitials(occupant.name)}</span>}
                    </div>
                    <div className="desk-occupant">
                      {occupant ? (
                        <>
                          <strong>{occupant.name}</strong>
                          <small>{occupant.role}</small>
                        </>
                      ) : (
                        <span className="desk-empty">{t('officeMap.unassigned')}</span>
                      )}
                    </div>
                    {office.owned && onAssignDesk && (
                      <div className="desk-actions">
                        <select
                          value={desk.assignedEmployeeId || ''}
                          onChange={e => onAssignDesk(office.id, desk.id, e.target.value)}
                        >
                          <option value="">{t('officeMap.assignPlaceholder')}</option>
                          {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>
                          ))}
                        </select>
                        {desk.assignedEmployeeId && (
                          <button onClick={() => onAssignDesk(office.id, desk.id, '')}>{t('officeMap.clear')}</button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              {desks.length === 0 && (
                <div className="desk-cell" style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ opacity: 0.6 }}>{t('officeMap.noDesks')}</div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
