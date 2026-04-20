import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://curfee.com';

function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog'))
    .sort((a, b) => (b.data.updatedAt ?? b.data.createdAt).getTime() - (a.data.updatedAt ?? a.data.createdAt).getTime());

  const items = posts
    .map((p) => {
      const slug = p.id.replace(/\.md$/, '');
      const url = `${SITE}/blog/${slug}/`;
      const pubDate = (p.data.updatedAt ?? p.data.createdAt).toUTCString();
      const category = p.data.topic ? `<category>${escapeXml(p.data.topic)}</category>` : '';
      const tagCats = (p.data.tags ?? []).map((t: string) => `<category>${escapeXml(t)}</category>`).join('');
      return `    <item>
      <title>${escapeXml(p.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(p.data.excerpt)}</description>
      <author>office@curfee.com (Philipp Höllinger)</author>
      ${category}${tagCats}
    </item>`;
    })
    .join('\n');

  const lastBuildDate = posts.length
    ? (posts[0].data.updatedAt ?? posts[0].data.createdAt).toUTCString()
    : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Curfee Blog</title>
    <link>${SITE}/blog/</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Essays on systems, software and infrastructure architecture by Philipp Höllinger.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
