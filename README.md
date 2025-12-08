    HR System package

    Files added:
    - src/models/employee.ts  (types)
    - src/systems/HRSystem.ts (simulation & utilities)
    - src/app/components/EmployeePanel.tsx (simple UI row for employees)

    How to use:

    1. Copy files into your project (merge with existing src folder). Ensure paths match:
   - D:/Projekt/src/models/employee.ts
   - D:/Projekt/src/systems/HRSystem.ts
   - D:/Projekt/src/app/components/EmployeePanel.tsx

2. In your App.tsx integrate HRSystem. Example usage:

import { HRSystem } from './systems/HRSystem';
import { EmployeeRow } from './components/EmployeePanel';

const hr = new HRSystem();

// hire example
const alice = hr.hireEmployee('Alice', 'developer', 'junior', 55);
setCompany(c => ({ ...c, employees: [...c.employees, alice] }));

// tick integration (called each tick or from TickManager):
setCompany(prev => hr.tickCompany(prev));

// UI handlers (toggle break / set pace):
function toggleBreak(id) { setCompany(c => ({ ...c, employees: c.employees.map(e=> e.id===id? {...e, onBreak: !e.onBreak} : e) })); }
function setPace(id, pace) { setCompany(c => ({ ...c, employees: c.employees.map(e=> e.id===id? {...e, workPace: pace} : e) })); }

3. Payroll & balancing:
 - HRSystem.calculateSalary(emp) gives salary; tickCompany deducts payroll every payIntervalTicks.

4. Tests:
 - Hire employees, press Start, observe morale/fatigue/productivity values.
 - Use EmployeePanel to give breaks and change pace.

If you want, I can patch your App.tsx to integrate HRSystem automatically - say "Patch App" and I'll generate the full updated App.tsx ready to paste.
