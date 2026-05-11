import type { Metadata } from 'next'
import { posts } from '@/lib/blog-data'

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: lang === 'zh' ? post.title.zh : post.title.en,
    description: lang === 'zh' ? post.excerpt.zh : post.excerpt.en,
    alternates: {
      canonical: `https://resbu.top/${lang}/blog/${slug}`,
      languages: {
        'en': `https://resbu.top/en/blog/${slug}`,
        'zh': `https://resbu.top/zh/blog/${slug}`,
        'x-default': `https://resbu.top/en/blog/${slug}`,
      },
    },
  }
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return children
}
