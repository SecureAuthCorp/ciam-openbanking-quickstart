import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://localhost:8085",
        changeOrigin: true,
        secure: false,
      },
      "/config.json": {
        target: "https://localhost:8085",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "build",
  },
});
