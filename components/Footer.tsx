'use client'

import { useTranslations } from '@/lib/i18n'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function Footer() {
  const { t } = useTranslations()
  const params = useParams()
  const lang = (params.lang as string) || 'en'

  return (
    <footer className="border-t border-border-default bg-bg-surface mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-text-tertiary">
        <p>&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
        <nav className="flex items-center gap-4" aria-label="Footer navigation">
          <Link href={`/${lang}/about`} className="hover:text-foreground transition-colors">
            {t.footer.about}
          </Link>
          <span aria-hidden>·</span>
          <Link href={`/${lang}/privacy`} className="hover:text-foreground transition-colors">
            {t.footer.privacy}
          </Link>
          <span aria-hidden>·</span>
          <Link href={`/${lang}/terms`} className="hover:text-foreground transition-colors">
            {t.footer.terms}
          </Link>
        </nav>
      </div>
    </footer>
  )
}
