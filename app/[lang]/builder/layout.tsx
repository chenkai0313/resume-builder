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
    openGraph: {
      title: lang === 'zh' ? '简历生成器 - 免费在线制作专业简历' : 'Resume Builder - Create Professional Resumes Online Free',
      description: lang === 'zh'
        ? '使用我们的免费简历生成器，在线制作专业简历。支持多种模板、实时预览、PDF下载。立即免费制作。'
        : 'Create a professional resume with our free online resume builder. Multiple templates, live preview, PDF download. Start free.',
      url: `https://resbu.top/${lang}/builder`,
      siteName: 'Resume Builder - resbu.top',
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: lang === 'zh' ? '简历生成器 - 免费在线制作专业简历' : 'Resume Builder - Create Professional Resumes Online Free',
      description: lang === 'zh'
        ? '使用我们的免费简历生成器，在线制作专业简历。支持多种模板、实时预览、PDF下载。'
        : 'Create a professional resume with our free online resume builder. Multiple templates, live preview, PDF download.',
    },
  }
}

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Free Online Resume Builder',
    alternateName: '免费在线简历生成器',
    url: 'https://resbu.top/en/builder',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Create professional resumes online for free. 20 templates, live preview, one-click PDF download. No sign-up required.',
    inLanguage: ['en', 'zh'],
    browserRequirements: 'Requires JavaScript',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
