import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'zh' ? '服务条款 - 免费在线简历生成器' : 'Terms of Service - Free Online Resume Builder',
    description: lang === 'zh'
      ? '使用简历生成器即表示您同意我们的服务条款。了解使用规则、免责声明和责任限制。'
      : 'By using Resume Builder, you agree to our Terms of Service. Learn about usage rules, disclaimers, and limitations.',
    keywords: lang === 'zh'
      ? ['服务条款', '使用条款', '免责声明', '在线服务条款']
      : ['terms of service', 'terms of use', 'disclaimer', 'online service terms'],
    alternates: {
      languages: {
        'en': 'https://resbu.top/en/terms',
        'zh': 'https://resbu.top/zh/terms',
        'x-default': 'https://resbu.top/en/terms',
      },
      canonical: `https://resbu.top/${lang}/terms`,
    },
    openGraph: {
      title: lang === 'zh' ? '服务条款 - 免费在线简历生成器' : 'Terms of Service - Free Online Resume Builder',
      description: lang === 'zh'
        ? '使用简历生成器即表示您同意我们的服务条款。了解使用规则、免责声明和责任限制。'
        : 'By using Resume Builder, you agree to our Terms of Service. Learn about usage rules, disclaimers, and limitations.',
      url: `https://resbu.top/${lang}/terms`,
      siteName: 'Resume Builder - resbu.top',
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: lang === 'zh' ? '服务条款 - 免费在线简历生成器' : 'Terms of Service - Free Online Resume Builder',
      description: lang === 'zh'
        ? '使用简历生成器即表示您同意我们的服务条款。了解使用规则、免责声明和责任限制。'
        : 'By using Resume Builder, you agree to our Terms of Service.',
    },
  }
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}
