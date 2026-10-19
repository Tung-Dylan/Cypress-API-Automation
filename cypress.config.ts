import { defineConfig } from "cypress";
import "dotenv/config";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
    baseUrl:
      process.env.CYPRESS_BASE_URL ||
      "https://jsonplaceholder.typicode.com",
  },
});
