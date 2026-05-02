import de from './de.json';

export type Translations = typeof de;

export function getTranslations(): Translations {
  return de;
}
