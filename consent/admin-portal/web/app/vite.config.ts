import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://localhost:8086",
        changeOrigin: true,
        secure: false,
      },
      "/clients": {
        target: "https://localhost:8086",
        changeOrigin: true,
        secure: false,
      },
      "/consents": {
        target: "https://localhost:8086",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "build",
  },
});
