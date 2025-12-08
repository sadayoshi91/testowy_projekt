// src/models/employee.ts
export type Role = 'developer' | 'designer' | 'marketer' | 'researcher';
export type Level = 'junior' | 'mid' | 'senior';

export type Skills = {
  coding: number;
  design: number;
  marketing: number;
  research: number;
};

export type Employee = {
  id: string;
  name: string;
  role: Role;
  level: Level;
  skills: Skills; // 0..100 scale
  morale: number; // 0..100
  fatigue: number; // 0..100 (higher = more tired)
  productivity: number; // derived, 0..infty
  salary: number; // currency per pay period (configurable)
  onBreak?: boolean; // is the employee currently on break
  workPace?: 'slow' | 'normal' | 'fast'; // affects fatigue and productivity
};
