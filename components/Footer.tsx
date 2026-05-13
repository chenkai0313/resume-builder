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
          <Link href={`/${lang}/contact`} className="hover:text-foreground transition-colors">
            {t.footer.contact}
          </Link>
          <span aria-hidden>·</span>
          <Link href={`/${lang}/privacy`} className="hover:text-foreground transition-colors">
            {t.footer.privacy}
          </Link>
          <span aria-hidden>·</span>
          <Link href={`/${lang}/terms`} className="hover:text-foreground transition-colors">
            {t.footer.terms}
          </Link>
          <span aria-hidden>·</span>
          <Link href={`/${lang}/cookie-policy`} className="hover:text-foreground transition-colors">
            {t.footer.cookies}
          </Link>
          <span aria-hidden>·</span>
          <a href="https://schg.xyz/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            {t.footer.friendLink}
          </a>
        </nav>
      </div>
      <div className="border-t border-border-default/50">
        <div className="max-w-6xl mx-auto px-4 py-2 text-center text-xs text-text-tertiary/70">
          {t.footer.contactText} <a href="mailto:ckck0313@gmail.com" className="text-accent-emerald hover:underline">ckck0313@gmail.com</a>
        </div>
      </div>
    </footer>
  )
}
