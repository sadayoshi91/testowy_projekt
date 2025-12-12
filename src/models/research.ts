// src/models/research.ts
export interface Research {
  id: string;
  name: string;
  description?: string;
  cost: number;
  durationDays: number;
  startedDay?: number;
  completedDay?: number;
  status: 'available' | 'in_progress' | 'completed';
  unlocks?: string[];
  progress?: number;
  invested?: boolean;
  nextStageCost?: number;
}
