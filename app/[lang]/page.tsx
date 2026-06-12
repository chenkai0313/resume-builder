import type { Metadata } from 'next'
import HomePageContent from '@/components/HomePageContent'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: '免费在线简历生成器 - 专业简历模板 | Free Online Resume Builder | resbu.top',
    description: '免费在线制作专业简历，30套模板覆盖4大分类。实时预览，一键下载PDF。无需注册，不限次数。Create professional resumes online for free. 30 templates, live preview, PDF download, no sign-up required.',
    keywords: ['免费简历生成器', '在线简历制作', '简历模板', '专业简历', '简历设计', 'CV模板', '求职简历', 'free resume builder', 'online resume maker', 'CV builder', 'resume template', 'professional resume', 'create resume online', 'resume generator'],
    alternates: {
      languages: {
        'zh': 'https://resbu.top',
        'en': 'https://resbu.top/en',
        'x-default': 'https://resbu.top',
      },
      canonical: `https://resbu.top/${lang === 'en' ? 'en' : ''}`,
    },
    openGraph: {
      title: '免费在线简历生成器 - 专业简历模板 | Free Online Resume Builder | resbu.top',
      description: '免费在线制作专业简历，30套模板覆盖4大分类。实时预览，一键下载PDF。无需注册，不限次数。Create professional resumes online for free. 30 templates, live preview, PDF download, no sign-up required.',
      url: lang === 'en' ? 'https://resbu.top/en' : 'https://resbu.top',
      siteName: 'resbu.top - 简历生成器 | Resume Builder',
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
      images: [{ url: 'https://resbu.top/og-image.png', width: 1200, height: 630, alt: '免费在线简历生成器 - Free Online Resume Builder' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: '免费在线简历生成器 - 专业简历模板 | Free Online Resume Builder | resbu.top',
      description: '免费在线制作专业简历，30套模板，实时预览，PDF下载。无需注册。Create professional resumes online for free. 30 templates, live preview, PDF download.',
      images: ['https://resbu.top/og-image.png'],
    },
  }
}

export default async function LangHomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return <HomePageContent lang={lang} />
}
