import en from './en.json';
import de from './de.json';

export type Locale = 'en' | 'de';
export const LOCALES: readonly Locale[] = ['en', 'de'] as const;
export const DEFAULT_LOCALE: Locale = 'en';

export type Translations = typeof en;

const dictionaries = { en, de } satisfies Record<Locale, Translations>;

function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'de';
}

export function resolveLocale(input: unknown): Locale {
  return isLocale(input) ? input : DEFAULT_LOCALE;
}

export function getTranslations(locale?: unknown): Translations {
  return dictionaries[resolveLocale(locale)];
}
