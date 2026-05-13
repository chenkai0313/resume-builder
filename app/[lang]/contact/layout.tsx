import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'zh' ? '联系我们 - 免费在线简历生成器' : 'Contact Us - Free Online Resume Builder',
    description: lang === 'zh'
      ? '对简历生成器有问题、反馈或建议？通过邮件联系我们，我们通常在 24-48 小时内回复。'
      : 'Have questions, feedback, or suggestions about our resume builder? Contact us via email. We typically respond within 24-48 hours.',
    keywords: lang === 'zh'
      ? ['联系我们', '反馈', '支持', '简历生成器', '联系邮箱']
      : ['contact us', 'feedback', 'support', 'resume builder', 'contact email'],
    alternates: {
      languages: {
        'en': 'https://resbu.top/en/contact',
        'zh': 'https://resbu.top/zh/contact',
        'x-default': 'https://resbu.top/en/contact',
      },
      canonical: `https://resbu.top/${lang}/contact`,
    },
    openGraph: {
      title: lang === 'zh' ? '联系我们 - 免费在线简历生成器' : 'Contact Us - Free Online Resume Builder',
      description: lang === 'zh'
        ? '对简历生成器有问题、反馈或建议？通过邮件联系我们。'
        : 'Have questions, feedback, or suggestions? Contact us.',
      url: `https://resbu.top/${lang}/contact`,
      siteName: 'Resume Builder - resbu.top',
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
      images: [{ url: 'https://resbu.top/og-image.png', width: 1200, height: 630, alt: 'Resume Builder' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: lang === 'zh' ? '联系我们 - 免费在线简历生成器' : 'Contact Us - Free Online Resume Builder',
      description: lang === 'zh'
        ? '对简历生成器有问题、反馈或建议？通过邮件联系我们。'
        : 'Have questions, feedback, or suggestions? Contact us.',
      images: ['https://resbu.top/og-image.png'],
    },
  }
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
