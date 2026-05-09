# KaOten API Contracts (Showcase)

## Summary

This document describes representative API/callable contracts used by the KaOten showcase. The contracts are intentionally generic and omit production secrets.

## Contract Principles

- Every request must carry tenant context
- Guard validation runs before domain logic
- Responses are tenant-scoped and traceable
- Errors are explicit and retry-aware

## Shared Request Envelope

```ts
type GuardedRequest<TPayload> = {
  tenantId: string;
  workspaceId?: string;
  actorId: string;
  traceId: string;
  payload: TPayload;
};
```

## Shared Response Envelope

```ts
type GuardedResponse<TResult> = {
  ok: boolean;
  traceId: string;
  result?: TResult;
  error?: {
    code: string;
    message: string;
    retryable?: boolean;
  };
};
```

## Representative Actions

### `proposal.create`

Purpose: create a proposal action in the queue.

Payload shape:

```ts
type ProposalCreatePayload = {
  actionId: string;
  title: string;
  tasks: Array<{ id: string; name: string; estimate: number }>;
};
```

Expected result:

- Returns queue state set to `created` or `queued` depending on online status.

### `queue.sync`

Purpose: process queued actions for the active tenant/workspace.

Payload shape:

```ts
type QueueSyncPayload = {
  limit?: number;
  simulateFailure?: boolean;
};
```

Expected result:

- Returns counts for `synced`, `failed`, and `remaining`.

### `runner.setState`

Purpose: update execution runner state.

Payload shape:

```ts
type RunnerSetStatePayload = {
  runnerId: string;
  state: "idle" | "in_use" | "maintenance";
};
```

Expected result:

- Returns current state and last update timestamp.

## Error Contract

| Code              | Meaning                      | Retryable |
| ----------------- | ---------------------------- | --------- |
| `UNAUTHENTICATED` | missing/invalid identity     | no        |
| `TENANT_MISMATCH` | actor not allowed for tenant | no        |
| `RATE_LIMITED`    | request burst exceeds policy | yes       |
| `SYNC_FAILED`     | transient sync failure       | yes       |
| `INVALID_PAYLOAD` | request schema invalid       | no        |

## Rationale

Documented contracts reduce integration ambiguity and make behavior testable before implementation details change.

## Risks

- Generic contracts may diverge from real backend naming
- Missing schema validation docs can lead to client drift

## Next Steps

1. Add JSON Schema snippets per action.
2. Add contract test matrix linked to CI.
3. Add versioning policy for breaking changes.
