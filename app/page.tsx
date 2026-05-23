import type { Metadata } from 'next'
import HomePageContent from '@/components/HomePageContent'

export const metadata: Metadata = {
  title: 'Free Online Resume Builder - Create Professional Resumes | resbu.top',
  description: 'Create a professional resume online for free. 20 templates across 4 categories, live preview, PDF download. No sign-up required, unlimited downloads.',
  keywords: ['free resume builder', 'online resume maker', 'CV builder', 'resume template', 'professional resume', 'create resume online', 'resume generator'],
  alternates: {
    languages: {
      'en': 'https://resbu.top',
      'zh': 'https://resbu.top/zh',
      'x-default': 'https://resbu.top',
    },
    canonical: 'https://resbu.top',
  },
  openGraph: {
    title: 'Free Online Resume Builder - Create Professional Resumes | resbu.top',
    description: 'Create a professional resume online for free. 20 templates across 4 categories, live preview, PDF download. No sign-up required, unlimited downloads.',
    url: 'https://resbu.top',
    siteName: 'Resume Builder - resbu.top',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://resbu.top/og-image.png', width: 1200, height: 630, alt: 'Free Online Resume Builder' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Resume Builder - Create Professional Resumes | resbu.top',
    description: 'Create a professional resume online for free. 20 templates, live preview, PDF download. No sign-up required.',
    images: ['https://resbu.top/og-image.png'],
  },
}

export default function HomePage() {
  return <HomePageContent lang="en" />
}
