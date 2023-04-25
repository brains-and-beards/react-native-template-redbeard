import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import format from '../utils/format'
import translationEN from './en/translation.json'
import translationPL from './pl/translation.json'

export const resources = {
  en: {
    translation: translationEN,
  },
  pl: {
    translation: translationPL,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
    format,
  },
})
