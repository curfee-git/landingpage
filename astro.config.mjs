import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compress from "@playform/compress";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import { resolve } from "node:path";

export default defineConfig({
  site: "https://curfee.com",
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
    tailwind(),
    sitemap({
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
