import type { AuditEntry } from "../shared/types/audit";
import { makeId } from "../shared/utils/id";

const inMemoryAudit: AuditEntry[] = [];

export const logAudit = (
  entry: Omit<AuditEntry, "id" | "timestamp">,
): AuditEntry => {
  const next: AuditEntry = {
    id: makeId("audit"),
    timestamp: new Date().toISOString(),
    ...entry,
  };

  inMemoryAudit.push(next);
  return next;
};

export const getAuditEntries = (): AuditEntry[] => {
  return [...inMemoryAudit];
};
