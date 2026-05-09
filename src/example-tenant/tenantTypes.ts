import type {
  TenantInfo,
  TenantMembership,
  TenantRole,
} from "../shared/types/tenant";

export type ShowcaseTenant = TenantInfo;

export interface ShowcaseBranch {
  id: string;
  tenantId: string;
  name: string;
  location: string;
}

export interface ShowcaseTenantContextValue {
  tenants: ShowcaseTenant[];
  currentTenant: ShowcaseTenant | null;
  branches: ShowcaseBranch[];
  currentBranch: ShowcaseBranch | null;
  role: TenantRole;
  previewRole: TenantRole;
  switchTenant: (tenantId: string) => void;
  switchBranch: (branchId: string) => void;
  switchPreviewRole: (role: TenantRole) => void;
}

export type ShowcaseMembership = TenantMembership;
