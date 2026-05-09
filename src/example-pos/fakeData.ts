import type { MachineSnapshot, PosLineItem } from "../shared/types/pos";

export const fakeLineItems: PosLineItem[] = [
  {
    id: "task_page_brief",
    name: "Landing Page Brief + Internal Link Map",
    qty: 1,
    unitPrice: 220,
  },
  {
    id: "task_schema_pack",
    name: "Schema Markup Pack (FAQ + Service)",
    qty: 1,
    unitPrice: 120,
  },
];

export const fakeMachines: MachineSnapshot[] = [
  {
    machineId: "RUNNER-01",
    state: "idle",
    updatedAt: new Date().toISOString(),
  },
  {
    machineId: "RUNNER-02",
    state: "in_use",
    updatedAt: new Date().toISOString(),
  },
  {
    machineId: "RUNNER-03",
    state: "maintenance",
    updatedAt: new Date().toISOString(),
  },
];
