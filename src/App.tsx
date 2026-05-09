import { useState } from "react";
import {
  LayoutDashboard,
  Workflow,
  Cpu,
  BarChart3,
  Settings,
  Building2,
  Wifi,
  WifiOff,
  ChevronDown,
  Sparkles,
  Shield,
  Eye,
} from "lucide-react";
import { ExampleQueueModule } from "./example-queue";
import { TenantProvider } from "./example-tenant/tenantSwitcher";
import { useTenantContext } from "./example-tenant/tenantContext";
import { DashboardView } from "./components/DashboardView";
import { ExecutionEngineView } from "./components/ExecutionEngineView";
import { AnalyticsView } from "./components/AnalyticsView";
import { SettingsView } from "./components/SettingsView";
import { GuidedDemo } from "./components/GuidedDemo";
import { useOnlineStatus } from "./shared/hooks/useOnlineStatus";
import type { TenantRole } from "./shared/types/tenant";

type View = "dashboard" | "proposalQueue" | "executionEngine" | "analytics" | "settings";

const NAV_ITEMS: {
  id: View;
  label: string;
  Icon: React.ComponentType<{ size?: number }>;
  gate?: string;
}[] = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "proposalQueue", label: "Proposal Queue", Icon: Workflow },
  { id: "executionEngine", label: "Execution Engine", Icon: Cpu },
  { id: "analytics", label: "SEO Analytics", Icon: BarChart3, gate: "Pro+" },
  { id: "settings", label: "Settings", Icon: Settings },
];

const VIEW_TITLES: Record<View, string> = {
  dashboard: "Dashboard",
  proposalQueue: "Proposal Queue",
  executionEngine: "Execution Engine",
  analytics: "SEO Analytics",
  settings: "Settings",
};

const ROLE_HIDDEN_NAV: Record<TenantRole, View[]> = {
  owner: [],
  manager: ["analytics"],
  staff: ["analytics", "settings"],
};

const AdminShell = () => {
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [demoOpen, setDemoOpen] = useState(true);
  const [branchDropOpen, setBranchDropOpen] = useState(false);
  const [tenantDropOpen, setTenantDropOpen] = useState(false);

  const {
    tenants,
    currentTenant,
    branches,
    currentBranch,
    previewRole,
    switchTenant,
    switchBranch,
    switchPreviewRole,
  } = useTenantContext();

  const isOnline = useOnlineStatus();

  const hiddenViews = ROLE_HIDDEN_NAV[previewRole] ?? [];
  const visibleNav = NAV_ITEMS.filter((n) => !hiddenViews.includes(n.id));

  return (
    <div className="admin-shell">
      {/* ── Sidebar ─────────────────────────────── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="sidebar-wordmark">KaOten SEO Agent</span>
          <span className="sidebar-build-tag">Showcase</span>
        </div>

        <nav className="sidebar-nav">
          {visibleNav.map(({ id, label, Icon, gate }) => (
            <button
              key={id}
              className={`nav-item ${activeView === id ? "nav-item-active" : ""}`}
              onClick={() => setActiveView(id)}
            >
              <Icon size={16} />
              <span>{label}</span>
              {gate && <span className="nav-gate-badge">{gate}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-role-row">
            <Shield size={12} />
            <span className="sidebar-role-label">
              {previewRole.charAt(0).toUpperCase() + previewRole.slice(1)} view
            </span>
          </div>
          <div className="sidebar-tenant-name">{currentTenant?.name}</div>
        </div>
      </aside>

      {/* ── Main area ───────────────────────────── */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-header-left">
            <h2 className="view-title">{VIEW_TITLES[activeView]}</h2>
            {currentBranch && (
              <span className="workspace-context">
                <Building2 size={12} />
                {currentBranch.name}
              </span>
            )}
          </div>

          <div className="admin-header-right">
            {/* Tenant switcher */}
            <div className="header-dropdown-wrap">
              <button
                className="header-dropdown-btn"
                onClick={() => {
                  setTenantDropOpen(!tenantDropOpen);
                  setBranchDropOpen(false);
                }}
              >
                <span>{currentTenant?.name}</span>
                <span className={`plan-chip plan-chip-${currentTenant?.plan}`}>
                  {currentTenant?.plan}
                </span>
                <ChevronDown size={13} />
              </button>
              {tenantDropOpen && (
                <div className="header-dropdown-menu">
                  {tenants.map((t) => (
                    <button
                      key={t.id}
                      className={`header-dropdown-item ${t.id === currentTenant?.id ? "header-dropdown-item-active" : ""}`}
                      onClick={() => {
                        switchTenant(t.id);
                        setTenantDropOpen(false);
                      }}
                    >
                      {t.name}
                      <span className={`plan-chip plan-chip-${t.plan}`}>
                        {t.plan}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Branch switcher */}
            <div className="header-dropdown-wrap">
              <button
                className="header-dropdown-btn"
                onClick={() => {
                  setBranchDropOpen(!branchDropOpen);
                  setTenantDropOpen(false);
                }}
              >
                <Building2 size={13} />
                <span>{currentBranch?.name ?? "Select workspace"}</span>
                <ChevronDown size={13} />
              </button>
              {branchDropOpen && (
                <div className="header-dropdown-menu">
                  {branches.map((b) => (
                    <button
                      key={b.id}
                      className={`header-dropdown-item ${b.id === currentBranch?.id ? "header-dropdown-item-active" : ""}`}
                      onClick={() => {
                        switchBranch(b.id);
                        setBranchDropOpen(false);
                      }}
                    >
                      <div>
                        <div>{b.name}</div>
                        <div className="muted-row" style={{ margin: 0 }}>
                          {b.location}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Role preview */}
            <div className="role-preview-row">
              <Eye size={13} />
              {(["owner", "manager", "staff"] as TenantRole[]).map((r) => (
                <button
                  key={r}
                  className={`role-pill ${previewRole === r ? "role-pill-active" : ""}`}
                  onClick={() => switchPreviewRole(r)}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Guided demo toggle */}
            <button
              className="demo-guide-btn"
              onClick={() => setDemoOpen(!demoOpen)}
              title="Open demo guide"
            >
              <Sparkles size={14} />
              Demo Guide
            </button>

            {/* Connection */}
            <span
              className={`conn-pill ${isOnline ? "is-online" : "is-offline"}`}
            >
              {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="admin-content">
          {activeView === "dashboard" && <DashboardView />}
          {activeView === "proposalQueue" && (
            <div className="module-wrap">
              <ExampleQueueModule />
            </div>
          )}
          {activeView === "executionEngine" && <ExecutionEngineView />}
          {activeView === "analytics" && <AnalyticsView />}
          {activeView === "settings" && <SettingsView />}
        </main>
      </div>

      {/* Guided demo overlay */}
      {demoOpen && (
        <GuidedDemo
          onClose={() => setDemoOpen(false)}
          onNavigate={(view) => setActiveView(view)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <TenantProvider>
      <AdminShell />
    </TenantProvider>
  );
}
