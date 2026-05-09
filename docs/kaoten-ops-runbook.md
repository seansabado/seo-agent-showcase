# KaOten Operations Runbook

## Summary

This runbook defines how operators and engineers respond to queue, runner, and visibility incidents in the KaOten showcase model.

## Incident Classes

| Class               | Description                         | Typical Trigger                          |
| ------------------- | ----------------------------------- | ---------------------------------------- |
| Queue stall         | queued items not progressing        | prolonged offline state or sync failure  |
| Failure spike       | sudden increase in failed actions   | upstream outage or invalid payload shape |
| Runner saturation   | too many runners in use/maintenance | workload burst or maintenance overlap    |
| Visibility mismatch | unexpected UI visibility by role    | preview-role misconfiguration            |

## Triage Checklist

1. Confirm tenant/workspace context.
2. Confirm online/offline state.
3. Inspect queue counters and recent trace events.
4. Identify whether failures are retryable.
5. Execute controlled retry and verify transition outcome.

## Queue Recovery Procedure

1. Freeze non-critical action creation.
2. Export current queue snapshot for audit.
3. Retry in bounded batches.
4. Separate persistent failures for manual review.
5. Resume normal flow when failure rate returns to baseline.

## Runner Recovery Procedure

1. Identify runners in `maintenance` or flapping states.
2. Reallocate work to idle runners.
3. Re-test with low-risk action batch.
4. Promote to normal traffic when stable.

## Release Readiness Checks

Before shipping a change:

1. Run `npm run typecheck`.
2. Run `npm run test`.
3. Run `npm run build`.
4. Verify role preview and queue lifecycle still behave correctly.
5. Confirm docs index links for any new module/page changes.

## Communication Template

```text
Incident: <title>
Impact: <who/what affected>
Scope: <tenant/workspace/module>
Current State: <queued/syncing/failed metrics>
Action Taken: <steps>
Next Checkpoint: <time>
Owner: <person>
```

## Rationale

A runbook makes reliability operational, not theoretical, and reduces mean-time-to-recovery during incidents.

## Risks

- Manual incident handling can drift without periodic rehearsal
- Without persistence, queue recovery may lose context on refresh

## Next Steps

1. Add runbook drills to release cadence.
2. Add queue/runner health dashboards with alert thresholds.
3. Add dead-letter procedures for non-retryable actions.
