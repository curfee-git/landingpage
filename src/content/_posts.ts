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

function cleanReferenceText(text: string): string {
  return text
    .replace(/^["'‘’“”\s]+/, '')
    .replace(/["'‘’“”\s]+$/, '')
    .trim();
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
  const all = await getCollection('blog');
  return all.sort((a, b) => b.data.createdAt.getTime() - a.data.createdAt.getTime());
}

export function postPath(post: BlogPost, locale: 'en' | 'de' = 'en'): string {
  const slug = postSlug(post);
  return `/${locale}/blog/${slug}/`;
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

export function reorderForGrid<T>(items: T[], weight: (item: T) => number): T[] {
  if (items.length <= 1) return [...items];
  const sorted = [...items].sort((a, b) => weight(a) - weight(b));
  const rows = Math.ceil(sorted.length / 2);
  const col1: T[] = [];
  const col2: T[] = [];
  for (let i = 0; i < rows; i++) {
    col1.push(sorted[2 * i]);
    const second = sorted[2 * i + 1];
    if (second !== undefined) col2.push(second);
  }
  return [...col1, ...col2];
}

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
    const title = REFERENCE_TITLE_OVERRIDES[url] ?? (cleanReferenceText(text) || host);
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
