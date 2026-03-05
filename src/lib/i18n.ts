export type Locale = 'en' | 'rw' | 'fr'

export const locales: Locale[] = ['en', 'rw', 'fr']
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  rw: 'Kinyarwanda',
  fr: 'Français',
}

// Translation files - using require for JSON imports
const translations: Record<Locale, any> = {
  en: require('./translations/en.json'),
  rw: require('./translations/rw.json'),
  fr: require('./translations/fr.json'),
}

export function getTranslations(locale: Locale = defaultLocale) {
  return translations[locale] || translations[defaultLocale]
}

export function t(key: string, locale: Locale = defaultLocale, params?: Record<string, string | number>): string {
  const translation = translations[locale] || translations[defaultLocale]
  const keys = key.split('.')
  let value: any = translation
  
  for (const k of keys) {
    value = value?.[k]
    if (value === undefined) {
      // Fallback to English
      let fallback: any = translations[defaultLocale]
      for (const fk of keys) {
        fallback = fallback?.[fk]
      }
      value = fallback || key
      break
    }
  }
  
  if (typeof value === 'string' && params) {
    return value.replace(/\{\{(\w+)\}\}/g, (match, param) => {
      return params[param]?.toString() || match
    })
  }
  
  return typeof value === 'string' ? value : key
}

