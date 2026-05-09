import { useCallback, useMemo, useState } from "react";
import { makeId } from "../shared/utils/id";

export type QueueStatus = "queued" | "syncing" | "synced" | "failed";

export interface OfflineAction<T = Record<string, unknown>> {
  actionId: string;
  type: string;
  payload: T;
  createdAt: string;
  retryCount: number;
  status: QueueStatus;
}

export interface TraceEvent {
  eventId: string;
  timestamp: string;
  actionId: string;
  from: QueueStatus | "created";
  to: QueueStatus;
  note?: string;
}

export const useOfflineQueue = (simulateFailure: boolean) => {
  const [queue, setQueue] = useState<OfflineAction[]>([]);
  const [traceLog, setTraceLog] = useState<TraceEvent[]>([]);

  const appendTrace = useCallback(
    (
      actionId: string,
      from: QueueStatus | "created",
      to: QueueStatus,
      note?: string,
    ) => {
      setTraceLog((prev) => [
        {
          eventId: makeId("evt"),
          timestamp: new Date().toISOString(),
          actionId,
          from,
          to,
          note,
        },
        ...prev,
      ]);
    },
    [],
  );

  const enqueue = useCallback(
    (type: string, payload: Record<string, unknown>) => {
      const action: OfflineAction = {
        actionId: makeId("action"),
        type,
        payload,
        createdAt: new Date().toISOString(),
        retryCount: 0,
        status: "queued",
      };

      setQueue((prev) => [...prev, action]);
      appendTrace(action.actionId, "created", "queued", "enqueued offline");
      return action;
    },
    [appendTrace],
  );

  const markStatus = useCallback(
    (actionId: string, from: QueueStatus, to: QueueStatus, note?: string) => {
      setQueue((prev) =>
        prev.map((item) =>
          item.actionId === actionId
            ? {
                ...item,
                status: to,
                retryCount:
                  to === "syncing" && from === "failed"
                    ? item.retryCount + 1
                    : item.retryCount,
              }
            : item,
        ),
      );
      appendTrace(actionId, from, to, note);
    },
    [appendTrace],
  );

  const processQueue = useCallback(async () => {
    for (const action of queue) {
      if (action.status !== "queued" && action.status !== "failed") continue;
      const fromStatus = action.status;
      markStatus(action.actionId, fromStatus, "syncing");
      // Fake sync delay to simulate network processing.
      await new Promise((resolve) => setTimeout(resolve, 250));
      if (simulateFailure) {
        markStatus(
          action.actionId,
          "syncing",
          "failed",
          "simulated network error",
        );
      } else {
        markStatus(action.actionId, "syncing", "synced", "sync ok");
      }
    }
  }, [markStatus, queue, simulateFailure]);

  const clearLog = useCallback(() => setTraceLog([]), []);

  const pendingCount = useMemo(
    () =>
      queue.filter(
        (item) => item.status === "queued" || item.status === "failed",
      ).length,
    [queue],
  );

  return {
    queue,
    enqueue,
    processQueue,
    pendingCount,
    traceLog,
    clearLog,
  };
};
