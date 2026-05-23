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
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><defs><linearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%2300E676'/><stop offset='50%25' stop-color='%2300BFA5'/><stop offset='100%25' stop-color='%2369F0AE'/></linearGradient></defs><rect width='32' height='32' rx='6' fill='url(%23g)'/><rect x='7' y='8' width='18' height='2' rx='1' fill='%230D0D0D' opacity='0.9'/><rect x='7' y='13' width='14' height='2' rx='1' fill='%230D0D0D' opacity='0.7'/><rect x='7' y='18' width='16' height='2' rx='1' fill='%230D0D0D' opacity='0.7'/><rect x='7' y='23' width='10' height='2' rx='1' fill='%230D0D0D' opacity='0.5'/></svg>" />
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
