import { Shield, Eye, Info } from "lucide-react";
import { useTenantContext } from "../example-tenant/tenantContext";
import type { TenantRole } from "../shared/types/tenant";

const OMITTED_MODULES = [
  {
    label: "Firestore Security Rules",
    reason: "Contains real tenant isolation logic — proprietary",
  },
  {
    label: "RBAC Enforcement (backend)",
    reason: "Production rule set — not shown in demo",
  },
  {
    label: "Client Billing Connectors",
    reason: "Settlement and invoicing credentials excluded",
  },
  {
    label: "Outreach Connectors",
    reason: "Email/SMS provider credentials not present in showcase",
  },
  {
    label: "Cloud Functions",
    reason: "Deployed functions shown structurally only",
  },
  {
    label: "Prompt Library",
    reason: "Production prompt assets are excluded from safe-share scope",
  },
];

const ROLE_PERMISSIONS: Record<TenantRole, string[]> = {
  owner: [
    "Full access",
    "SEO analytics",
    "Workspace management",
    "Billing",
    "Contributor management",
    "AI Optimization Center",
  ],
  manager: [
    "Proposal queue",
    "Campaign execution",
    "Runner controls",
    "Team workflow",
    "Reports (read-only)",
  ],
  staff: ["Task execution (own queue)", "Runner status check-in"],
};

export const SettingsView = () => {
  const { currentTenant, currentBranch, previewRole, switchPreviewRole } =
    useTenantContext();

  return (
    <div className="dashboard-wrap">
      <div className="settings-grid">
        {/* Tenant info */}
        <section className="panel">
          <h3>Tenant Context</h3>
          <div className="settings-rows">
            <div className="settings-row">
              <span className="settings-label">Tenant Name</span>
              <strong>{currentTenant?.name}</strong>
            </div>
            <div className="settings-row">
              <span className="settings-label">Plan</span>
              <span
                className={`badge badge-${currentTenant?.plan === "enterprise" ? "violet" : currentTenant?.plan === "growth" ? "cyan" : "slate"}`}
              >
                {currentTenant?.plan}
              </span>
            </div>
            <div className="settings-row">
              <span className="settings-label">Active Workspace</span>
              <strong>{currentBranch?.name}</strong>
            </div>
            <div className="settings-row">
              <span className="settings-label">Workspace Region</span>
              <span className="muted-row" style={{ marginTop: 0 }}>
                {currentBranch?.location}
              </span>
            </div>
            <div className="settings-row">
              <span className="settings-label">Enabled Features</span>
              <div className="chip-row" style={{ flexWrap: "wrap" }}>
                {currentTenant?.enabledFeatures.map((f) => (
                  <span key={f} className="feature-chip">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Role preview */}
        <section className="panel">
          <h3>
            <Eye size={15} style={{ display: "inline", marginRight: 6 }} />
            Role Preview (UI-only)
          </h3>
          <p
            className="module-subtitle"
            style={{ marginTop: 6, marginBottom: 14 }}
          >
            Switches the sidebar and feature visibility to simulate each role.
            Backend stays as Super Admin in demo mode.
          </p>
          <div className="role-preview-pills">
            {(["owner", "manager", "staff"] as TenantRole[]).map((r) => (
              <button
                key={r}
                className={`role-preview-btn ${previewRole === r ? "role-preview-active" : ""}`}
                onClick={() => switchPreviewRole(r)}
              >
                <Shield size={13} />
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          <div className="permissions-list">
            <p className="settings-label" style={{ marginBottom: 8 }}>
              Permissions for <strong>{previewRole}</strong>:
            </p>
            <ul>
              {ROLE_PERMISSIONS[previewRole].map((p) => (
                <li key={p} className="permission-item">
                  ✓ {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Safe-share boundary */}
        <section className="panel safe-share-panel">
          <h3>
            <Info size={15} style={{ display: "inline", marginRight: 6 }} />
            Safe-to-Share Boundary
          </h3>
          <p
            className="module-subtitle"
            style={{ marginTop: 6, marginBottom: 14 }}
          >
            The following modules are intentionally omitted from this showcase
            to protect proprietary logic and production credentials.
          </p>
          <div className="omitted-list">
            {OMITTED_MODULES.map((m) => (
              <div key={m.label} className="omitted-item">
                <span className="omitted-label">{m.label}</span>
                <span className="omitted-reason">{m.reason}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
