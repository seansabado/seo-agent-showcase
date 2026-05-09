import { TrendingUp, FileText, Cpu, Radio, AlertTriangle } from "lucide-react";
import { useTenantContext } from "../example-tenant/tenantContext";
import { formatCurrency } from "../shared/utils/formatCurrency";
import { formatDate } from "../shared/utils/formatDate";

interface KpiCardProps {
  label: string;
  value: string;
  sub?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ReactNode;
  accent?: string;
}

const KpiCard = ({
  label,
  value,
  sub,
  icon,
  accent = "violet",
}: KpiCardProps) => (
  <article className={`kpi-card kpi-${accent}`}>
    <div className="kpi-icon">{icon}</div>
    <div className="kpi-body">
      <span className="kpi-label">{label}</span>
      <strong className="kpi-value">{value}</strong>
      {sub && <span className="kpi-sub">{sub}</span>}
    </div>
  </article>
);

const RECENT_ORDERS = [
  {
    id: "prop_9a1b",
    customer: "dentist seo philippines",
    status: "completed",
    total: 1200,
    workspace: "Local SEO Workspace",
    createdAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
  },
  {
    id: "prop_7f2c",
    customer: "quezon city orthodontist",
    status: "in_progress",
    total: 860,
    workspace: "Content Ops Workspace",
    createdAt: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
  },
  {
    id: "prop_3e8d",
    customer: "law firm seo checklist",
    status: "completed",
    total: 1440,
    workspace: "Authority Campaigns",
    createdAt: new Date(Date.now() - 41 * 60 * 1000).toISOString(),
  },
  {
    id: "prop_1d4f",
    customer: "injury attorney local map pack",
    status: "queued",
    total: 980,
    workspace: "Multi-location Rollout",
    createdAt: new Date(Date.now() - 58 * 60 * 1000).toISOString(),
  },
  {
    id: "prop_6b5a",
    customer: "hvac seo service page template",
    status: "completed",
    total: 1320,
    workspace: "Content Ops Workspace",
    createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
  },
];

const RUNNER_SUMMARY = [
  { id: "RUNNER-01", type: "Proposal Builder", state: "in_use" },
  { id: "RUNNER-02", type: "Proposal Builder", state: "idle" },
  { id: "RUNNER-03", type: "Content Optimizer", state: "idle" },
  { id: "RUNNER-04", type: "Schema Injector", state: "in_use" },
  { id: "RUNNER-05", type: "Citation Scanner", state: "maintenance" },
  { id: "RUNNER-06", type: "Rank Tracker", state: "in_use" },
];

const statusLabel: Record<string, string> = {
  completed: "Completed",
  in_progress: "In Progress",
  queued: "Queued",
  failed: "Failed",
};

const statusClass: Record<string, string> = {
  completed: "badge-green",
  in_progress: "badge-violet",
  queued: "badge-slate",
  failed: "badge-red",
};

const runnerClass: Record<string, string> = {
  idle: "runner-idle",
  in_use: "runner-active",
  maintenance: "runner-maint",
};

export const DashboardView = () => {
  const { currentBranch, currentTenant } = useTenantContext();

  return (
    <div className="dashboard-wrap">
      {/* Safe boundary notice */}
      <div className="safe-boundary-bar">
        <AlertTriangle size={13} />
        <span>
          Showcase data only — safe to share. Real client campaigns, ranking
          data, credentials, and proprietary prompts are not present.
        </span>
      </div>

      {/* KPI row */}
      <div className="kpi-grid">
        <KpiCard
          label="Proposals Generated"
          value="27"
          sub="+18% vs yesterday"
          icon={<TrendingUp size={18} />}
          accent="violet"
        />
        <KpiCard
          label="Active Keywords"
          value="23"
          sub={`${currentBranch?.name ?? "All workspaces"}`}
          icon={<FileText size={18} />}
          accent="cyan"
        />
        <KpiCard
          label="Runners Active"
          value="4 / 6"
          sub="1 in maintenance"
          icon={<Cpu size={18} />}
          accent="green"
        />
        <KpiCard
          label="Queue Pending"
          value="3"
          sub="Offline executions awaiting sync"
          icon={<Radio size={18} />}
          accent="amber"
        />
      </div>

      <div className="dashboard-cols">
        {/* Recent orders */}
        <section className="panel dashboard-panel">
          <h3>Recent Proposals</h3>
          <table className="proposal-table">
            <thead>
              <tr>
                <th>Proposal</th>
                <th>Keyword</th>
                <th>Workspace</th>
                <th>Status</th>
                <th>Value</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id}>
                  <td className="proposal-id-cell">{order.id.slice(0, 12)}</td>
                  <td>{order.customer}</td>
                  <td className="muted-cell">{order.workspace}</td>
                  <td>
                    <span
                      className={`badge ${statusClass[order.status] ?? "badge-slate"}`}
                    >
                      {statusLabel[order.status] ?? order.status}
                    </span>
                  </td>
                  <td>{formatCurrency(order.total)}</td>
                  <td className="muted-cell">{formatDate(order.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Machine summary */}
        <section className="panel dashboard-panel">
          <h3>Execution Fleet</h3>
          <div className="runner-grid">
            {RUNNER_SUMMARY.map((m) => (
              <article
                key={m.id}
                className={`runner-card ${runnerClass[m.state] ?? ""}`}
              >
                <span className="runner-id">{m.id}</span>
                <span className="runner-type">{m.type}</span>
                <span className="runner-state-dot" />
                <span className="runner-state-label">
                  {m.state.replace("_", " ")}
                </span>
              </article>
            ))}
          </div>

          {/* Plan tier note */}
          <div className="plan-tier-note">
            <span className="plan-badge plan-badge-growth">
              {currentTenant?.plan}
            </span>
            <span className="plan-note-text">
              Plan: <strong>{currentTenant?.plan}</strong> ·{" "}
              {currentTenant?.enabledFeatures.length} capabilities enabled
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};
