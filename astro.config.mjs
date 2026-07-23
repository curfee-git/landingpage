import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import compress from "@playform/compress";
import { resolve } from "node:path";

const buildDate = new Date().toISOString();

export default defineConfig({
  site: "https://curfee.com",
  // Astro 7 defaults to 'jsx' whitespace handling, which strips the space
  // before inline links (e.g. "Phone: <a>"). Keep HTML-aware compression.
  compressHTML: true,
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de"],
    routing: { prefixDefaultLocale: false },
  },
  prefetch: { defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      filter: (page) => !/\/404\/?$/.test(page),
      serialize(item) {
        const url = new URL(item.url);
        const path = url.pathname.replace(/^\/de(\/|$)/, "/");
        if (path === "/") {
          item.lastmod = buildDate;
          item.priority = 1.0;
          item.changefreq = "weekly";
        } else if (path === "/imprint/" || path === "/privacy/") {
          item.lastmod = buildDate;
          item.priority = 0.3;
          item.changefreq = "yearly";
        } else {
          item.lastmod = buildDate;
        }
        return item;
      },
    }),
    compress({
      // CSS is already minified by Vite (lightningcss); csso drops
      // `@media (width >= …)` range-syntax blocks emitted by Tailwind v4.
      CSS: false,
      HTML: true,
      Image: true,
      JavaScript: true,
      SVG: true,
    }),
  ],
  server: { host: true, port: 4322 },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": resolve("./src"),
      },
    },
    build: {
      cssMinify: true,
    },
  },
});
