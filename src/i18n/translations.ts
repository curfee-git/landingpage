import en from './en.json';
import de from './de.json';
import type { Lang } from '@/configurations/i18n';

export type Translations = typeof de;

const translations: Record<Lang, Translations> = { en, de };

export function getTranslations(lang: Lang): Translations {
  return translations[lang] ?? translations['de'];
}
