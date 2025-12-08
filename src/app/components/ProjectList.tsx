// src/app/components/ProjectList.tsx
import React from 'react';
import { Project } from '../../models/project';

export function ProjectRow({ project, onAssign, onUnassign }: { project: Project; onAssign: (pid:string)=>void; onUnassign: (pid:string)=>void }) {
  const pct = (project.progress.design + project.progress.development + project.progress.testing) / (project.workRequired.design + project.workRequired.development + project.workRequired.testing);
  return (
    <div style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8, borderRadius: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <strong>{project.name}</strong> <small style={{color:'#666'}}>({project.stage})</small>
          <div style={{ fontSize: 12, color: '#555' }}>{project.description}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div>Reward: {project.reward}</div>
          <div>Progress: {(pct*100).toFixed(1)}%</div>
        </div>
      </div>
      <div style={{ marginTop: 8 }}>
        <button onClick={()=>onAssign(project.id)}>Assign</button>
        <button onClick={()=>onUnassign(project.id)} style={{marginLeft:8}}>Unassign</button>
      </div>
    </div>
  );
}
