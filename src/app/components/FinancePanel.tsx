import React, { useEffect, useMemo, useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { useI18n } from '../i18n';

type FinancePanelProps = {
  company: any;
  nextPayoutDays?: number;
  runPayrollNow: () => void;
  exportPayroll: () => void;
  updateSalary: (employeeId: string, value: number) => void;
  openConfirmation: (options: any) => void;
  darkMode?: boolean;
  onChangeInterval?: (days: number) => void;
};

export function FinancePanel({
  company,
  nextPayoutDays,
  runPayrollNow,
  exportPayroll,
  updateSalary,
  openConfirmation,
  onChangeInterval,
}: FinancePanelProps) {
  const { formatMoney } = useCurrency();
  const { t } = useI18n();
  const employees = Array.isArray(company?.employees) ? company.employees : [];
  const payrollHistory = Array.isArray(company?.payrollHistory) ? company.payrollHistory.slice(0, 4) : [];
  const [intervalValue, setIntervalValue] = useState<number>(company.payrollIntervalDays || 30);
  const [editedSalaries, setEditedSalaries] = useState<Record<string, number>>({});

  useEffect(() => {
    setIntervalValue(company.payrollIntervalDays || 30);
  }, [company.payrollIntervalDays]);

  useEffect(() => {
    setEditedSalaries(() => {
      const next: Record<string, number> = {};
      employees.forEach((emp: any) => {
        next[emp.id] = emp.salary || 0;
      });
      return next;
    });
  }, [employees]);

  const totalPayroll = useMemo(
    () => employees.reduce((acc: number, emp: any) => acc + (Number(emp?.salary) || 0), 0),
    [employees]
  );

  const runwayCycles = totalPayroll > 0 ? (company.funds || 0) / totalPayroll : null;
  const intervalDisabled = typeof onChangeInterval !== 'function';
  const countdown = typeof nextPayoutDays === 'number' ? nextPayoutDays : '—';

  const confirmRunPayroll = () => {
    openConfirmation({
      title: t('finance.confirmPayroll.title'),
      body: t('finance.confirmPayroll.body', { amount: formatMoney(totalPayroll) }),
      onConfirm: runPayrollNow,
    });
  };

  const confirmIntervalChange = () => {
    if (intervalDisabled) return;
    openConfirmation({
      title: t('finance.confirmInterval.title'),
      body: t('finance.confirmInterval.body', { days: intervalValue }),
      onConfirm: () => onChangeInterval?.(intervalValue),
    });
  };

  const handleSalaryChange = (id: string, value: number) => {
    setEditedSalaries((prev) => ({ ...prev, [id]: value }));
  };

  const handleSalarySave = (id: string) => {
    const value = Number(editedSalaries[id] ?? 0);
    updateSalary(id, value);
  };

  const insightCards = [
    { label: t('finance.funds'), value: formatMoney(company.funds || 0), detail: t('finance.runwayHint'), tone: company.funds < 0 ? 'trend-negative' : 'trend-positive' },
    { label: t('finance.payrollGross'), value: formatMoney(totalPayroll), detail: t('finance.runwayHint'), tone: 'trend-neutral' },
    { label: t('finance.nextPayroll'), value: `${countdown} ${t('finance.nextInDays')}`, detail: t('finance.nextPayroll'), tone: 'trend-neutral' },
    { label: t('finance.runway'), value: runwayCycles ? `${runwayCycles.toFixed(1)} cyklu` : 'n/d', detail: t('finance.runwayHint'), tone: runwayCycles && runwayCycles < 1 ? 'trend-negative' : 'trend-positive' },
  ];

  return (
    <div className="panel-stack">
      <div className="insight-grid">
        {insightCards.map((card) => (
          <div className="insight-card" key={card.label}>
            <p className="insight-label">{card.label}</p>
            <h3>{card.value}</h3>
            <p className={`insight-subtext ${card.tone}`}>{card.detail}</p>
          </div>
        ))}
      </div>

      <div className="finance-grid">
        <section className="finance-card">
          <h4>{t('finance.cycle')}</h4>
          <p className="insight-subtext">{t('finance.cycleHint')}</p>
          <div className="finance-actions" style={{ marginTop: 12 }}>
            <button className="finance-btn primary" onClick={confirmRunPayroll}>{t('finance.runPayroll')}</button>
            <button className="finance-btn" onClick={exportPayroll}>{t('finance.export')}</button>
          </div>
          <div style={{ marginTop: 18 }}>
            <label className="insight-label" htmlFor="interval-input">{t('finance.interval')}</label>
            <div className="input-cluster" style={{ marginTop: 8 }}>
              <input
                id="interval-input"
                className="salary-input"
                type="number"
                min={1}
                value={intervalValue}
                onChange={(event) => setIntervalValue(Math.max(1, Number(event.target.value)))}
              />
              <button className="finance-btn" onClick={confirmIntervalChange} disabled={intervalDisabled}>Zapisz</button>
            </div>
          </div>
        </section>

        <section className="finance-card">
          <h4>{t('finance.salaries')}</h4>
          {employees.length === 0 ? (
            <div className="muted">{t('finance.noEmployees')}</div>
          ) : (
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Pracownik</th>
                  <th>{t('finance.currentSalary')}</th>
                  <th>{t('finance.newSalary')}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp: any) => (
                  <tr key={emp.id}>
                    <td>
                      <div>{emp.name}</div>
                      <small className="muted">{emp.role}</small>
                    </td>
                    <td>{formatMoney(emp.salary || 0)}</td>
                    <td>
                      <input
                        className="salary-input"
                        type="number"
                        min={0}
                        value={editedSalaries[emp.id] ?? emp.salary ?? 0}
                        onChange={(event) => handleSalaryChange(emp.id, Number(event.target.value))}
                      />
                    </td>
                    <td>
                      <button className="finance-btn" onClick={() => handleSalarySave(emp.id)}>{t('finance.update')}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="finance-card">
          <h4>{t('finance.lastPayrolls')}</h4>
          {payrollHistory.length === 0 ? (
            <div className="muted">{t('finance.noPayrolls')}</div>
          ) : (
            <div className="finance-history">
              {payrollHistory.map((entry: any) => (
                <div className="history-item" key={entry.id}>
                  <span>{new Date(entry.date).toLocaleDateString('pl-PL')}</span>
                  <strong>{formatMoney(entry.total || 0)}</strong>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
