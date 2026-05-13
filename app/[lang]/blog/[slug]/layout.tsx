import type { Metadata } from 'next'
import { posts } from '@/lib/blog-data'

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return { title: 'Post Not Found' }
  const title = lang === 'zh' ? post.title.zh : post.title.en
  const description = lang === 'zh' ? post.excerpt.zh : post.excerpt.en
  return {
    title,
    description,
    keywords: lang === 'zh'
      ? '后端面试,系统设计,秒杀系统,会员系统,积分系统,余额系统,架构设计,面试题'
      : 'backend interview, system design, flash sale, membership system, points system, balance ledger, architecture design, interview questions',
    alternates: {
      canonical: `https://resbu.top/${lang}/blog/${slug}`,
      languages: {
        'en': `https://resbu.top/en/blog/${slug}`,
        'zh': `https://resbu.top/zh/blog/${slug}`,
        'x-default': `https://resbu.top/en/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://resbu.top/${lang}/blog/${slug}`,
      siteName: 'Resume Builder - resbu.top',
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      type: 'article',
      publishedTime: post.date,
      images: [{ url: 'https://resbu.top/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://resbu.top/og-image.png'],
    },
  }
}

export default async function BlogPostLayout({ params, children }: { params: Promise<{ lang: string; slug: string }>; children: React.ReactNode }) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)

  const jsonLd = post ? {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://resbu.top' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://resbu.top/en/blog' },
          { '@type': 'ListItem', position: 3, name: post.title.en, item: `https://resbu.top/en/blog/${slug}` },
        ],
      },
      {
        '@type': 'Article',
        headline: post.title.en,
        description: post.excerpt.en,
        datePublished: post.date,
        url: `https://resbu.top/en/blog/${slug}`,
        inLanguage: ['en', 'zh'],
        author: { '@type': 'Organization', name: 'resbu.top' },
        publisher: { '@type': 'Organization', name: 'resbu.top', url: 'https://resbu.top' },
      },
    ],
  } : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  )
}
