import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import compress from "@playform/compress";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import { resolve } from "node:path";

const buildDate = new Date().toISOString();

export default defineConfig({
  site: "https://curfee.com",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de"],
    routing: { prefixDefaultLocale: false },
  },
  prefetch: { defaultStrategy: 'hover' },
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener', 'noreferrer'],
          protocols: ['http', 'https'],
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          test: ['h2', 'h3'],
          properties: {
            class: 'heading-anchor',
            ariaHidden: 'true',
            tabIndex: -1,
          },
          content: {
            type: 'text',
            value: '#',
          },
        },
      ],
    ],
  },
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      filter: (page) => !/\/404\/?$/.test(page),
      serialize(item) {
        const url = new URL(item.url);
        const path = url.pathname;
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
      CSS: true,
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
