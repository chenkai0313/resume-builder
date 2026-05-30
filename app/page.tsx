import type { Metadata } from 'next'
import HomePageContent from '@/components/HomePageContent'

export const metadata: Metadata = {
  title: '免费在线简历生成器 - 专业简历模板 | resbu.top',
  description: '免费在线制作专业简历。30套模板覆盖4大分类，实时预览，PDF下载。无需注册，不限下载次数。',
  keywords: ['免费简历生成器', '在线简历制作', '简历模板', '专业简历', '简历设计', 'CV模板', '求职简历'],
  alternates: {
    languages: {
      'zh': 'https://resbu.top',
      'en': 'https://resbu.top/en',
      'x-default': 'https://resbu.top',
    },
    canonical: 'https://resbu.top',
  },
  openGraph: {
    title: '免费在线简历生成器 - 专业简历模板 | resbu.top',
    description: '免费在线制作专业简历。30套模板覆盖4大分类，实时预览，PDF下载。无需注册，不限下载次数。',
    url: 'https://resbu.top',
    siteName: '简历生成器 - resbu.top',
    locale: 'zh_CN',
    type: 'website',
    images: [{ url: 'https://resbu.top/og-image.png', width: 1200, height: 630, alt: '免费在线简历生成器 - 专业简历模板' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '免费在线简历生成器 - 专业简历模板 | resbu.top',
    description: '免费在线制作专业简历。30套模板，实时预览，PDF下载。无需注册。',
    images: ['https://resbu.top/og-image.png'],
  },
}

export default function HomePage() {
  return <HomePageContent lang="zh" />
}
