import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'zh' ? '简历生成器 - 免费在线制作专业简历' : 'Resume Builder - Create Professional Resumes Online Free',
    description: lang === 'zh'
      ? '使用我们的免费简历生成器，在线制作专业简历。支持多种模板、实时预览、PDF下载。立即免费制作。'
      : 'Create a professional resume with our free online resume builder. Multiple templates, live preview, PDF download. Start free.',
    keywords: lang === 'zh'
      ? ['简历制作', '简历编辑', '简历设计', '简历模板下载', '简历格式', '制作简历', '免费简历', '在线简历工具']
      : ['resume builder', 'build resume online', 'resume creator', 'CV maker', 'resume template', 'resume design', 'PDF resume', 'free resume builder'],
    alternates: {
      languages: {
        'en': 'https://resbu.top/en/builder',
        'zh': 'https://resbu.top/zh/builder',
        'x-default': 'https://resbu.top/en/builder',
      },
      canonical: `https://resbu.top/${lang}/builder`,
    },
  }
}

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return children
}
