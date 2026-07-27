import en from './en.json';
import de from './de.json';

export type Translations = typeof en;
type Locale = 'en' | 'de';

const translations: Record<Locale, Translations> = {
  en,
  de: de as Translations,
};

function resolveLocale(locale?: string): Locale {
  return locale === 'de' ? 'de' : 'en';
}

export function getTranslations(locale?: string): Translations {
  return translations[resolveLocale(locale)];
}
