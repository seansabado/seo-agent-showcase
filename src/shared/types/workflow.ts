export type ProposalStatus = "queued" | "created" | "approved" | "failed";

export interface ProposalTask {
  id: string;
  name: string;
  qty: number;
  unitPrice: number;
}

export interface ProposalRecord {
  id: string;
  tenantId: string;
  createdAt: string;
  status: ProposalStatus;
  items: ProposalTask[];
  total: number;
}

export type RunnerState = "idle" | "in_use" | "maintenance";

export interface RunnerSnapshot {
  runnerId: string;
  state: RunnerState;
  updatedAt: string;
}
