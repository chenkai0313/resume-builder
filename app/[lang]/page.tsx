import type { Metadata } from 'next'
import HomePageContent from '@/components/HomePageContent'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'zh' ? '免费在线简历生成器 - 制作专业简历 | resbu.top' : 'Free Online Resume Builder - Create Professional Resumes | resbu.top',
    description: lang === 'zh'
      ? '免费在线制作专业简历，支持20种精美模板，实时预览，一键下载PDF。无需注册，不限次数，立即开始制作你的简历。'
      : 'Create a professional resume online for free. 20 templates across 4 categories, live preview, PDF download. No sign-up required, unlimited downloads.',
    keywords: lang === 'zh'
      ? ['简历生成器', '免费简历制作', '在线简历', '简历模板', '简历下载', '求职简历', '专业简历', '简历设计']
      : ['free resume builder', 'online resume maker', 'CV builder', 'resume template', 'professional resume', 'create resume online', 'resume generator'],
    alternates: {
      languages: {
        'en': 'https://resbu.top',
        'zh': 'https://resbu.top/zh',
        'x-default': 'https://resbu.top',
      },
      canonical: lang === 'en' ? 'https://resbu.top' : `https://resbu.top/${lang}`,
    },
    openGraph: {
      title: lang === 'zh' ? '免费在线简历生成器 - 制作专业简历 | resbu.top' : 'Free Online Resume Builder - Create Professional Resumes | resbu.top',
      description: lang === 'zh'
        ? '免费在线制作专业简历，支持20种精美模板，实时预览，一键下载PDF。无需注册，不限次数，立即开始制作你的简历。'
        : 'Create a professional resume online for free. 20 templates across 4 categories, live preview, PDF download. No sign-up required, unlimited downloads.',
      url: lang === 'en' ? 'https://resbu.top' : `https://resbu.top/${lang}`,
      siteName: 'Resume Builder - resbu.top',
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
      images: [{ url: 'https://resbu.top/og-image.png', width: 1200, height: 630, alt: 'Free Online Resume Builder' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: lang === 'zh' ? '免费在线简历生成器 - 制作专业简历 | resbu.top' : 'Free Online Resume Builder - Create Professional Resumes | resbu.top',
      description: lang === 'zh'
        ? '免费在线制作专业简历，支持20种精美模板，实时预览，一键下载PDF。无需注册，不限次数。'
        : 'Create a professional resume online for free. 20 templates, live preview, PDF download. No sign-up required.',
      images: ['https://resbu.top/og-image.png'],
    },
  }
}

export default async function LangHomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return <HomePageContent lang={lang} />
}
