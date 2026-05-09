import { createContext, useContext } from "react";
import type { ShowcaseTenantContextValue } from "./tenantTypes";

export const TenantContext = createContext<
  ShowcaseTenantContextValue | undefined
>(undefined);

export const useTenantContext = (): ShowcaseTenantContextValue => {
  const value = useContext(TenantContext);
  if (!value) {
    throw new Error("useTenantContext must be used within TenantProvider");
  }
  return value;
};
