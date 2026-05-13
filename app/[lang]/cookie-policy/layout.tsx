import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'zh' ? 'Cookie 政策 - 免费在线简历生成器' : 'Cookie Policy - Free Online Resume Builder',
    description: lang === 'zh'
      ? '了解 resbu.top 如何使用 Cookie，包括 Google AdSense 和百度统计使用的 Cookie 类型、用途及管理方法。'
      : 'Learn how resbu.top uses cookies, including types, purposes, and how to manage Google AdSense and Baidu Analytics cookies.',
    keywords: lang === 'zh'
      ? ['Cookie政策', 'Cookie说明', '隐私', '广告Cookie', '分析Cookie', 'GDPR']
      : ['cookie policy', 'GDPR', 'privacy', 'advertising cookies', 'analytics cookies', 'cookie consent'],
    alternates: {
      languages: {
        'en': 'https://resbu.top/en/cookie-policy',
        'zh': 'https://resbu.top/zh/cookie-policy',
        'x-default': 'https://resbu.top/en/cookie-policy',
      },
      canonical: `https://resbu.top/${lang}/cookie-policy`,
    },
    openGraph: {
      title: lang === 'zh' ? 'Cookie 政策 - 免费在线简历生成器' : 'Cookie Policy - Free Online Resume Builder',
      description: lang === 'zh'
        ? '了解 resbu.top 如何使用 Cookie，包括 Google AdSense 和百度统计使用的 Cookie 类型、用途及管理方法。'
        : 'Learn how resbu.top uses cookies, including types, purposes, and how to manage Google AdSense and Baidu Analytics cookies.',
      url: `https://resbu.top/${lang}/cookie-policy`,
      siteName: 'Resume Builder - resbu.top',
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
      images: [{ url: 'https://resbu.top/og-image.png', width: 1200, height: 630, alt: 'Resume Builder' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: lang === 'zh' ? 'Cookie 政策 - 免费在线简历生成器' : 'Cookie Policy - Free Online Resume Builder',
      description: lang === 'zh'
        ? '了解 resbu.top 如何使用 Cookie。'
        : 'Learn how resbu.top uses cookies.',
      images: ['https://resbu.top/og-image.png'],
    },
  }
}

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return children
}
