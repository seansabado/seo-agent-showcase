# Security Boundaries (Showcase)

## Summary

This showcase is intentionally designed to demonstrate secure engineering patterns while excluding all sensitive implementation details.

---

## Threat Model

This section describes what attack classes the demonstrated patterns are designed to defend against. It exists because "I check the tenantId" is less useful than "here's the specific threat that check prevents."

### Threat 1: Cross-Tenant Data Access (Horizontal Privilege Escalation)

**Attack:** An authenticated user of Tenant A constructs a request that reads or writes data belonging to Tenant B by manipulating a `tenantId` parameter client-side.

**Why this is real:** In naive multi-tenant SaaS, tenant scoping is only enforced at the route or UI level. If the data layer doesn't re-check `tenantId`, a motivated attacker (or a frontend bug) can reach another tenant's data.

**Mitigation demonstrated:** `tenantGuard` verifies `request.tenantId === auth.token.tenantId` at the function boundary, before any data access. Even if the client sends the wrong `tenantId`, the guard rejects it. In production, Firestore security rules add a second enforcement layer at the database level.

---

### Threat 2: Unauthenticated Callable Invocation

**Attack:** An unauthenticated request calls a Cloud Function directly (bypassing the frontend auth gate) to trigger a privileged operation.

**Why this is real:** Frontend auth gates (redirecting unauthenticated users to `/login`) are UX controls, not security controls. Any callable endpoint exposed without server-side auth verification is reachable from curl.

**Mitigation demonstrated:** `requireAuth` is the first step in the composable guard — the callable returns an `UNAUTHENTICATED` error before any logic executes if `context.auth` is null.

---

### Threat 3: Privilege Escalation via Role Manipulation

**Attack:** A `staff` user modifies their client-side role state (localStorage, Redux, etc.) to access manager or owner functionality.

**Why this is real:** UI-only role checks are trivially bypassed with browser devtools.

**Mitigation demonstrated:** Role checks in the callable guard use `auth.token.role` — a server-set custom claim, not a client-sent value. The UI may hide a button; the guard makes the operation fail regardless of what the UI shows.

---

### Threat 4: Audit Gap — Privileged Actions Without a Trail

**Attack (insider):** A privileged user (admin, support staff) performs a destructive operation — deletes an order, modifies pricing — with no record of who did it or when.

**Why this is real:** Audit trails are often added after an incident, not before. By then the history is gone.

**Mitigation demonstrated:** The composable guard writes an audit log entry before executing the operation — not after. Even if the operation fails, the attempt is recorded. In production, this log is written to an immutable append-only Firestore collection.

---

## Trust Boundaries

1. **Client boundary** — Browser state is untrusted. `tenantId` and role from client input must be revalidated server-side.
2. **Function boundary** — Every callable requires authentication. Tenant access is validated before any action logic.
3. **Data boundary** — Data access is tenant-scoped. Cross-tenant operations are denied by default.

---

## Data Classification

- All sample data in this repository is synthetic
- No customer, production, or regulated data is included
- No API keys, tokens, or credentials are stored

## Security Controls Demonstrated

- `requireAuth` — identity check at callable entry
- `verifyTenantAccess` — tenant boundary enforcement
- `logAudit` — traceability before execution
- Typed request contracts — reduce unsafe assumptions at boundary

## Explicit Exclusions

- Real production architecture details
- Real schema designs
- Real security rules from any live system
- Real incident handling or internal runbooks
