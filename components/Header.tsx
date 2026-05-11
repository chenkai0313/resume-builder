'use client'

import Link from 'next/link'
import { useTranslations } from '@/lib/i18n'
import { usePathname } from 'next/navigation'
import { FileText } from 'lucide-react'
import { useCallback } from 'react'

function switchPath(pathname: string, currentLang: string, targetLang: string): string {
  if (targetLang === 'en') {
    const stripped = pathname.replace(/^\/zh/, '')
    return stripped === '' ? '/' : stripped
  }
  if (pathname === '/') return '/zh'
  return pathname.replace(/^\/en/, '/zh')
}

function setLocaleCookie(locale: string) {
  document.cookie = `locale=${locale};path=/;max-age=31536000;SameSite=Lax`
}

export default function Header() {
  const { t, lang } = useTranslations()
  const pathname = usePathname()
  const targetLang = lang === 'zh' ? 'en' : 'zh'
  const targetPath = switchPath(pathname, lang, targetLang)

  const homeHref = lang === 'en' ? '/' : `/${lang}`
  const handleSwitch = useCallback(() => {
    setLocaleCookie(targetLang)
  }, [targetLang])

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href={homeHref} className="flex items-center gap-2 font-semibold text-lg text-foreground">
          <FileText className="w-5 h-5 text-accent-emerald" />
          <span>{t.nav.builder}</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href={homeHref} className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.home}</Link>
          <Link href={`/${lang}/builder`} className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.builder}</Link>
          <Link href={targetPath} onClick={handleSwitch} className="text-xs text-muted-foreground hover:text-foreground transition-colors border border-border rounded px-2 py-0.5">
            {lang === 'zh' ? 'English' : '中文'}
          </Link>
        </nav>
      </div>
    </header>
  )
}
