import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import ScriptsLoader from '@/components/ScriptsLoader'
import HtmlLangSetter from '@/components/HtmlLangSetter'

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: '免费在线简历生成器 - 专业简历模板 | resbu.top',
  description: '免费在线制作专业简历。30套模板覆盖4大分类，实时预览，PDF下载。无需注册，不限下载次数。',
  icons: { icon: '/favicon.svg' },
  keywords: ['免费简历生成器', '在线简历制作', '简历模板', '专业简历', '简历设计', 'CV模板', '求职简历'],
  alternates: {
    canonical: 'https://resbu.top',
    languages: {
      'zh': 'https://resbu.top',
      'en': 'https://resbu.top/en',
      'x-default': 'https://resbu.top',
    },
  },
  openGraph: {
    title: '免费在线简历生成器 - 专业简历模板 | resbu.top',
    description: '免费在线制作专业简历。30套模板覆盖4大分类，实时预览，PDF下载。无需注册，不限下载次数。',
    url: 'https://resbu.top',
    siteName: '简历生成器 - resbu.top',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: 'https://resbu.top/og-image.png',
        width: 1200,
        height: 630,
        alt: '免费在线简历生成器 - 专业简历模板',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '免费在线简历生成器 - 专业简历模板 | resbu.top',
    description: '免费在线制作专业简历。30套模板，实时预览，PDF下载。无需注册。',
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
    description: '免费在线简历生成器，30套模板覆盖4大分类。实时预览，PDF下载，无需注册。',
    knowsLanguage: ['zh', 'en'],
  }

  return (
    <html lang="zh" className={cn(GeistSans.className, "font-sans", geist.variable, "dark")}>
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
