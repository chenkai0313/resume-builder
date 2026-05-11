import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'zh' ? '隐私政策 - 免费在线简历生成器' : 'Privacy Policy - Free Online Resume Builder',
    description: lang === 'zh'
      ? '了解我们如何保护您的隐私和个人数据。我们不会收集或存储任何个人信息。'
      : 'Learn how we protect your privacy and personal data. We do not collect or store any personal information.',
    keywords: lang === 'zh'
      ? ['隐私政策', '隐私保护', '数据安全', '个人信息保护', '隐私声明', '简历网站隐私']
      : ['privacy policy', 'resume builder privacy', 'data privacy', 'cookie policy', 'privacy notice'],
    alternates: {
      languages: {
        'en': 'https://resbu.top/en/privacy',
        'zh': 'https://resbu.top/zh/privacy',
        'x-default': 'https://resbu.top/en/privacy',
      },
      canonical: `https://resbu.top/${lang}/privacy`,
    },
    openGraph: {
      title: lang === 'zh' ? '隐私政策 - 免费在线简历生成器' : 'Privacy Policy - Free Online Resume Builder',
      description: lang === 'zh'
        ? '了解我们如何保护您的隐私和个人数据。我们不会收集或存储任何个人信息。'
        : 'Learn how we protect your privacy and personal data. We do not collect or store any personal information.',
      url: `https://resbu.top/${lang}/privacy`,
      siteName: 'Resume Builder - resbu.top',
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: lang === 'zh' ? '隐私政策 - 免费在线简历生成器' : 'Privacy Policy - Free Online Resume Builder',
      description: lang === 'zh'
        ? '了解我们如何保护您的隐私和个人数据。我们不会收集或存储任何个人信息。'
        : 'Learn how we protect your privacy and personal data.',
    },
  }
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
