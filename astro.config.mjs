import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import compress from "@playform/compress";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import { resolve } from "node:path";
import { readdir, stat, readFile } from "node:fs/promises";
import { join } from "node:path";

async function getBlogLastmodMap() {
  const dir = resolve("./src/content/blog");
  const map = new Map();
  try {
    const files = await readdir(dir);
    for (const file of files) {
      if (!file.endsWith(".md") || file.startsWith("_")) continue;
      const full = join(dir, file);
      const content = await readFile(full, "utf8");
      const fm = content.match(/^---[\s\S]*?---/);
      let lastmod = null;
      if (fm) {
        const updated = fm[0].match(/updatedAt:\s*"?([^"\n]+)"?/);
        const created = fm[0].match(/createdAt:\s*"?([^"\n]+)"?/);
        const draft = fm[0].match(/draft:\s*true/);
        if (draft) continue;
        lastmod = (updated && updated[1]) || (created && created[1]) || null;
      }
      if (!lastmod) {
        const s = await stat(full);
        lastmod = s.mtime.toISOString();
      }
      const slug = file.replace(/\.md$/, "");
      map.set(`/blog/${slug}/`, new Date(lastmod).toISOString());
    }
  } catch {}
  return map;
}

const blogLastmodMap = await getBlogLastmodMap();
const buildDate = new Date().toISOString();

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
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      filter: (page) => !/\/404\/?$/.test(page),
      serialize(item) {
        const url = new URL(item.url);
        const path = url.pathname;
        const blogLastmod = blogLastmodMap.get(path);
        if (blogLastmod) {
          item.lastmod = blogLastmod;
          item.priority = 0.8;
          item.changefreq = "monthly";
        } else if (path === "/") {
          item.lastmod = buildDate;
          item.priority = 1.0;
          item.changefreq = "weekly";
        } else if (path === "/blog/") {
          item.lastmod = buildDate;
          item.priority = 0.9;
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
      HTML: false,
      Image: false,
      JavaScript: true,
      SVG: false,
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
