// src/app/components/ProjectList_enhanced.tsx
import React from 'react';
import { Employee } from '../../models/employee';

export function ProjectRowEnhanced({
  project,
  employees,
  onAssignSpecific,
  onUnassign,
  onDropEmployee
}: {
  project: any,
  employees: Employee[],
  onAssignSpecific?: (pid:string, empId:string)=>void,
  onUnassign?: (pid:string)=>void,
  onDropEmployee?: (pid:string, empId:string)=>void
}) {

  if (!project) return null;

  const name = project.name ?? "Unnamed project";
  const desc = project.description ?? "";
  const reward = project.reward ?? 0;

  const eff = typeof project.effort === "number" ? project.effort : 1;
  const prog = typeof project.progress === "number" ? project.progress : 0;
  const pct = Math.min(100, Math.round((prog / eff) * 10000) / 100);

  const roles = Array.isArray(project.requiredRoles) ? project.requiredRoles.join(", ") : "general";

  // fallback breakdown (your new Project model doesn't use design/dev/test)
  const design = 0;
  const development = 0;
  const testing = 0;

  const assignees: string[] = Array.isArray(project.assignees) ? project.assignees : [];

  return (
    <div
      style={{ border:'1px solid #ddd', padding:8, marginBottom:8, borderRadius:6, background:'#fff' }}
      onDragOver={(e)=>e.preventDefault()}
      onDrop={(e)=>{
        e.preventDefault();
        const empId = e.dataTransfer?.getData('text/employee-id') || e.dataTransfer?.getData('text/plain');
        if (empId && onDropEmployee) onDropEmployee(project.id, empId);
      }}
    >
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        <div>
          <strong>{name}</strong> <small>({roles})</small>
          <div style={{ fontSize:12, color:'#666' }}>{desc}</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div><strong>{reward}</strong> reward</div>
          <div style={{ fontSize:12 }}>Progress: {pct}%</div>
        </div>
      </div>

      <div style={{ height:10, background:'#eee', marginTop:6, borderRadius:4 }}>
        <div style={{ width: `${pct}%`, height:'100%', background:'#4caf50' }} />
      </div>

      <div style={{ marginTop:6 }}>
        <div><strong>Assigned:</strong> {assignees.length} {assignees.map(a=>`[${a}]`).join(" ")}</div>

        <div style={{ marginTop:6 }}>
          <select id={`sel-${project.id}`}>
            <option value="">-- choose employee --</option>
            {employees.map(emp=>(
              <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>
            ))}
          </select>

          <button
            style={{ marginLeft:6 }}
            onClick={()=>{
              const sel = document.getElementById(`sel-${project.id}`) as HTMLSelectElement;
              if (sel?.value && onAssignSpecific)
                onAssignSpecific(project.id, sel.value);
            }}
          >Assign</button>

          <button style={{ marginLeft:6 }} onClick={()=>onUnassign && onUnassign(project.id)}>
            Unassign last
          </button>
        </div>
      </div>

      <div style={{ fontSize:11, marginTop:6, color:'#777' }}>
        Work breakdown: {design}/{development}/{testing}
      </div>
    </div>
  );
}
