// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://akselinurmio.fi",
  i18n: {
    defaultLocale: "fi",
    locales: ["fi", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    format: "preserve",
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
