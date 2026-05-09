# Cloud Functions Patterns (Showcase)

## Summary

This guide demonstrates generic callable-function patterns for authentication, tenant guard checks, and audit logging. These examples are intentionally fake and safe.

## Core Wrapper Flow

```text
onCall(request):
  actor = requireAuth(request)
  tenant = verifyTenantAccess(actor, request.data.tenantId)
  result = runAction(request.data)
  logAudit({ actor, tenant, action, result })
  return result
```

## Pattern: requireAuth

- Validate identity exists
- Normalize actor object
- Throw typed error if missing/invalid

## Pattern: verifyTenantAccess

- Require tenantId in request
- Verify actor has membership in tenant
- Attach role and permissions for downstream checks

## Pattern: logAudit

- Persist action metadata
- Include actorId, tenantId, actionName, status, timestamp
- Avoid sensitive payload storage

## Safe Example Callable Methods

- createProposalSample
- updateRunnerStateSample
- submitOfflineBatchSample

## Error Design

- Use explicit error codes
- Avoid leaking internal details
- Distinguish retryable vs non-retryable failures

## Operational Tips

- Keep callables small and composable
- Use shared guards/utilities to reduce drift
- Add structured logs for monitoring and incident review
