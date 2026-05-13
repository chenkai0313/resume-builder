'use client'

import { ResumeProvider } from '@/context/ResumeContext'
import Header from './Header'
import Footer from './Footer'
import CookieConsent from './CookieConsent'
import { useEffect, useState } from 'react'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    setConsentGiven(consent === 'accepted')
  }, [])

  return (
    <ResumeProvider>
      <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        {consentGiven === false && (
          <div className="fixed bottom-20 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <button
              onClick={() => {
                localStorage.setItem('cookie-consent', 'accepted')
                window.location.reload()
              }}
              className="pointer-events-auto px-4 py-2 text-xs rounded-lg bg-bg-surface border border-border-default text-muted-foreground hover:text-foreground transition-colors"
            >
              Enable Cookies
            </button>
          </div>
        )}
      </div>
    </ResumeProvider>
  )
}
