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

/**
 * Runs on the root /404.html (which GitHub Pages serves for ANY 404).
 * If the URL or stored preference indicates German, redirect to /de/404/
 * so the user sees a localized 404 page.
 */
export function redirectIfDeLocale(): void {
  try {
    const path = window.location.pathname || '';
    const isDe = path.startsWith('/de/') || path === '/de' || readStoredLocale() === 'de';
    if (isDe && !/^\/de\/404\/?$/.test(path)) {
      window.location.replace('/de/404/');
    }
  } catch {
    /* no-op */
  }
}
