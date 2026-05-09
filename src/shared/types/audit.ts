export type AuditStatus = "ok" | "error";

export interface AuditEntry {
  id: string;
  timestamp: string;
  actorId: string;
  tenantId: string;
  action: string;
  status: AuditStatus;
  details?: Record<string, unknown>;
}
