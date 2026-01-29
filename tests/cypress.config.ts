import { defineConfig } from "cypress";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  projectId: "icwsy8",
  defaultCommandTimeout: 10000,
  e2e: {
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      config.env = {
        ...config.env,
        ...process.env,
        consent_self_service_url: "https://localhost:8085",
        consent_admin_url: "https://localhost:8086",
        tpp_url: "https://localhost:8090",
        financroo_url: "https://localhost:8091",
        mock_data_recipient_url: "https://localhost:9001",
      };
      return config;
    },
  },
});
