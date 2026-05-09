import { useState } from "react";
import { useMachineState } from "../example-pos/useMachineState";
import { formatDate } from "../shared/utils/formatDate";
import { Cpu, Wrench, Play, Pause, AlertCircle } from "lucide-react";

const stateIcon: Record<string, React.ReactNode> = {
  idle: <Pause size={13} />,
  in_use: <Play size={13} />,
  maintenance: <Wrench size={13} />,
};

const stateClass: Record<string, string> = {
  idle: "machine-tile machine-idle",
  in_use: "machine-tile machine-inuse",
  maintenance: "machine-tile machine-maint",
};

const MACHINE_INFO: Record<string, { type: string; capacity: string }> = {
  "RUNNER-01": { type: "Proposal Builder", capacity: "40 jobs/hr" },
  "RUNNER-02": { type: "Schema Injector", capacity: "65 jobs/hr" },
  "RUNNER-03": { type: "Citation Scanner", capacity: "22 jobs/hr" },
};

export const MachinesView = () => {
  const { machines, setMachineState } = useMachineState();
  const [lastAction, setLastAction] = useState<string | null>(null);

  const handleState = (
    machineId: string,
    state: "idle" | "in_use" | "maintenance",
  ) => {
    setMachineState(machineId, state);
    setLastAction(
      `${machineId} → ${state.replace("_", " ")} at ${new Date().toLocaleTimeString()}`,
    );
  };

  const idleCount = machines.filter((m) => m.state === "idle").length;
  const inUseCount = machines.filter((m) => m.state === "in_use").length;
  const maintCount = machines.filter((m) => m.state === "maintenance").length;

  return (
    <div className="dashboard-wrap">
      {/* Summary bar */}
      <div className="machine-summary-bar">
        <div className="machine-stat">
          <Cpu size={14} />
          <span>
            Total: <strong>{machines.length}</strong>
          </span>
        </div>
        <div className="machine-stat machine-stat-inuse">
          <Play size={13} />
          <span>
            In Use: <strong>{inUseCount}</strong>
          </span>
        </div>
        <div className="machine-stat machine-stat-idle">
          <Pause size={13} />
          <span>
            Idle: <strong>{idleCount}</strong>
          </span>
        </div>
        <div className="machine-stat machine-stat-maint">
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

      <div className="machines-card-grid">
        {machines.map((machine) => {
          const info = MACHINE_INFO[machine.machineId];
          return (
            <article
              key={machine.machineId}
              className={stateClass[machine.state] ?? "machine-tile"}
            >
              <div className="machine-tile-header">
                <span className="machine-id">{machine.machineId}</span>
                <span className="machine-state-badge">
                  {stateIcon[machine.state]}
                  {machine.state.replace("_", " ")}
                </span>
              </div>
              {info && (
                <div className="machine-tile-meta">
                  <span>{info.type}</span>
                  <span className="muted-row">{info.capacity}</span>
                </div>
              )}
              <div className="muted-row">
                Updated: {formatDate(machine.updatedAt)}
              </div>
              <div className="chip-row">
                <button
                  className={`btn btn-ghost ${machine.state === "idle" ? "btn-ghost-active" : ""}`}
                  onClick={() => handleState(machine.machineId, "idle")}
                >
                  Idle
                </button>
                <button
                  className={`btn btn-ghost ${machine.state === "in_use" ? "btn-ghost-active" : ""}`}
                  onClick={() => handleState(machine.machineId, "in_use")}
                >
                  In Use
                </button>
                <button
                  className={`btn btn-ghost ${machine.state === "maintenance" ? "btn-ghost-active" : ""}`}
                  onClick={() => handleState(machine.machineId, "maintenance")}
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
          that mirrors the Firestore-backed <code>useMachineState</code> hook
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
