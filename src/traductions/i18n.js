import { createI18n } from 'vue-i18n'

import { messagesEn } from './en'
import { messagesFr } from './fr'

const i18n = createI18n({
  locale: 'fr',
  fallbackLocale: 'en',
  messages : {
    en: messagesEn,
    fr: messagesFr
  }
})

export { i18n }