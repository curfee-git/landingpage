import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compress from "@playform/compress";
import { resolve } from "node:path";

export default defineConfig({
  site: "https://curfee.com",
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'de',
        locales: {
          de: 'de-AT',
          en: 'en',
        },
      },
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    compress({
      CSS: true,
      HTML: false,
      Image: false,
      JavaScript: true,
      SVG: false,
    }),
  ],
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  server: { host: true, port: 4322 },
  vite: {
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
