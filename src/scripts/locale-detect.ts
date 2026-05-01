import { LOCALES, type Locale } from '@/i18n/translations';

const LANG_STORAGE_KEY = 'curfee_lang';

function readStoredLocale(): Locale | null {
  try {
    const v = localStorage.getItem(LANG_STORAGE_KEY);
    return LOCALES.includes(v as Locale) ? (v as Locale) : null;
  } catch {
    return null;
  }
}

function readBrowserLocale(): Locale {
  const nav = (
    navigator.language || (navigator.languages && navigator.languages[0]) || 'en'
  ).toLowerCase();
  return nav.startsWith('de') ? 'de' : 'en';
}

export function detectPreferredLocale(): Locale {
  return readStoredLocale() ?? readBrowserLocale();
}

export function redirectToPreferredLocale(): void {
  try {
    const locale = detectPreferredLocale();
    let target = `/${locale}/`;
    if (window.location.search) target += window.location.search;
    if (window.location.hash) target += window.location.hash;
    window.location.replace(target);
  } catch {
    window.location.replace('/en/');
  }
}
