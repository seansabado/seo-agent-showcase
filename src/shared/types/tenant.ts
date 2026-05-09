export type TenantPlan = "free" | "growth" | "enterprise";

export type TenantRole = "owner" | "manager" | "staff";

export interface TenantInfo {
  id: string;
  name: string;
  plan: TenantPlan;
  enabledFeatures: string[];
}

export interface TenantMembership {
  userId: string;
  tenantId: string;
  role: TenantRole;
}
