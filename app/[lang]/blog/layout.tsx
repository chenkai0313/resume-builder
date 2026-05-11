import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'zh' ? '博客文章 - 简历生成器 | resbu.top' : 'Blog - Resume Builder | resbu.top',
    description: lang === 'zh'
      ? 'AI工具新闻、技术文章分享、面试题分享——提升你的开发技能和求职竞争力。'
      : 'AI tools news, tech articles, and interview preparation — sharpen your development skills and career edge.',
    alternates: {
      canonical: `https://resbu.top/${lang}/blog`,
      languages: {
        'en': `https://resbu.top/en/blog`,
        'zh': `https://resbu.top/zh/blog`,
        'x-default': `https://resbu.top/en/blog`,
      },
    },
  }
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
