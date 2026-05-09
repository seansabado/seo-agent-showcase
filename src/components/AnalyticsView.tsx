import { BarChart3, Lock, Zap, TrendingUp, Users, Clock } from "lucide-react";
import { useTenantContext } from "../example-tenant/tenantContext";

const LOCKED_WIDGETS = [
  {
    icon: <TrendingUp size={20} />,
    label: "Ranking Trends",
    desc: "Daily / weekly / monthly keyword movement by workspace",
  },
  {
    icon: <Users size={20} />,
    label: "Lead Conversion",
    desc: "Qualified leads, conversion velocity, and campaign cohorts",
  },
  {
    icon: <Clock size={20} />,
    label: "SERP Volatility Heatmap",
    desc: "Ranking fluctuation by hour-of-day across all workspaces",
  },
  {
    icon: <Zap size={20} />,
    label: "Runner Utilization",
    desc: "Execution uptime %, idle time, and failure retries per runner",
  },
  {
    icon: <BarChart3 size={20} />,
    label: "Campaign ROI",
    desc: "Pipeline value minus spend, ROI by workspace and period",
  },
];

export const AnalyticsView = () => {
  const { currentTenant } = useTenantContext();
  const isPlanEligible =
    currentTenant?.plan === "growth" || currentTenant?.plan === "enterprise";

  return (
    <div className="dashboard-wrap">
      {/* Plan gate banner */}
      <div
        className={`plan-gate-banner ${isPlanEligible ? "plan-gate-unlocked" : "plan-gate-locked"}`}
      >
        <div className="plan-gate-icon">
          {isPlanEligible ? <Zap size={22} /> : <Lock size={22} />}
        </div>
        <div>
          <strong>
            {isPlanEligible
              ? "SEO Analytics Unlocked"
              : "SEO Analytics — Growth Plan Required"}
          </strong>
          <p className="module-subtitle" style={{ marginTop: 4 }}>
            {isPlanEligible
              ? `${currentTenant?.name} is on the ${currentTenant?.plan} plan. SEO analytics dashboards are available.`
              : "Upgrade to Growth to unlock rank tracking, pipeline analytics, and cohort reports."}
          </p>
        </div>
        {!isPlanEligible && (
          <button
            className="btn btn-primary"
            style={{ marginLeft: "auto", whiteSpace: "nowrap" }}
          >
            Upgrade Plan
          </button>
        )}
      </div>

      {/* Locked widget previews */}
      <div className="locked-widgets-grid">
        {LOCKED_WIDGETS.map((widget) => (
          <div
            key={widget.label}
            className={`locked-widget ${isPlanEligible ? "" : "locked-widget-blur"}`}
          >
            <div className="locked-widget-icon">{widget.icon}</div>
            <div>
              <strong className="locked-widget-label">{widget.label}</strong>
              <p className="muted-row" style={{ marginTop: 4 }}>
                {widget.desc}
              </p>
            </div>
            {!isPlanEligible && (
              <div className="locked-overlay">
                <Lock size={16} />
                <span>Growth+</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {isPlanEligible && (
        <div className="panel" style={{ padding: "20px" }}>
          <h3>Showcase Note</h3>
          <p className="module-subtitle" style={{ marginTop: 6 }}>
            In the live app, this section renders real Recharts components
            connected to Firestore aggregations. For this showcase, the
            plan-gate logic, role visibility rules, and widget structure are
            demonstrated while sensitive campaign data is intentionally omitted.
          </p>
        </div>
      )}
    </div>
  );
};
