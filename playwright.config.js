import { defineConfig } from "@playwright/test";

export default defineConfig({
  reporter: process.env.CI ? "github" : "line",
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:4321",
  },
  webServer: {
    command: "npm run dev:frontend",
    port: 4321,
    timeout: 10_000,
    reuseExistingServer: !process.env.CI,
  },
});
