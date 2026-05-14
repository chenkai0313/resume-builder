'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function HtmlLangSetter() {
  const pathname = usePathname()
  useEffect(() => {
    document.documentElement.lang = pathname.startsWith('/zh') ? 'zh' : 'en'
  }, [pathname])
  return null
}
