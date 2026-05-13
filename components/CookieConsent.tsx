'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShow(true)
    }
  }, [])

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted')
    setShow(false)
    // Reload to activate AdSense and analytics scripts
    window.location.reload()
  }

  function decline() {
    localStorage.setItem('cookie-consent', 'declined')
    setShow(false)
    window.location.reload()
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
      <div className="max-w-4xl mx-auto rounded-2xl border border-accent-emerald/20 bg-bg-surface/95 backdrop-blur-xl shadow-2xl shadow-black/30 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 text-sm text-text-secondary leading-relaxed">
            <p className="mb-1">
              <span className="font-semibold text-text-primary">We use cookies</span> for Google AdSense ads and Baidu Analytics.
              By clicking &ldquo;Accept,&rdquo; you agree to our use of cookies.
              See our{' '}
              <Link href="/en/cookie-policy" className="text-accent-emerald hover:underline font-medium">
                Cookie Policy
              </Link>{' '}
              for details.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={decline}
              className="px-4 py-2 text-sm rounded-lg border border-border-default text-muted-foreground hover:text-foreground hover:border-border-subtle transition-colors"
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="px-5 py-2 text-sm rounded-lg bg-gradient-to-r from-accent-emerald to-accent-teal text-[#0D0D0D] font-semibold hover:opacity-90 transition-all shadow-md shadow-accent-emerald/20"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
