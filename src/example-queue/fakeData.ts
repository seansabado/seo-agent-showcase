import type { ProposalTask, RunnerSnapshot } from "../shared/types/workflow";

export const fakeProposalTasks: ProposalTask[] = [
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

export const fakeRunners: RunnerSnapshot[] = [
  {
    runnerId: "RUNNER-01",
    state: "idle",
    updatedAt: new Date().toISOString(),
  },
  {
    runnerId: "RUNNER-02",
    state: "in_use",
    updatedAt: new Date().toISOString(),
  },
  {
    runnerId: "RUNNER-03",
    state: "maintenance",
    updatedAt: new Date().toISOString(),
  },
];
