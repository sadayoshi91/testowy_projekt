// src/app/components/ProjectDetails.tsx
import React from 'react';
import { Employee } from '../../models/employee';
import { ProjectDetails } from './ProjectDetails';
import { useI18n } from '../i18n';

export function ProjectDetails({
    project,
    employees,
    onAssignSpecific,
    onUnassignSpecific,
    darkMode
}: {
    project: any | null,
    employees: Employee[],
    onAssignSpecific?: (projectId: string, employeeId: string) => void,
    onUnassignSpecific?: (projectId: string, employeeId: string) => void,
    darkMode?: boolean
}) {
    const { t } = useI18n();
    if (!project) {
        return <div style={{ padding:12, color: darkMode ? '#fff' : undefined }}>{t('projectDetails.noneSelected')}</div>;
    }

    // defensive access to numeric fields
    const effort = (typeof project.effort === 'number') ? project.effort : (project?.effort ? Number(project.effort) : 0);
    const progress = (typeof project.progress === 'number') ? project.progress : 0;
    const reward = (typeof project.reward === 'number') ? project.reward : (project?.reward ? Number(project.reward) : 0);
    const percent = effort > 0 ? Math.min(100, Math.round((progress / effort) * 10000) / 100) : 0;

    // safe lookup for breakdown fields (some projects may not have them)
    const work = project?.work ?? project?.breakdown ?? {};
    const design = (typeof work.design === 'number') ? work.design : (work.design ? Number(work.design) : 0);
    const development = (typeof work.development === 'number') ? work.development : (work.development ? Number(work.development) : 0);
    const testing = (typeof work.testing === 'number') ? work.testing : (work.testing ? Number(work.testing) : 0);

    // assignees: list of employee ids -> map to names
    const assigneeIds: string[] = Array.isArray(project.assignees) ? project.assignees : [];
    const assignees = assigneeIds.map(id => employees.find(e => e.id === id)).filter(Boolean) as Employee[];

    // select helper id for DOM select element
    const selId = `proj-assign-${project.id}`;

    return (
        <div style={{ padding:12, borderRadius:6, border: `1px solid ${darkMode ? '#444' : '#eee'}`, background: darkMode ? '#232323' : '#fff', color: darkMode ? '#fff' : '#222' }}>
            <h4 style={{ marginTop:0 }}>{project.name ?? t('projectDetails.unnamed')} <small style={{ color: darkMode ? '#aaa' : '#666' }}>({project?.type ?? project?.requiredRoles?.join(',') ?? t('projectDetails.typeFallback')})</small></h4>
            <div style={{ marginBottom:8 }}>{project.description ?? ''}</div>

            <div style={{ display: 'flex', gap:12 }}>
                <div style={{ minWidth:200 }}>
                    <div><strong>{t('projectDetails.design')}:</strong> {design}/{project?.designGoal ?? t('projectDetails.goalUnknown')}</div>
                    <div><strong>{t('projectDetails.development')}:</strong> {development}/{project?.developmentGoal ?? t('projectDetails.goalUnknown')}</div>
                    <div><strong>{t('projectDetails.testing')}:</strong> {testing}/{project?.testingGoal ?? t('projectDetails.goalUnknown')}</div>
                </div>

                <div style={{ minWidth:160 }}>
                    <div><strong>{t('projectDetails.effort')}:</strong> {effort}</div>
                    <div><strong>{t('projectDetails.progress')}:</strong> {Math.round(progress *100) /100} ({percent}%)</div>
                    <div><strong>{t('projectDetails.reward')}:</strong> {reward}</div>
                </div>
            </div>

            <div style={{ marginTop:12 }}>
                <strong>{t('projectDetails.assignedCount', { count: assignees.length })}:</strong>
                <ul>
                    {assignees.length ===0 ? <li style={{ color: darkMode ? '#aaa' : '#777' }}>{t('projectDetails.noAssignees')}</li> : assignees.map(a => (
                        <li key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>{a.name} <small style={{ color: darkMode ? '#aaa' : '#666' }}>({a.role})</small></span>
                            <div>
                                {onUnassignSpecific ? (
                                    <button style={{ marginLeft:8, background: darkMode ? '#333' : undefined, color: darkMode ? '#fff' : undefined, border: darkMode ? '1px solid #555' : undefined }} onClick={() => onUnassignSpecific(project.id, a.id)}>{t('projectDetails.remove')}</button>
                                ) : null}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{ marginTop:8 }}>
                <label htmlFor={selId} style={{ marginRight:8 }}>{t('projectDetails.assignLabel')}</label>
                <select id={selId} defaultValue="" style={{ background: darkMode ? '#222' : undefined, color: darkMode ? '#fff' : undefined, border: darkMode ? '1px solid #555' : undefined }}>
                    <option value="">{t('projectDetails.chooseEmployee')}</option>
                    {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name} ({emp.role}) - {t('projectDetails.prod', { value: emp.productivity?.toFixed?.(2) ?? emp.productivity ?? '0' })}</option>
                    ))}
                </select>
                <button style={{ marginLeft:8, background: darkMode ? '#333' : undefined, color: darkMode ? '#fff' : undefined, border: darkMode ? '1px solid #555' : undefined }} onClick={() => {
                    const sel = document.getElementById(selId) as HTMLSelectElement | null;
                    const val = sel?.value;
                    if (!val) {
                        alert(t('projectDetails.chooseAlert'));
                        return;
                    }
                    if (onAssignSpecific) onAssignSpecific(project.id, val);
                }}>{t('projectDetails.assign')}</button>
            </div>

        </div>
    );
}
