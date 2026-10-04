import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.wavival.dev",
  base: "/nullbreach",
  output: "static",
  publicDir: "../../public",
  integrations: [sitemap()],
});
