import { defineConfig } from "astro/config";
import remarkHighlight from "./src/lib/remark-highlight.mjs";

export default defineConfig({
  site: "https://Kkming761128.github.io",
  base: "/Game-Guide-Hub",
  markdown: {
    remarkPlugins: [remarkHighlight],
  },
});
