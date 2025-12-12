import React, { useMemo } from 'react';
import { Employee } from '../../models/employee';
import { useCurrency } from '../context/CurrencyContext';
import { useI18n } from '../i18n';

type Props = {
  employees: Employee[];
  company: any;
  darkMode?: boolean;
};

const skillKeys: (keyof Employee['skills'])[] = ['coding', 'design', 'marketing', 'research'];

export function StatsPanel({ employees, company }: Props) {
  const { formatMoney } = useCurrency();
  const { t } = useI18n();
  const totalEmployees = employees.length;
  const avgProductivity = totalEmployees
    ? employees.reduce((sum, emp) => sum + (emp.productivity || 0), 0) / totalEmployees
    : 0;
  const avgMorale = totalEmployees
    ? employees.reduce((sum, emp) => sum + (emp.morale || 0), 0) / totalEmployees
    : 0;
  const avgFatigue = totalEmployees
    ? employees.reduce((sum, emp) => sum + (emp.fatigue || 0), 0) / totalEmployees
    : 0;
  const avgSalary = totalEmployees
    ? employees.reduce((sum, emp) => sum + (emp.salary || 0), 0) / totalEmployees
    : 0;
  const totalPayroll = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
  const projects = Array.isArray(company.projects) ? company.projects : [];
  const activeProjects = projects.filter((p: any) => !(p.completed || p.status === 'completed')).length;
  const completedProjects = projects.length - activeProjects;
  const backlog = Array.isArray(company.contracts)
    ? company.contracts.filter((c: any) => c.status === 'available').length
    : 0;
  const recentEvents: string[] = (company.events || []).slice(0, 6);

  const moraleTone = avgMorale >= 70 ? 'trend-positive' : avgMorale <= 45 ? 'trend-negative' : 'trend-neutral';

  const summaryCards = [
    {
      label: t('stats.avgProductivity'),
      value: `${avgProductivity.toFixed(1)} pkt`,
      detail: t('stats.perEmployee'),
      tone: avgProductivity >= 6 ? 'trend-positive' : 'trend-neutral',
    },
    {
      label: t('stats.avgMorale'),
      value: `${avgMorale.toFixed(0)}%`,
      detail: avgMorale >= 70 ? t('stats.morale.great') : avgMorale <= 45 ? t('stats.morale.attention') : t('stats.morale.stable'),
      tone: moraleTone,
    },
    {
      label: t('stats.payrollCost'),
      value: formatMoney(totalPayroll),
      detail: t('finance.nextPayroll'),
      tone: company.funds >= totalPayroll ? 'trend-positive' : 'trend-neutral',
    },
  ];

  const skillAverages = useMemo(() =>
    skillKeys.map((skill) => {
      const total = employees.reduce((sum, emp) => sum + (emp.skills?.[skill] || 0), 0);
      return { key: skill, value: totalEmployees ? Math.round(total / totalEmployees) : 0 };
    }),
  [employees, totalEmployees]);

  return (
    <div className="panel-stack">
      <div className="insight-grid">
        {summaryCards.map((card) => (
          <div className="insight-card" key={card.label}>
            <p className="insight-label">{card.label}</p>
            <h3>{card.value}</h3>
            <p className={`insight-subtext ${card.tone}`}>{card.detail}</p>
          </div>
        ))}
      </div>

      <div className="stat-grid">
        <section className="stat-card stat-card--wide">
          <h4>{t('stats.teamState')}</h4>
          <div className="stat-metric">{t('stats.avgSalary')}: <strong>{formatMoney(avgSalary)}</strong></div>
          <div className="stat-metric">{t('stats.avgFatigue')}: <strong>{avgFatigue.toFixed(0)} pkt</strong></div>
          <div className="skill-list" style={{ marginTop: 12 }}>
            {skillAverages.map(({ key, value }) => (
              <div className="skill-row" key={key}>
                <label>{key}</label>
                <div className="metric-bar">
                  <span style={{ width: `${value}%` }} />
                </div>
                <span style={{ minWidth: 32, textAlign: 'right', fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="stat-card">
          <h4>{t('stats.projects')}</h4>
          <div className="stat-metric">Aktywne projekty: <strong>{activeProjects}</strong></div>
          <div className="stat-metric">{t('stats.completed')}: <strong>{completedProjects}</strong></div>
          <div className="stat-metric">{t('stats.backlog')}: <strong>{backlog}</strong></div>
          <div className="metric-bar" style={{ marginTop: 14 }}>
            <span style={{ width: `${projects.length ? (completedProjects / projects.length) * 100 : 0}%` }} />
          </div>
          <small className="muted">{t('stats.portfolio')}</small>
        </section>

        <section className="stat-card">
          <h4>{t('stats.timeline')}</h4>
          {recentEvents.length === 0 ? (
            <div className="muted">{t('stats.noLogs')}</div>
          ) : (
            <ul className="timeline-list">
              {recentEvents.map((event, index) => (
                <li className="timeline-item" key={index}>{event}</li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
