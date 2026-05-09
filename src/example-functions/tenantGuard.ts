import type { FunctionActor } from "./auth";

export interface TenantGuardResult {
  tenantId: string;
  role: "owner" | "manager" | "staff";
}

export const verifyTenantAccess = (
  actor: FunctionActor,
  tenantId?: string,
): TenantGuardResult => {
  if (!tenantId) {
    throw new Error("invalid-tenant");
  }

  // Fake rule: actor must have any UID and tenant id must follow demo prefix.
  if (!actor.uid || !tenantId.startsWith("tenant_")) {
    throw new Error("permission-denied");
  }

  return {
    tenantId,
    role: "owner",
  };
};
