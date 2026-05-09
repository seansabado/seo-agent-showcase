import { describe, expect, it } from "vitest";
import { verifyTenantAccess } from "./tenantGuard";

describe("verifyTenantAccess", () => {
  it("allows access for valid actor and tenant id", () => {
    const result = verifyTenantAccess(
      { uid: "actor_1", email: "demo@example.com" },
      "tenant_demo_1",
    );

    expect(result.tenantId).toBe("tenant_demo_1");
    expect(result.role).toBe("owner");
  });

  it("throws for missing tenant id", () => {
    expect(() =>
      verifyTenantAccess({ uid: "actor_1", email: "demo@example.com" }),
    ).toThrow("invalid-tenant");
  });

  it("throws for non-tenant ids", () => {
    expect(() =>
      verifyTenantAccess({ uid: "actor_1", email: "demo@example.com" }, "abc"),
    ).toThrow("permission-denied");
  });
});
