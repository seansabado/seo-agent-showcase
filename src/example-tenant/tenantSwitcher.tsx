import { useMemo, useState, type ReactNode } from "react";
import { TenantContext } from "./tenantContext";
import type { ShowcaseTenant, ShowcaseBranch } from "./tenantTypes";
import type { TenantRole } from "../shared/types/tenant";

const TENANTS: ShowcaseTenant[] = [
  {
    id: "tenant_demo_1",
    name: "Acme Dental Group",
    plan: "growth",
    enabledFeatures: ["proposal-engine", "execution-queue", "analytics"],
  },
  {
    id: "tenant_demo_2",
    name: "NorthStar Legal",
    plan: "enterprise",
    enabledFeatures: [
      "proposal-engine",
      "execution-queue",
      "analytics",
      "ai-optimizer",
      "rank-tracker",
      "citation-audit",
    ],
  },
];

const ALL_BRANCHES: ShowcaseBranch[] = [
  {
    id: "branch_mkt_1",
    tenantId: "tenant_demo_1",
    name: "Local SEO Workspace",
    location: "Metro Manila Cluster",
  },
  {
    id: "branch_qc_1",
    tenantId: "tenant_demo_1",
    name: "Content Ops Workspace",
    location: "Quezon City Cluster",
  },
  {
    id: "branch_pasig_1",
    tenantId: "tenant_demo_2",
    name: "Authority Campaigns",
    location: "US West Cluster",
  },
  {
    id: "branch_bgc_1",
    tenantId: "tenant_demo_2",
    name: "Multi-location Rollout",
    location: "US East Cluster",
  },
];

interface Props {
  children: ReactNode;
}

export const TenantProvider = ({ children }: Props) => {
  const [currentTenantId, setCurrentTenantId] = useState<string>(TENANTS[0].id);
  const [currentBranchId, setCurrentBranchId] = useState<string>(
    ALL_BRANCHES[0].id,
  );
  const [previewRole, setPreviewRole] = useState<TenantRole>("owner");

  const currentTenant = useMemo(
    () => TENANTS.find((t) => t.id === currentTenantId) ?? null,
    [currentTenantId],
  );

  const branches = useMemo(
    () => ALL_BRANCHES.filter((b) => b.tenantId === currentTenantId),
    [currentTenantId],
  );

  const currentBranch = useMemo(
    () => branches.find((b) => b.id === currentBranchId) ?? branches[0] ?? null,
    [branches, currentBranchId],
  );

  const switchTenant = (tenantId: string) => {
    setCurrentTenantId(tenantId);
    const firstBranch = ALL_BRANCHES.find((b) => b.tenantId === tenantId);
    if (firstBranch) setCurrentBranchId(firstBranch.id);
  };

  return (
    <TenantContext.Provider
      value={{
        tenants: TENANTS,
        currentTenant,
        branches,
        currentBranch,
        role: "owner",
        previewRole,
        switchTenant,
        switchBranch: setCurrentBranchId,
        switchPreviewRole: setPreviewRole,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};
