import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

void i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: import.meta.env.VITE_APP_LOCALE ?? 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        title: 'Level 3 Advanced Foundation',
        advanced: 'Queues, websockets, storage, monitoring, and i18n are wired.',
      },
    },
    uk: {
      translation: {
        title: 'Рівень 3 Розширений Фундамент',
        advanced: 'Черги, вебсокети, сховище, моніторинг та i18n підключені.',
      },
    },
  },
})

export default i18n
