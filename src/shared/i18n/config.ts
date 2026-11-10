import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { ru } from './messages/ru'
import { isLocale, type Locale } from './locales'

export const SSR_LOCALE: Locale = 'ru'

const loadedLocales = new Set<Locale>(['ru'])

export function resolveClientLocale(): Locale {
  if (typeof window === 'undefined') {
    return SSR_LOCALE
  }

  const languages = window.navigator.languages?.length
    ? window.navigator.languages
    : [window.navigator.language]

  for (const language of languages) {
    if (language.toLowerCase().startsWith('ru')) {
      return 'ru'
    }
  }

  return 'en'
}

async function ensureLocale(locale: Locale) {
  if (loadedLocales.has(locale) || i18n.hasResourceBundle(locale, 'translation')) {
    loadedLocales.add(locale)
    return
  }

  if (locale === 'en') {
    const { en } = await import('./messages/en')
    i18n.addResourceBundle('en', 'translation', en, true, true)
    loadedLocales.add('en')
  }
}

void i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
  },
  lng: SSR_LOCALE,
  fallbackLng: 'ru',
  supportedLngs: ['ru', 'en'],
  nonExplicitSupportedLngs: true,
  partialBundledLanguages: true,
  load: 'languageOnly',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
})

i18n.on('languageChanged', (language) => {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.lang = isLocale(language)
    ? language
    : language.startsWith('ru')
      ? 'ru'
      : 'en'
})

export async function syncClientLocale() {
  const nextLocale = resolveClientLocale()

  try {
    await ensureLocale(nextLocale)
  } catch (error) {
    console.error('Failed to load locale', nextLocale, error)
    return
  }

  if (nextLocale !== i18n.language) {
    await i18n.changeLanguage(nextLocale)
    return
  }

  if (typeof document !== 'undefined') {
    document.documentElement.lang = nextLocale
  }
}

export default i18n
