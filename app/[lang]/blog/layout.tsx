import type { Metadata } from 'next'
import { posts, categories } from '@/lib/blog-data'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const title = lang === 'zh' ? '博客文章 - 简历生成器 | resbu.top' : 'Blog - Resume Builder | resbu.top'
  const description = lang === 'zh'
    ? 'AI工具新闻、技术文章分享、面试题分享——提升你的开发技能和求职竞争力。'
    : 'AI tools news, tech articles, and interview preparation — sharpen your development skills and career edge.'
  return {
    title,
    description,
    keywords: lang === 'zh'
      ? 'AI工具,人工智能,技术文章,面试题,后端开发,系统设计,简历生成,求职'
      : 'AI tools, tech articles, interview questions, backend development, system design, resume builder, career',
    alternates: {
      canonical: `https://resbu.top/${lang}/blog`,
      languages: {
        'en': `https://resbu.top/en/blog`,
        'zh': `https://resbu.top/zh/blog`,
        'x-default': `https://resbu.top/en/blog`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://resbu.top/${lang}/blog`,
      siteName: 'Resume Builder - resbu.top',
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Resume Builder Blog',
    description: 'AI tools news, tech articles, and interview preparation for developers.',
    url: 'https://resbu.top/en/blog',
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title.en,
      description: post.excerpt.en,
      datePublished: post.date,
      url: `https://resbu.top/en/blog/${post.slug}`,
    })),
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
