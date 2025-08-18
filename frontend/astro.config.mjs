// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://akselinurmio.fi",
  trailingSlash: "always",
  build: {
    format: "preserve",
  },
  compressHTML: false,
});
