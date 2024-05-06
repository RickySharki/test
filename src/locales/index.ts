import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
import type { I18n } from 'vue-i18n'
import zh_CN from './lang/zh-CN'
import zh_EN from './lang/zh-EN'

const messages = {
  'zh-EN': zh_EN,
  'zh-CN': zh_CN,
}
export const i18nOptions = {
  locale: 'zh-CN',
  messages,
  legacy: false,
}

// 初始化I18n国际化 文档地址：https://kazupon.github.io/vue-i18n/zh/
export function setupI18n(app: App) {
  console.log('i18nOptions', i18nOptions)
  const i18n = createI18n(i18nOptions) as I18n
  console.log('🚀 ~ file: index.ts:25 ~ setupI18n ~ i18n:', i18n)
  app.use(i18n)
}
