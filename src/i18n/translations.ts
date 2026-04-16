import en from './en.json';

export type Translations = typeof en;

export function getTranslations(): Translations {
  return en;
}
