// src/systems/HRSystem.ts
import { Employee, Skills, Role, Level } from '../models/employee';
import { CompanyState } from '../models/company';

export type HRConfig = {
  fatiguePerTick: { slow: number; normal: number; fast: number };
  recoveryPerTickOnBreak: number;
  moraleDecayPerTick: number;
  moraleGainOnGoodConditions: number;
  payIntervalTicks: number; // how many ticks between payrolls (for salary payment)
  baseSalaryMultiplier: { junior: number; mid: number; senior: number };
  roleSkillMultiplier: Record<Role, keyof Skills>;
  minSalary: number;
};

export const defaultHRConfig: HRConfig = {
  fatiguePerTick: { slow: 0.1, normal: 0.35, fast: 0.7 },
  recoveryPerTickOnBreak: 1.8,
  moraleDecayPerTick: 0.02,
  moraleGainOnGoodConditions: 0.15,
  payIntervalTicks: 60, // e.g. payroll every 60 ticks
  baseSalaryMultiplier: { junior: 0.8, mid: 1.0, senior: 1.6 },
  roleSkillMultiplier: { developer: 'coding', designer: 'design', marketer: 'marketing', researcher: 'research' },
  minSalary: 50
};

export class HRSystem {
  config: HRConfig;
  private ticksSincePayroll = 0;

  constructor(cfg?: Partial<HRConfig>) {
    this.config = { ...defaultHRConfig, ...(cfg || {}) };
  }

  // Calculate salary based on skill and level
  calculateSalary(emp: Employee): number {
    const roleSkillKey = this.config.roleSkillMultiplier[emp.role];
    const skill = (emp.skills as any)[roleSkillKey] as number;
    // salary = base * (skill/100) * levelMultiplier
    const levelMult = this.config.baseSalaryMultiplier[emp.level];
    const base = Math.max(this.config.minSalary, 100 + skill * 2); // base depends on skill
    const salary = Math.round(base * levelMult);
    return salary;
  }

  // compute productivity as function of primary skill, morale and fatigue
  computeProductivity(emp: Employee): number {
    const roleSkillKey = this.config.roleSkillMultiplier[emp.role];
    const skill = (emp.skills as any)[roleSkillKey] as number;
    // productivity base is skill/10 (so skill 50 -> 5 units/tick)
    const baseProd = skill / 10;
    // fatigue reduces productivity (linear factor 0..1)
    const fatFactor = Math.max(0, 1 - emp.fatigue / 120); // fatigue up to 120 reduces fully
    // morale as percent 0..1 (below 50 reduces)
    const moraleFactor = Math.max(0.35, emp.morale / 100);
    // pace multiplier
    const paceMult = emp.workPace === 'fast' ? 1.25 : emp.workPace === 'slow' ? 0.85 : 1.0;
    const prod = +(baseProd * fatFactor * moraleFactor * paceMult).toFixed(3);
    return Math.max(0, prod);
  }

    // called each tick to update employee's state; returns updated employee
    tickEmployee(emp: Employee): Employee {
        // copy to avoid mutating the original directly
        const e: Employee = { ...emp };

        if (e.onBreak) {
            // recover fatigue and morale while on break
            e.fatigue = Math.max(0, +(e.fatigue - this.config.recoveryPerTickOnBreak).toFixed(3));
            e.morale = Math.min(100, +(e.morale + this.config.moraleGainOnGoodConditions).toFixed(3));

            // IMPORTANT: when on break, employee does not produce work (no income)
            e.productivity = 0;
            return e;
        } else {
            // increase fatigue according to work pace
            const inc = this.config.fatiguePerTick[e.workPace || 'normal'] || this.config.fatiguePerTick.normal;
            e.fatigue = Math.min(150, +(e.fatigue + inc).toFixed(3)); // allow slight over 100 as buffer
            // morale slowly drifts down if fatigue high
            if (e.fatigue > 80) {
                e.morale = Math.max(0, +(e.morale - this.config.moraleDecayPerTick * (e.fatigue - 70)).toFixed(3));
            } else {
                // small morale recovery when comfortable
                e.morale = Math.min(100, +(e.morale + this.config.moraleGainOnGoodConditions * 0.02).toFixed(3));
            }
        }

        // Recompute productivity (only when not on break)
        e.productivity = this.computeProductivity(e);

        return e;
    }




  // Update all employees for this tick, deduct per-tick salary (pro-rated) when payroll occurs
  tickCompany(company: CompanyState): CompanyState {
    const newCompany = { ...company };
    newCompany.employees = newCompany.employees.map(emp => this.tickEmployee(emp));

    // payroll handling
    this.ticksSincePayroll++;
    if (this.ticksSincePayroll >= this.config.payIntervalTicks) {
      // pay salaries (simple model: deduct salary from funds)
      let totalPay = 0;
      newCompany.employees = newCompany.employees.map(emp => {
        const pay = this.calculateSalary(emp);
        totalPay += pay;
        return { ...emp, salary: pay }; // update salary to calculated value
      });
      newCompany.funds = +(newCompany.funds - totalPay).toFixed(2);
      this.ticksSincePayroll = 0;
    }

    // employees may quit if morale or funds too low
    newCompany.employees = newCompany.employees.filter(emp => {
      if (emp.morale <= 5 && Math.random() < 0.02) {
        // low chance to quit immediately if morale very low
        return false;
      }
      return true;
    });

    return newCompany;
  }

  // Utility: hire a new employee with given role and approximate skill
  hireEmployee(name: string, role: Role, level: Level, skillValue = 50): Employee {
    const id = 'e' + Date.now().toString(36);
    const skills: any = { coding: 0, design: 0, marketing: 0, research: 0 };
    const key = this.config.roleSkillMultiplier[role];
    skills[key] = Math.max(1, Math.min(100, skillValue));
    // small variance for other skills
    for (const k of Object.keys(skills)) {
      if (k !== key) skills[k] = Math.max(1, Math.min(100, Math.round(skillValue * 0.4 + Math.random() * 20 - 10)));
    }
    const base: Employee = {
      id,
      name,
      role,
      level,
      skills,
      morale: 75,
      fatigue: 10,
      productivity: 0,
      salary: 0,
      onBreak: false,
      workPace: 'normal'
    };
    base.salary = this.calculateSalary(base);
    base.productivity = this.computeProductivity(base);
    return base;
  }
}
