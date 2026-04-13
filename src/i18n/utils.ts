import type { Lang } from '@/configurations/i18n';

export function getLangFromUrl(url: URL): Lang {
  const pathname = url.pathname;
  if (pathname.startsWith('/en/') || pathname === '/en') return 'en';
  return 'de';
}

export function getAlternateUrl(url: URL, siteUrl: string): { en: string; de: string } {
  const pathname = url.pathname;
  let basePath: string;

  if (pathname.startsWith('/en/') || pathname === '/en') {
    basePath = pathname.replace(/^\/en\/?/, '/') || '/';
  } else {
    basePath = pathname;
  }

  // Normalize DE path to always end with a trailing slash so canonical +
  // hreflang match the served URLs (GitHub Pages serves directories with
  // trailing slashes, and the generated sitemap uses trailing slashes too).
  const normalizedBase =
    basePath === '/' ? '/' : basePath.replace(/\/?$/, '/');
  const enPath = normalizedBase === '/' ? '/en/' : `/en${normalizedBase}`;

  return {
    de: `${siteUrl}${normalizedBase}`,
    en: `${siteUrl}${enPath}`,
  };
}
