import { useMemo, useState } from "react";
import { fakeLineItems } from "./fakeData";
import { useOfflineQueue } from "./useOfflineQueue";
import { useMachineState } from "./useMachineState";
import { makeId } from "../shared/utils/id";
import { formatCurrency } from "../shared/utils/formatCurrency";
import { formatDate } from "../shared/utils/formatDate";
import { useOnlineStatus } from "../shared/hooks/useOnlineStatus";
import type { PosOrder } from "../shared/types/pos";

export const ExamplePosModule = () => {
  const [orders, setOrders] = useState<PosOrder[]>([]);
  const [simulateFailure, setSimulateFailure] = useState(false);
  const { queue, enqueue, processQueue, pendingCount, traceLog, clearLog } =
    useOfflineQueue(simulateFailure);
  const { machines, setMachineState } = useMachineState();
  const isOnline = useOnlineStatus();

  const total = useMemo(
    () =>
      fakeLineItems.reduce((sum, item) => sum + item.qty * item.unitPrice, 0),
    [],
  );

  const createFakeOrder = () => {
    const order: PosOrder = {
      id: makeId("order"),
      tenantId: "tenant_demo_1",
      createdAt: new Date().toISOString(),
      status: isOnline ? "created" : "queued",
      items: fakeLineItems,
      total,
    };

    setOrders((prev) => [order, ...prev]);

    if (!isOnline) {
      enqueue("ORDER_CREATE", {
        orderId: order.id,
        total: order.total,
      });
    }
  };

  const statusColor = (status: string) => {
    if (status === "synced") return "is-online";
    if (status === "failed") return "is-offline";
    if (status === "syncing") return "is-syncing";
    return "";
  };

  return (
    <section className="module">
      <header className="module-header">
        <div>
          <h2>KaOten Proposal Queue Module (Showcase)</h2>
          <p className="module-subtitle">
            Safe simulation of proposal drafting, execution runner states,
            offline queue behavior, and failure-mode observability.
          </p>
        </div>

        <div className="status-stack">
          <span
            className={`status-pill ${isOnline ? "is-online" : "is-offline"}`}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
          <span className="status-pill">Pending: {pendingCount}</span>
        </div>
      </header>

      <div className="action-row">
        <button className="btn btn-primary" onClick={createFakeOrder}>
          Create Fake Proposal
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => void processQueue()}
          disabled={!isOnline || pendingCount === 0}
        >
          Sync Queue
        </button>
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={simulateFailure}
            onChange={(e) => setSimulateFailure(e.target.checked)}
          />
          <span
            className={simulateFailure ? "toggle-text is-warn" : "toggle-text"}
          >
            Simulate Fail
          </span>
        </label>
      </div>

      <div className="section-grid">
        <section className="panel">
          <h3>Execution Runners</h3>
          <div className="list-stack">
            {machines.map((machine) => (
              <article key={machine.machineId} className="row-card">
                <div>
                  <strong>{machine.machineId}</strong>
                  <div className="muted-row">
                    State: {machine.state} | Updated:{" "}
                    {formatDate(machine.updatedAt)}
                  </div>
                </div>

                <div className="chip-row">
                  <button
                    className="btn btn-ghost"
                    onClick={() => setMachineState(machine.machineId, "idle")}
                  >
                    Idle
                  </button>
                  <button
                    className="btn btn-ghost"
                    onClick={() => setMachineState(machine.machineId, "in_use")}
                  >
                    In Use
                  </button>
                  <button
                    className="btn btn-ghost"
                    onClick={() =>
                      setMachineState(machine.machineId, "maintenance")
                    }
                  >
                    Maintenance
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3>Orders</h3>
          {orders.length === 0 ? (
            <p className="muted-empty">No orders yet.</p>
          ) : null}
          <div className="list-stack">
            {orders.map((order) => (
              <article key={order.id} className="row-card compact">
                <div>Order: {order.id}</div>
                <div>Created: {formatDate(order.createdAt)}</div>
                <div>Status: {order.status}</div>
                <div>Estimated value: {formatCurrency(order.total)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3>Offline Execution Queue</h3>
          {queue.length === 0 ? (
            <p className="muted-empty">Queue is empty.</p>
          ) : null}
          <div className="list-stack">
            {queue.map((action) => (
              <article key={action.actionId} className="row-card compact">
                <span>{action.type}</span>
                <span className={`status-pill ${statusColor(action.status)}`}>
                  {action.status}
                </span>
                {action.retryCount > 0 ? (
                  <span className="muted-badge">
                    retry #{action.retryCount}
                  </span>
                ) : null}
                <span className="muted-ts">{formatDate(action.createdAt)}</span>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="panel telemetry-panel">
        <div className="telemetry-header">
          <h3>Observability — Demo Telemetry Log</h3>
          <button className="btn btn-ghost btn-sm" onClick={clearLog}>
            Clear
          </button>
        </div>
        <p className="module-subtitle telemetry-hint">
          Every queue state transition is recorded here. Go offline, create
          proposals, toggle Simulate Fail, then Sync to see the full lifecycle.
        </p>
        {traceLog.length === 0 ? (
          <p className="muted-empty">
            No events yet. Create a proposal or sync the queue.
          </p>
        ) : (
          <div className="trace-log">
            {traceLog.map((evt) => (
              <div key={evt.eventId} className="trace-row">
                <span className="trace-ts">{formatDate(evt.timestamp)}</span>
                <span className="trace-id">{evt.actionId.slice(0, 16)}</span>
                <span className="trace-transition">
                  <span className={`trace-state trace-${evt.from}`}>
                    {evt.from}
                  </span>
                  <span className="trace-arrow">→</span>
                  <span className={`trace-state trace-${evt.to}`}>
                    {evt.to}
                  </span>
                </span>
                {evt.note ? (
                  <span className="trace-note">{evt.note}</span>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
};
