import { useState } from "react";
import { useRunnerState } from "../example-queue/useRunnerState";
import { formatDate } from "../shared/utils/formatDate";
import { Cpu, Wrench, Play, Pause, AlertCircle } from "lucide-react";

const stateIcon: Record<string, React.ReactNode> = {
  idle: <Pause size={13} />,
  in_use: <Play size={13} />,
  maintenance: <Wrench size={13} />,
};

const stateClass: Record<string, string> = {
  idle: "runner-card runner-idle",
  in_use: "runner-card runner-active",
  maintenance: "runner-card runner-maint",
};

const RUNNER_INFO: Record<string, { type: string; capacity: string }> = {
  "RUNNER-01": { type: "Proposal Builder", capacity: "40 jobs/hr" },
  "RUNNER-02": { type: "Schema Injector", capacity: "65 jobs/hr" },
  "RUNNER-03": { type: "Citation Scanner", capacity: "22 jobs/hr" },
};

export const ExecutionEngineView = () => {
  const { runners, setRunnerState } = useRunnerState();
  const [lastAction, setLastAction] = useState<string | null>(null);

  const handleState = (
    runnerId: string,
    state: "idle" | "in_use" | "maintenance",
  ) => {
    setRunnerState(runnerId, state);
    setLastAction(
      `${runnerId} → ${state.replace("_", " ")} at ${new Date().toLocaleTimeString()}`,
    );
  };

  const idleCount = runners.filter((runner) => runner.state === "idle").length;
  const inUseCount = runners.filter((runner) => runner.state === "in_use").length;
  const maintCount = runners.filter((runner) => runner.state === "maintenance").length;

  return (
    <div className="dashboard-wrap">
      {/* Summary bar */}
      <div className="runner-summary-bar">
        <div className="runner-stat">
          <Cpu size={14} />
          <span>
            Total: <strong>{runners.length}</strong>
          </span>
        </div>
        <div className="runner-stat runner-stat-active">
          <Play size={13} />
          <span>
            Active: <strong>{inUseCount}</strong>
          </span>
        </div>
        <div className="runner-stat runner-stat-idle">
          <Pause size={13} />
          <span>
            Idle: <strong>{idleCount}</strong>
          </span>
        </div>
        <div className="runner-stat runner-stat-maint">
          <Wrench size={13} />
          <span>
            Maintenance: <strong>{maintCount}</strong>
          </span>
        </div>
      </div>

      {lastAction && (
        <div className="action-toast">
          <AlertCircle size={13} />
          Last action: {lastAction}
        </div>
      )}

      <div className="execution-card-grid">
        {runners.map((runner) => {
          const info = RUNNER_INFO[runner.runnerId];
          return (
            <article
              key={runner.runnerId}
              className={stateClass[runner.state] ?? "runner-card"}
            >
              <div className="runner-card-header">
                <span className="runner-id">{runner.runnerId}</span>
                <span className="runner-state-badge">
                  {stateIcon[runner.state]}
                  {runner.state.replace("_", " ")}
                </span>
              </div>
              {info && (
                <div className="runner-card-meta">
                  <span>{info.type}</span>
                  <span className="muted-row">{info.capacity}</span>
                </div>
              )}
              <div className="muted-row">
                Updated: {formatDate(runner.updatedAt)}
              </div>
              <div className="chip-row">
                <button
                  className={`btn btn-ghost ${runner.state === "idle" ? "btn-ghost-active" : ""}`}
                  onClick={() => handleState(runner.runnerId, "idle")}
                >
                  Idle
                </button>
                <button
                  className={`btn btn-ghost ${runner.state === "in_use" ? "btn-ghost-active" : ""}`}
                  onClick={() => handleState(runner.runnerId, "in_use")}
                >
                  Active
                </button>
                <button
                  className={`btn btn-ghost ${runner.state === "maintenance" ? "btn-ghost-active" : ""}`}
                  onClick={() => handleState(runner.runnerId, "maintenance")}
                >
                  Maintenance
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <section className="panel" style={{ marginTop: "12px" }}>
        <h3>About this module</h3>
        <p className="module-subtitle" style={{ marginTop: "6px" }}>
          Execution-runner state transitions are managed via a local state hook
          that mirrors the Firestore-backed <code>useRunnerState</code> hook
          pattern used in production. In the live app, state changes are written
          to{" "}
          <code>
            /tenants/{"{tenantId}"}/agents/{"{runnerId}"}
          </code>
          and broadcast to all connected sessions in real time via{" "}
          <code>onSnapshot</code>.
        </p>
      </section>
    </div>
  );
};
