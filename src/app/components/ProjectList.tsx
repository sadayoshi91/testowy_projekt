// src/app/components/ProjectList.tsx
import React from 'react';
import { Project } from '../../models/project';
import { useI18n } from '../i18n';

export function ProjectRow({ project, onAssign, onUnassign, darkMode }: { project: Project; onAssign: (pid:string)=>void; onUnassign: (pid:string)=>void; darkMode?: boolean }) {
  const { t } = useI18n();
  const pct = (project.progress as any)?.design + (project.progress as any)?.development + (project.progress as any)?.testing
    ? ((project.progress as any)?.design + (project.progress as any)?.development + (project.progress as any)?.testing) /
      ((project as any)?.workRequired?.design + (project as any)?.workRequired?.development + (project as any)?.workRequired?.testing)
    : 0;
  return (
    <div style={{ border: '1px solid', borderColor: darkMode ? '#444' : '#ddd', padding: 8, marginBottom: 8, borderRadius: 6, background: darkMode ? '#232323' : '#fff', color: darkMode ? '#fff' : '#222' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <strong>{project.name}</strong> <small style={{color: darkMode ? '#ccc' : '#666'}}>({(project as any).stage})</small>
          <div style={{ fontSize: 12, color: darkMode ? '#ccc' : '#555' }}>{project.description}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div>{t('projects.reward', { amount: project.reward })}</div>
          <div>{t('projectDetails.progress')}: {(pct*100).toFixed(1)}%</div>
        </div>
      </div>
      <div style={{ marginTop: 8 }}>
        <button style={{ background: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#222', border: '1px solid', borderColor: darkMode ? '#555' : '#ccc', borderRadius:4, padding: '4px10px', cursor: 'pointer' }} onClick={()=>onAssign(project.id)}>{t('projects.assign')}</button>
        <button style={{ background: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#222', border: '1px solid', borderColor: darkMode ? '#555' : '#ccc', borderRadius:4, padding: '4px10px', cursor: 'pointer', marginLeft:8 }} onClick={()=>onUnassign(project.id)}>{t('projects.unassignLast')}</button>
      </div>
    </div>
  );
}
