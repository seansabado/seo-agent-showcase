import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/seo-agent-showcase/" : "/",
  plugins: [react()],
}));
