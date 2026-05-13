import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'zh' ? '关于我们 - 免费在线简历生成器' : 'About Us - Free Online Resume Builder',
    description: lang === 'zh'
      ? '了解我们的免费在线简历生成器。我们致力于让每个人都能免费制作专业简历。'
      : 'Learn about our free online resume builder. We are on a mission to make professional resume creation accessible to everyone.',
    keywords: lang === 'zh'
      ? ['关于我们', '简历生成器介绍', '免费简历工具', '在线简历网站']
      : ['about us', 'resume builder about', 'free resume tool', 'online resume maker'],
    alternates: {
      languages: {
        'en': 'https://resbu.top/en/about',
        'zh': 'https://resbu.top/zh/about',
        'x-default': 'https://resbu.top/en/about',
      },
      canonical: `https://resbu.top/${lang}/about`,
    },
    openGraph: {
      title: lang === 'zh' ? '关于我们 - 免费在线简历生成器' : 'About Us - Free Online Resume Builder',
      description: lang === 'zh'
        ? '了解我们的免费在线简历生成器。我们致力于让每个人都能免费制作专业简历。'
        : 'Learn about our free online resume builder. We are on a mission to make professional resume creation accessible to everyone.',
      url: `https://resbu.top/${lang}/about`,
      siteName: 'Resume Builder - resbu.top',
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
      images: [{ url: 'https://resbu.top/og-image.png', width: 1200, height: 630, alt: 'Resume Builder' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: lang === 'zh' ? '关于我们 - 免费在线简历生成器' : 'About Us - Free Online Resume Builder',
      description: lang === 'zh'
        ? '了解我们的免费在线简历生成器。我们致力于让每个人都能免费制作专业简历。'
        : 'Learn about our free online resume builder.',
      images: ['https://resbu.top/og-image.png'],
    },
  }
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
