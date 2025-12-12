export type EventType = 'crisis' | 'bonus' | 'market_change' | 'random' | 'employee_sick' | 'equipment_failure' | 'investor_visit';

export interface GameEvent {
 id: string;
 type: EventType;
 title: string;
 description: string;
 effect: {
 morale?: number;
 productivity?: number;
 funds?: number;
 reputation?: number;
 employeeId?: string;
 equipmentId?: string;
 investorBonus?: number;
 };
 day: number;
}
