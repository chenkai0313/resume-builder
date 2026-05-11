import Link from 'next/link'
import { notFound } from 'next/navigation'
import { posts, categories } from '@/lib/blog-data'
import SimpleMarkdown from '@/components/SimpleMarkdown'

export function generateStaticParams() {
  return posts.flatMap((post) => [{ lang: 'en', slug: post.slug }, { lang: 'zh', slug: post.slug }])
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const t = (en: string, zh: string) => lang === 'zh' ? zh : en
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  const cat = categories.find((c) => c.id === post.category)!
  const relatedPosts = posts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3)

  const content = post.content ? (lang === 'zh' ? post.content.zh : post.content.en) : null

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid-animated opacity-50" />
        <div className="absolute top-[5%] right-0 w-[500px] h-[600px] rounded-full bg-accent-emerald/2 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent-teal/2 blur-[120px]" />
      </div>

      {/* Content */}
      <article className="relative z-10 max-w-3xl mx-auto px-4 py-12 sm:py-20">
        {/* Back link */}
        <Link
          href={`/${lang}/blog`}
          className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-accent-emerald transition-colors mb-10 group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          {t('Back to Blog', '返回博客')}
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{ color: cat.color, backgroundColor: `${cat.color}14` }}
            >
              {t(cat.name.en, cat.name.zh)}
            </span>
            <span className="w-1 h-1 rounded-full bg-border-subtle" />
            <time className="text-sm text-text-tertiary">{post.date}</time>
            <span className="w-1 h-1 rounded-full bg-border-subtle" />
            <span className="text-sm text-text-tertiary">{post.readTime} min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary leading-[1.15] tracking-tight">
            {t(post.title.en, post.title.zh)}
          </h1>
        </header>

        {/* Article body */}
        {content ? (
          <div className="mt-8">
            <SimpleMarkdown content={content} />
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-text-tertiary italic mb-3">
              {t('This article is being written. Check back soon!', '这篇文章正在撰写中，敬请期待！')}
            </p>
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center gap-2 text-sm text-accent-emerald hover:underline"
            >
              {t('Browse other articles', '浏览其他文章')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}

        {/* Divider */}
        <div className="my-16 border-t border-border-subtle" />

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
              <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                {t('Related Articles', '相关文章')}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/${lang}/blog/${rp.slug}`}
                  className="group block rounded-xl border border-border-subtle bg-bg-surface/40 backdrop-blur-sm p-5 hover:border-accent-emerald/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-emerald/5"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary mb-2 block">
                    {rp.date}
                  </span>
                  <h3 className="font-semibold text-text-primary text-sm leading-snug group-hover:text-accent-emerald transition-colors line-clamp-2">
                    {t(rp.title.en, rp.title.zh)}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
