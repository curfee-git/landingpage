export const ROUTES = {
  home: '/',
  about: '/about/',
  blog: '/blog/',
  contact: '/contact/',
  imprint: '/imprint/',
  privacy: '/privacy/',
  service: {
    diagnosis: '/services/diagnosis/',
    guidance: '/services/guidance/',
    advisory: '/services/advisory/',
  },
} as const;

export function getRoutes() {
  return ROUTES;
}

export const EXTERNAL = {
  email: 'office@curfee.com',
  mailto: 'mailto:office@curfee.com',
  phone: '+43 677 630 242 28',
  tel: 'tel:+4367763024228',
  linkedin: 'https://www.linkedin.com/in/phoellinger',
} as const;
