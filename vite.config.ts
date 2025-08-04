// ================================================
// ✅ Vite Config for Esri ArcGIS JS API
// Description: Adds support for @arcgis/core (ESM), excludes from optimizeDeps
// Author: NimbusCore.OpenAI
// Architect: Chad Martin
// Company: CryoRio
// Filename: vite.config.ts
// ================================================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    exclude: ["@arcgis/core"], // ✅ Prevent Vite from trying to pre-bundle this
  },
  resolve: {
    alias: {
      "@arcgis/core": path.resolve(__dirname, "node_modules/@arcgis/core"),
    },
  },
});
