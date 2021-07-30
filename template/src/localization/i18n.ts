import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationEN from './en/translation.json';
import translationDE from './de/translation.json';

export const resources = {
  en: {
    translation: translationEN,
  },
  de: {
    translation: translationDE,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
