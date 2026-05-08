'use client'

import Link from 'next/link'
import { useTranslations } from '@/lib/i18n'
import { usePathname } from 'next/navigation'
import { FileText } from 'lucide-react'

export default function Header() {
  const { t, lang } = useTranslations()
  const pathname = usePathname()
  const switchLang = lang === 'zh' ? 'en' : 'zh'
  const switchPath = pathname.replace(/^\/[^\/]+/, `/${switchLang}`)

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2 font-semibold text-lg text-foreground">
          <FileText className="w-5 h-5 text-accent-emerald" />
          <span>{t.nav.builder}</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href={`/${lang}`} className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.home}</Link>
          <Link href={`/${lang}/builder`} className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.builder}</Link>
          <Link href={switchPath} className="text-xs text-muted-foreground hover:text-foreground transition-colors border border-border rounded px-2 py-0.5">
            {lang === 'zh' ? 'English' : '中文'}
          </Link>
        </nav>
      </div>
    </header>
  )
}
