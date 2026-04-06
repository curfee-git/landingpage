import { BRAND } from '@/configurations/brand';
export const ROUTES = {
  home: '/',
  diagnosis: '/services/diagnosis',
  guidance: '/services/guidance',
  sparring: '/services/sparring',
  imprint: '/imprint',
  privacy: '/privacy',
  cookies: '/cookies',
} as const;

export function localizedRoutes(lang: 'de' | 'en') {
  if (lang === 'en') {
    return {
      home: '/en/',
      diagnosis: '/en/services/diagnosis',
      guidance: '/en/services/guidance',
      sparring: '/en/services/sparring',
      imprint: '/en/imprint',
      privacy: '/en/privacy',
      cookies: '/en/cookies',
    };
  }
  return ROUTES;
}

export const EXTERNAL = {
  email: `mailto:${BRAND.email}`,
} as const;
