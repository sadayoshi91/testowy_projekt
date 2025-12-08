// src/app/components/EmployeesList.tsx
import React from 'react';
import { Employee } from '../../models/employee';

export function EmployeesList({ employees }: { employees: Employee[] }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {employees.map(emp => {

                // tooltip text — możesz dodać więcej jeśli chcesz
                const tooltip =
                    `${emp.name} (${emp.role}, ${emp.level})\n` +
                    `Morale: ${emp.morale?.toFixed(1)}\n` +
                    `Fatigue: ${emp.fatigue?.toFixed(1)}\n` +
                    `Base Productivity: ${emp.productivity?.toFixed(2)}\n` +
                    `Energy: ${emp.energy?.toFixed(1) ?? 'N/A'}\n` +
                    (emp.onBreak ? `Status: On Break` : `Status: Working`);

                return (
                    <div key={emp.id}
                        draggable
                        title={tooltip}
                        onDragStart={(e) => {
                            // use standard MIME for compatibility
                            e.dataTransfer?.setData('text/plain', emp.id);
                            // fallback custom MIME
                            e.dataTransfer?.setData('text/employee-id', emp.id);
                            e.dataTransfer?.setData('text/employee-name', emp.name);
                        }}
                        style={{
                            border: '1px solid #eee',
                            padding: 8,
                            borderRadius: 6,
                            background: '#fff',
                            cursor: 'grab',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>

                        <div>
                            <div style={{ fontWeight: 600 }}>
                                {emp.name} <small style={{ color: '#666' }}>({emp.role})</small>
                            </div>

                            <div style={{ fontSize: 12, color: '#555' }}>
                                Prod: {emp.productivity?.toFixed(2) ?? '0.00'} • Morale: {emp.morale}
                            </div>
                        </div>

                        <div style={{ alignSelf: 'center', fontSize: 12, color: '#333' }}>
                            {emp.level}
                        </div>

                    </div>
                );
            })}
        </div>
    );
}
