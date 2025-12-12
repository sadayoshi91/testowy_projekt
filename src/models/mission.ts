export type MissionType = 'reputation' | 'projects_completed' | 'funds' | 'employees_hired';

export interface Mission {
 id: string;
 type: MissionType;
 description: string;
 target: number;
 progress: number;
 completed: boolean;
 reward?: {
 funds?: number;
 reputation?: number;
 bonus?: string;
 };
}
