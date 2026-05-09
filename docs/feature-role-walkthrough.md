# Feature-to-Role Walkthrough

This document maps each feature module in the showcase to the role(s) that can access it, and explains the access control mechanism used.

---

## Role Model

This showcase uses a simplified three-role model matching common SaaS ERP patterns:

| Role      | Description                                                                            |
| --------- | -------------------------------------------------------------------------------------- |
| `owner`   | Full access — all modules, all branches, all settings                                  |
| `manager` | Operational access — order management, machines, queue; no financial or config modules |
| `staff`   | Limited operational access — order creation and machine status only                    |

In the showcase, role context is set via the **Tenant Switcher** (top-right of the app). Switching roles re-evaluates all guard checks.

---

## Feature Access Matrix

| Feature              | owner | manager | staff | Guard Type                                       |
| -------------------- | ----- | ------- | ----- | ------------------------------------------------ |
| Create Fake Order    | ✅    | ✅      | ✅    | None — open to all authenticated users in tenant |
| Sync Queue           | ✅    | ✅      | ✅    | Online status gate only                          |
| Set Machine State    | ✅    | ✅      | ✅    | Tenant guard                                     |
| View Orders          | ✅    | ✅      | ✅    | Tenant guard                                     |
| View Offline Queue   | ✅    | ✅      | ✅    | Tenant guard                                     |
| Simulate Fail (demo) | ✅    | ✅      | ❌    | Role guard (`manager` minimum)                   |
| View Telemetry Log   | ✅    | ✅      | ❌    | Role guard (`manager` minimum)                   |
| Tenant Switcher      | ✅    | ✅      | ❌    | Role guard (`manager` minimum)                   |
| Tenant Config        | ✅    | ❌      | ❌    | Role guard (`owner` only)                        |

---

## How Guards Work in This Showcase

### Tenant Guard

`src/shared/guards/tenantGuard.ts`

Every domain operation receives a `{ tenantId, userId }` context. The guard verifies:

1. The user is authenticated
2. The user's `tenantId` matches the requested `tenantId`
3. If either check fails, the operation throws before any data is touched

**Why this matters:** Route-level auth (`if (!user) return`) is not enough. A bug in route logic could expose a page — but if the guard is in the data layer, data never flows to the wrong tenant regardless of UI state.

### Role Guard

`src/shared/guards/callableGuard.ts`

Callable operations that require elevated roles pass the required role as a guard parameter. The composition runs:

1. Auth check (must be authenticated)
2. Tenant check (must be in correct tenant)
3. Role check (must have required role or higher)
4. Audit log write (operation recorded before execution)

Only if all four pass does the operation execute.

### UI Visibility vs. Guard Enforcement

The role access matrix above applies at **two levels**:

1. **UI layer** — Lower-role views hide or disable controls for features they cannot access. This is UX, not security.
2. **Guard layer** — Every operation is re-checked in the guard regardless of UI state. Disabling a button is not a security control.

This distinction matters. The UI can be manipulated (devtools, direct API calls). Guards cannot.

---

## Role Escalation and Privilege Creep

In a production system, this showcase would also enforce:

- **Explicit role assignment** — roles are never inferred from email domain or other proxy signals
- **Minimum privilege by default** — new users default to `staff` until explicitly promoted
- **Audit trail on role changes** — every role grant or revocation is logged with actor + timestamp
- **Branch-scoped roles** — a manager of Branch A has no privileges in Branch B

These are not implemented in the showcase (it would require a real backend), but they are documented here as the production-hardening layer. See [production-hardening.md](production-hardening.md).
