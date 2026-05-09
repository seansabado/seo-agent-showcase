export type OrderStatus = "queued" | "created" | "paid" | "failed";

export interface PosLineItem {
  id: string;
  name: string;
  qty: number;
  unitPrice: number;
}

export interface PosOrder {
  id: string;
  tenantId: string;
  createdAt: string;
  status: OrderStatus;
  items: PosLineItem[];
  total: number;
}

export type MachineState = "idle" | "in_use" | "maintenance";

export interface MachineSnapshot {
  machineId: string;
  state: MachineState;
  updatedAt: string;
}
