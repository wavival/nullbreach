import { defineConfig, devices } from "@playwright/test";

const externalBaseURL = process.env.E2E_BASE_URL?.trim();
const baseURL = externalBaseURL || "http://localhost:3000";

export default defineConfig({
  testDir: "./__tests__/e2e",
  fullyParallel: true,
  reporter: [["html", { open: "never" }], ["list"]],
  use: { baseURL, trace: "retain-on-failure" },
  webServer: externalBaseURL
    ? undefined
    : {
        command: "npm run dev",
        url: baseURL,
        reuseExistingServer: !process.env.CI,
      },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
