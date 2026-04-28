export const ROUTES = {
  home: '/',
  about: '/about/',
  blog: '/blog/',
  imprint: '/imprint/',
  privacy: '/privacy/',
  service: {
    diagnosis: '/services/diagnosis/',
    guidance: '/services/guidance/',
    advisory: '/services/advisory/',
  },
} as const;

export const EXTERNAL = {
  email: 'office@curfee.com',
  mailto: 'mailto:office@curfee.com',
} as const;
