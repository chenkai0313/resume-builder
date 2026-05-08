'use client'

import { ResumeProvider } from '@/context/ResumeContext'
import Header from './Header'
import Footer from './Footer'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ResumeProvider>
      <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ResumeProvider>
  )
}
