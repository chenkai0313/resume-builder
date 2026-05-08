'use client'

import { useParams } from 'next/navigation'
import en from '@/i18n/en'
import zh from '@/i18n/zh'

const dictionaries = { en, zh } as const
type Dict = typeof en

export function useTranslations() {
  const params = useParams()
  const lang = (params.lang as string) || 'en'
  const dict: Dict = lang === 'zh' ? zh : en

  return {
    t: dict,
    lang,
    isZh: lang === 'zh',
  }
}

export function getDictionary(lang: string): Dict {
  return lang === 'zh' ? zh : en
}
