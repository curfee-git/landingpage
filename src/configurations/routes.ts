const ROUTES = {
  home: '/',
  imprint: '/imprint/',
  privacy: '/privacy/',
  cookies: '/cookies/',
} as const;

export function localizedRoutes(lang: 'de' | 'en') {
  if (lang === 'en') {
    return {
      home: '/en/',
      imprint: '/en/imprint/',
      privacy: '/en/privacy/',
      cookies: '/en/cookies/',
    };
  }
  return ROUTES;
}

export const EXTERNAL = {
  email: 'office@curfee.com',
  mailto: 'mailto:office@curfee.com',
} as const;
