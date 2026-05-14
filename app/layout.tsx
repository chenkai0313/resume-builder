import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import ScriptsLoader from '@/components/ScriptsLoader'
import HtmlLangSetter from '@/components/HtmlLangSetter'

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'Free Online Resume Builder',
  description: 'Create professional resumes online for free. Build, preview, and download your resume in minutes.',
  icons: { icon: '/favicon.svg' },
  keywords: ['free resume builder', 'online resume maker', 'CV builder', 'resume template', 'professional resume', 'resume generator', 'create resume online'],
  alternates: {
    canonical: 'https://resbu.top',
    languages: {
      'en': 'https://resbu.top',
      'zh': 'https://resbu.top/zh',
      'x-default': 'https://resbu.top',
    },
  },
  openGraph: {
    title: 'Free Online Resume Builder',
    description: 'Create professional resumes online for free. Build, preview, and download your resume in minutes.',
    url: 'https://resbu.top',
    siteName: 'Resume Builder - resbu.top',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://resbu.top/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Free Online Resume Builder - Create Professional Resumes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Resume Builder',
    description: 'Create professional resumes online for free. Build, preview, and download your resume in minutes.',
    images: ['https://resbu.top/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'resbu.top',
    alternateName: 'Resume Builder',
    url: 'https://resbu.top',
    description: 'Free online resume builder with 20 templates across 4 categories. Live preview, PDF download, no sign-up required.',
    knowsLanguage: ['en', 'zh'],
  }

  return (
    <html lang="en" className={cn(GeistSans.className, "font-sans", geist.variable, "dark")}>
      <head>
        <meta name="baidu-site-verification" content="codeva-3qvzh3aZYo" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>
        <HtmlLangSetter />
        {children}
        <ScriptsLoader />
      </body>
    </html>
  )
}
