import Link from 'next/link'
import { posts, categories } from '@/lib/blog-data'

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const t = (en: string, zh: string) => lang === 'zh' ? zh : en

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid-animated" />
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="absolute top-[10%] right-[5%] w-[350px] h-[350px] rounded-full bg-accent-emerald/2 blur-[130px]" />
        <div className="absolute bottom-[30%] left-[10%] w-[250px] h-[250px] rounded-full bg-accent-teal/2 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:py-24">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-accent-emerald/70 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            {t('Blog & Articles', '博客文章')}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary mb-4 tracking-tight">
            {t('Insights & Resources', '技术洞察与资源')}
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto leading-relaxed">
            {t(
              'Stay ahead with AI tool updates, deep-dive tech tutorials, and curated interview questions.',
              '追踪 AI 工具动态、深度技术教程和精选面试题，保持技术领先。'
            )}
          </p>
        </div>

        {/* Category sections */}
        {categories.map((cat) => {
          const catPosts = posts.filter((p) => p.category === cat.id)
          if (catPosts.length === 0) return null
          return (
            <section key={cat.id} className="mb-16">
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: cat.color, boxShadow: `0 0 8px ${cat.color}40` }}
                />
                <h2 className="text-lg font-bold text-text-primary">{t(cat.name.en, cat.name.zh)}</h2>
                <span className="text-xs text-text-tertiary">({catPosts.length})</span>
              </div>

              {/* Posts grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {catPosts.map((post, i) => (
                  <Link
                    key={post.slug}
                    href={`/${lang}/blog/${post.slug}`}
                    className="group relative rounded-2xl border border-border-subtle bg-bg-surface/40 backdrop-blur-sm p-6 hover:border-accent-emerald/20 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-emerald/5"
                    style={{ animation: `fade-in-up 0.6s ease-out ${0.1 + i * 0.08}s forwards`, opacity: 0 }}
                  >
                    {/* Category + Date row */}
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{
                          color: cat.color,
                          backgroundColor: `${cat.color}10`,
                        }}
                      >
                        {t(cat.name.en, cat.name.zh)}
                      </span>
                      <span className="text-[11px] text-text-tertiary ml-auto">
                        {post.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-text-primary mb-2 leading-snug group-hover:text-accent-emerald transition-colors">
                      {t(post.title.en, post.title.zh)}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-text-tertiary leading-relaxed mb-4 line-clamp-2 group-hover:text-text-secondary transition-colors">
                      {t(post.excerpt.en, post.excerpt.zh)}
                    </p>

                    {/* Read time */}
                    <div className="flex items-center gap-2 text-[11px] text-text-tertiary">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{post.readTime} min read</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
