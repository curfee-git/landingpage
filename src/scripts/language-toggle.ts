import { LOCALES, type Locale } from '@/i18n/translations';

const LANG_STORAGE_KEY = 'curfee_lang';

let cleanup: Array<() => void> = [];

function runCleanup(): void {
  for (const fn of cleanup) {
    try {
      fn();
    } catch {
      /* ignore */
    }
  }
  cleanup = [];
}

function persist(locale: Locale): void {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
}

/**
 * The toggle is a plain anchor that navigates to the other locale's URL.
 * This handler persists the chosen locale so future first-loads honor the
 * user's explicit pick instead of re-detecting from navigator.language.
 */
export function initLanguageToggle(): void {
  runCleanup();

  const onClick = (e: Event): void => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const link = target.closest<HTMLAnchorElement>('[data-lang-toggle-link]');
    if (!link) return;
    const loc = link.getAttribute('data-locale');
    if (LOCALES.includes(loc as Locale)) persist(loc as Locale);
  };

  document.addEventListener('click', onClick);
  cleanup.push(() => document.removeEventListener('click', onClick));
}

if (typeof document !== 'undefined') {
  document.addEventListener('astro:before-swap', runCleanup);
}
