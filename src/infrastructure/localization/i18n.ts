import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'
import detector from "i18next-browser-languagedetector"
const es = require('../../assets/locales/es.json')
const en = require('../../assets/locales/en.json')

const resources = {
  en: { translation: en },
  es: { translation: es }
};
      
i18n
  .use(detector)
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    backend: {
      loadPath: "./assets/locales/{{lng}}.json"
    },
    lng: "en",
    fallbackLng: "es", // use en if detected lng is not available
    keySeparator: false, //'.',
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
      wait: true
    }
  });

export default i18n