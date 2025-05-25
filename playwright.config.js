import { defineConfig } from "@playwright/test";

export default defineConfig({
  reporter: process.env.CI ? "github" : "line",
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:1234",
  },
  webServer: {
    command: "npm run dev:frontend",
    port: 1234,
    timeout: 30_000,
    reuseExistingServer: !process.env.CI,
  },
});
