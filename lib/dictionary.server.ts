import en from '@/i18n/en'
import zh from '@/i18n/zh'

const dictionaries = { en, zh } as const

export function getDictionary(lang: string) {
  return lang === 'zh' ? zh : en
}
