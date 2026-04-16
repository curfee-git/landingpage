import { getCollection, type CollectionEntry } from 'astro:content';
import GithubSlugger from 'github-slugger';

export type BlogPost = CollectionEntry<'blog'>;

export interface TocItem {
  text: string;
  slug: string;
}

export interface AdjacentPosts {
  previous: BlogPost | null;
  next: BlogPost | null;
}

export interface ReferenceLink {
  text: string;
  url: string;
  host: string;
  title: string;
}

function humanizeSlug(segment: string): string {
  return segment
    .replace(/\.(html?|php|aspx?|jsp)$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    .replace(/(\d)([a-zA-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function referenceTitleFromUrl(url: string, host: string): string {
  try {
    const u = new URL(url);
    const segments = u.pathname.split('/').filter(Boolean);
    const last = segments[segments.length - 1];
    if (!last || /^index(\.\w+)?$/i.test(last)) return host;
    const humanized = humanizeSlug(decodeURIComponent(last));
    return humanized || host;
  } catch {
    return host;
  }
}

const TOC_MIN_WORDS = 1200;

const WPM = 225;

export function readingTime(body: string, wpm = WPM): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wpm));
}

export function postSlug(post: BlogPost): string {
  return post.id;
}

export async function getPosts(): Promise<BlogPost[]> {
  const all = await getCollection('blog', ({ data }) => {
    return !data.draft;
  });
  return all.sort((a, b) => {
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    return b.data.createdAt.getTime() - a.data.createdAt.getTime();
  });
}

export function postPath(post: BlogPost): string {
  const slug = postSlug(post);
  return `/blog/${slug}/`;
}

export function wordCount(body: string): number {
  return body.trim().split(/\s+/).filter(Boolean).length;
}

export function extractToc(body: string, minWords = TOC_MIN_WORDS): TocItem[] {
  if (wordCount(body) < minWords) return [];
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  for (const line of body.split('\n')) {
    const match = /^##\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const text = match[1].replace(/[*_`]/g, '').trim();
    items.push({ text, slug: slugger.slug(text) });
  }
  return items;
}

const OWN_HOSTS = new Set(['curfee.com']);

const REFERENCE_TITLE_OVERRIDES: Record<string, string> = {
  'https://martinfowler.com/articles/evo-arch-forward.html': 'Building Evolutionary Architectures',
};

export function extractReferences(body: string): ReferenceLink[] {
  const seen = new Set<string>();
  const items: ReferenceLink[] = [];
  const regex = /(?<!!)\[([^\]\n]+)\]\((https?:\/\/[^)\s]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(body)) !== null) {
    const text = m[1].trim();
    const url = m[2].trim();
    if (seen.has(url)) continue;
    seen.add(url);
    let host = '';
    try {
      host = new URL(url).hostname.replace(/^www\./, '');
    } catch {
      host = url;
    }
    if (OWN_HOSTS.has(host)) continue;
    const title = REFERENCE_TITLE_OVERRIDES[url] ?? referenceTitleFromUrl(url, host);
    items.push({ text, url, host, title });
  }
  return items;
}

export async function getAdjacentPosts(current: BlogPost): Promise<AdjacentPosts> {
  const pool = await getPosts();
  const chronological = [...pool].sort(
    (a, b) => a.data.createdAt.getTime() - b.data.createdAt.getTime(),
  );
  const idx = chronological.findIndex((p) => p.id === current.id);
  if (idx < 0) return { previous: null, next: null };
  return {
    previous: idx > 0 ? chronological[idx - 1] : null,
    next: idx < chronological.length - 1 ? chronological[idx + 1] : null,
  };
}

export async function getRelatedPosts(current: BlogPost, max = 3): Promise<BlogPost[]> {
  const pool = await getPosts();
  const others = pool.filter((p) => p.id !== current.id);
  const sameTopic = others.filter((p) => p.data.topic === current.data.topic);
  const rest = others.filter((p) => p.data.topic !== current.data.topic);
  return [...sameTopic, ...rest].slice(0, max);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
