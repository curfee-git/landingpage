const ROUTES = {
  home: '/',
  blog: '/blog/',
  imprint: '/imprint/',
  privacy: '/privacy/',
} as const;

export function localizedRoutes(lang: 'de' | 'en') {
  if (lang === 'en') {
    return {
      home: '/en/',
      blog: '/en/blog/',
      imprint: '/en/imprint/',
      privacy: '/en/privacy/',
    };
  }
  return ROUTES;
}

export const EXTERNAL = {
  email: 'office@curfee.com',
  mailto: 'mailto:office@curfee.com',
} as const;
