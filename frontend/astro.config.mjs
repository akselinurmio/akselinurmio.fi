// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://akselinurmio.fi",
  build: {
    format: "preserve",
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
