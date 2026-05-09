import type { CallableRequest } from "./auth";
import { requireAuth } from "./auth";
import { verifyTenantAccess } from "./tenantGuard";
import { logAudit } from "./auditLogger";

interface CreateOrderData {
  tenantId: string;
  orderId: string;
  total: number;
}

export const createOrderSample = (
  request: CallableRequest<CreateOrderData>,
): { ok: true; orderId: string } => {
  const actor = requireAuth(request);
  const guard = verifyTenantAccess(actor, request.data.tenantId);

  const result = {
    ok: true as const,
    orderId: request.data.orderId,
  };

  logAudit({
    actorId: actor.uid,
    tenantId: guard.tenantId,
    action: "createOrderSample",
    status: "ok",
    details: {
      total: request.data.total,
    },
  });

  return result;
};
