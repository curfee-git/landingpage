const ROUTES = {
  home: '/',
  contact: '/#contact',
  imprint: '/imprint/',
  privacy: '/privacy/',
} as const satisfies Record<string, string>;

type Routes = { [K in keyof typeof ROUTES]: string };

export function getRoutes(locale?: string): Routes {
  if (locale === 'de') {
    return {
      home: '/de/',
      contact: '/de/#contact',
      imprint: '/de/imprint/',
      privacy: '/de/privacy/',
    };
  }
  return ROUTES;
}

export const EXTERNAL = {
  email: 'philipp.hoellinger@curfee.com',
  mailto: 'mailto:philipp.hoellinger@curfee.com',
  phone: '+43 677 630 242 28',
  tel: 'tel:+4367763024228',
  linkedin: 'https://www.linkedin.com/in/phoellinger',
} as const satisfies Record<string, string>;
