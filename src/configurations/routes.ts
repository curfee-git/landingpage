import { getRelativeLocaleUrl } from 'astro:i18n';
import { resolveLocale, type Locale } from '@/i18n/translations';

const PATHS = {
  home: '',
  about: 'about/',
  blog: 'blog/',
  contact: 'contact/',
  imprint: 'imprint/',
  privacy: 'privacy/',
  service: {
    diagnosis: 'services/diagnosis/',
    guidance: 'services/guidance/',
    advisory: 'services/advisory/',
  },
} as const;

export function getRoutes(localeInput?: unknown) {
  const locale: Locale = resolveLocale(localeInput);
  const url = (p: string) => getRelativeLocaleUrl(locale, p);
  return {
    home: url(PATHS.home),
    about: url(PATHS.about),
    blog: url(PATHS.blog),
    contact: url(PATHS.contact),
    imprint: url(PATHS.imprint),
    privacy: url(PATHS.privacy),
    service: {
      diagnosis: url(PATHS.service.diagnosis),
      guidance: url(PATHS.service.guidance),
      advisory: url(PATHS.service.advisory),
    },
  };
}

export const ROUTES = getRoutes('en');

export const EXTERNAL = {
  email: 'office@curfee.com',
  mailto: 'mailto:office@curfee.com',
  phone: '+43 677 630 242 28',
  tel: 'tel:+4367763024228',
  linkedin: 'https://www.linkedin.com/in/phoellinger',
} as const;
