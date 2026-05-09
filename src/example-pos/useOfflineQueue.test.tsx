import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useOfflineQueue } from "./useOfflineQueue";

describe("useOfflineQueue", () => {
  it("enqueues actions and increments pending count", () => {
    const { result } = renderHook(() => useOfflineQueue(false));

    act(() => {
      result.current.enqueue("ORDER_CREATE", { orderId: "ord_1" });
      result.current.enqueue("ORDER_CREATE", { orderId: "ord_2" });
    });

    expect(result.current.queue).toHaveLength(2);
    expect(result.current.pendingCount).toBe(2);
    expect(result.current.queue[0].status).toBe("queued");
  });

  it("marks queued actions as synced when processed", async () => {
    const { result } = renderHook(() => useOfflineQueue(false));

    act(() => {
      result.current.enqueue("ORDER_CREATE", { orderId: "ord_sync" });
    });

    await act(async () => {
      await result.current.processQueue();
    });

    expect(result.current.queue[0].status).toBe("synced");
    expect(result.current.pendingCount).toBe(0);
  });

  it("marks actions as failed when simulateFailure is true", async () => {
    const { result } = renderHook(() => useOfflineQueue(true));

    act(() => {
      result.current.enqueue("ORDER_CREATE", { orderId: "ord_fail" });
    });

    await act(async () => {
      await result.current.processQueue();
    });

    expect(result.current.queue[0].status).toBe("failed");
    expect(result.current.pendingCount).toBe(1);
    expect(result.current.traceLog.some((e) => e.to === "failed")).toBe(true);
  });

  it("appends trace events on enqueue and sync", async () => {
    const { result } = renderHook(() => useOfflineQueue(false));

    act(() => {
      result.current.enqueue("ORDER_CREATE", { orderId: "ord_trace" });
    });

    await act(async () => {
      await result.current.processQueue();
    });

    const toValues = result.current.traceLog.map((e) => e.to);
    expect(toValues).toContain("queued");
    expect(toValues).toContain("syncing");
    expect(toValues).toContain("synced");
  });

  it("clears the trace log when clearLog is called", async () => {
    const { result } = renderHook(() => useOfflineQueue(false));

    act(() => {
      result.current.enqueue("ORDER_CREATE", { orderId: "ord_clear" });
    });

    await act(async () => {
      await result.current.processQueue();
    });

    expect(result.current.traceLog.length).toBeGreaterThan(0);

    act(() => {
      result.current.clearLog();
    });

    expect(result.current.traceLog).toHaveLength(0);
  });

  it("increments retryCount on re-process after failure", async () => {
    const { result, rerender } = renderHook(
      ({ fail }: { fail: boolean }) => useOfflineQueue(fail),
      { initialProps: { fail: true } },
    );

    act(() => {
      result.current.enqueue("ORDER_CREATE", { orderId: "ord_retry" });
    });

    // First attempt — fails
    await act(async () => {
      await result.current.processQueue();
    });

    expect(result.current.queue[0].status).toBe("failed");
    expect(result.current.queue[0].retryCount).toBe(0);

    // Switch off failure mode and retry
    rerender({ fail: false });

    await act(async () => {
      await result.current.processQueue();
    });

    expect(result.current.queue[0].status).toBe("synced");
    expect(result.current.queue[0].retryCount).toBe(1);
  });

  it("skips already-synced items on re-process", async () => {
    const { result } = renderHook(() => useOfflineQueue(false));

    act(() => {
      result.current.enqueue("ORDER_CREATE", { orderId: "ord_skip" });
    });

    // Sync once — succeeds
    await act(async () => {
      await result.current.processQueue();
    });

    expect(result.current.queue[0].status).toBe("synced");
    const logLengthAfterFirst = result.current.traceLog.length;

    // Sync again — synced item must be skipped, no new trace events
    await act(async () => {
      await result.current.processQueue();
    });

    expect(result.current.traceLog.length).toBe(logLengthAfterFirst);
  });

  it("trace note contains 'simulated' on failure", async () => {
    const { result } = renderHook(() => useOfflineQueue(true));

    act(() => {
      result.current.enqueue("ORDER_CREATE", { orderId: "ord_note" });
    });

    await act(async () => {
      await result.current.processQueue();
    });

    const failEvent = result.current.traceLog.find((e) => e.to === "failed");
    expect(failEvent?.note).toMatch(/simulated/i);
  });
});
