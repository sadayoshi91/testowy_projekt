// src/models/office.ts
export interface OfficeUpgrade {
 id: string;
 name: string;
 description?: string;
 cost: number;
 effect: {
 productivity?: number;
 morale?: number;
 };
}

export interface Desk {
 id: string;
 name: string;
 assignedEmployeeId?: string;
 upgrades?: OfficeUpgrade[];
}

export interface Office {
 id: string;
 name: string;
 rent: number;
 desks: Desk[];
 upgrades: OfficeUpgrade[];
 owned: boolean;
}
