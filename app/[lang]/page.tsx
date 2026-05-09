import Link from 'next/link'
import type { Metadata } from 'next'
import AnimatedCounter from '@/components/AnimatedCounter'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'zh' ? '免费在线简历生成器 - 制作专业简历 | resbu.top' : 'Free Online Resume Builder - Create Professional Resumes | resbu.top',
    description: lang === 'zh'
      ? '免费在线制作专业简历，支持20种精美模板，实时预览，一键下载PDF。无需注册，不限次数，立即开始制作你的简历。'
      : 'Create a professional resume online for free. 20 templates across 4 categories, live preview, PDF download. No sign-up required, unlimited downloads.',
    keywords: lang === 'zh'
      ? ['简历生成器', '免费简历制作', '在线简历', '简历模板', '简历下载', '求职简历', '专业简历', '简历设计']
      : ['free resume builder', 'online resume maker', 'CV builder', 'resume template', 'professional resume', 'create resume online', 'resume generator'],
    alternates: {
      languages: {
        'en': 'https://resbu.top/en',
        'zh': 'https://resbu.top/zh',
        'x-default': 'https://resbu.top/en',
      },
      canonical: `https://resbu.top/${lang}`,
    },
  }
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const t = (en: string, zh: string) => lang === 'zh' ? zh : en

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', name: 'Free Online Resume Builder', alternateName: '免费在线简历生成器', url: 'https://resbu.top', description: 'Create professional resumes online for free. Build, preview, and download your resume in minutes.', inLanguage: ['en', 'zh'] },
      { '@type': 'WebApplication', name: 'Free Online Resume Builder', url: `https://resbu.top/${lang}/builder`, applicationCategory: 'BusinessApplication', operatingSystem: 'All', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
    ],
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ---- Background Layers ---- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid-animated" />
        <div className="absolute inset-0 bg-radial-glow" />
        {/* Floating orbs */}
        <div className="absolute top-[15%] left-[10%] w-[400px] h-[400px] rounded-full bg-accent-emerald/3 blur-[120px] animate-float-slow" />
        <div className="absolute top-[50%] right-[5%] w-[300px] h-[300px] rounded-full bg-accent-teal/3 blur-[100px] animate-float-reverse" />
        <div className="absolute bottom-[20%] left-[30%] w-[350px] h-[350px] rounded-full bg-accent-mint/2 blur-[130px] animate-float-slow" />
      </div>

      {/* ---- HERO ---- */}
      <section className="relative z-10 pt-24 pb-16 sm:pt-36 sm:pb-24">
        {/* Geometric accents */}
        <div className="absolute top-20 left-[15%] w-8 h-8 border border-accent-emerald/10 rounded-sm rotate-45 animate-float opacity-0 animate-fade-in animate-delay-500" style={{ animationFillMode: 'forwards' }} />
        <div className="absolute top-40 right-[20%] w-5 h-5 border border-accent-teal/15 rounded-full animate-float-reverse opacity-0 animate-fade-in animate-delay-700" style={{ animationFillMode: 'forwards' }} />
        <div className="absolute bottom-20 left-[25%] w-3 h-3 bg-accent-emerald/20 rounded-sm rotate-12 animate-float-slow opacity-0 animate-fade-in animate-delay-900" style={{ animationFillMode: 'forwards' }} />

        <div className="max-w-5xl mx-auto px-4 text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-accent-emerald/15 bg-accent-emerald/[0.03] backdrop-blur-sm mb-10 opacity-0 animate-scale-in" style={{ animationFillMode: 'forwards' }}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald/40" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-emerald" />
            </span>
            <span className="text-accent-emerald/80 text-sm font-medium tracking-wide">
              {t('Free · No Sign-up · Unlimited Downloads', '完全免费 · 无需注册 · 不限次数')}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-[1.05] mb-8 tracking-tight opacity-0 animate-scale-in animate-delay-100" style={{ animationFillMode: 'forwards' }}>
            <span className="bg-gradient-to-r from-accent-emerald via-accent-mint to-accent-teal bg-clip-text text-transparent animate-gradient inline-block">
              {t('Build a Resume', '打造一份')}
            </span>
            <br />
            <span className="text-text-primary">
              {t('That Gets Noticed', '令人瞩目的简历')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-6 opacity-0 animate-fade-in-up animate-delay-300" style={{ animationFillMode: 'forwards' }}>
            {t(
              '20 professional templates across 4 categories. Live preview, one-click PDF download. Built for the modern job seeker.',
              '4 大分类 · 20 款专业模板。实时预览，一键生成 PDF。为现代求职者打造。'
            )}
          </p>
          <p className="text-sm text-text-tertiary max-w-xl mx-auto leading-relaxed mb-12 opacity-0 animate-fade-in-up animate-delay-400" style={{ animationFillMode: 'forwards' }}>
            {t(
              'Whether you are a fresh graduate or a C-level executive, our resume builder adapts to your industry — tech, finance, creative, and more — with category-specific templates and data fields.',
              '无论你是应届毕业生还是企业高管，我们的简历生成器都能根据不同行业适配模板——技术、金融、创意等——提供分类专属模板和表单字段。'
            )}
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap opacity-0 animate-fade-in-up animate-delay-500" style={{ animationFillMode: 'forwards' }}>
            <Link
              href={`/${lang}/builder`}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-accent-emerald to-accent-teal text-[#0D0D0D] px-8 py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-accent-emerald/25 hover:shadow-accent-emerald/40 hover:scale-[1.03] active:scale-[0.98]"
            >
              {t('Start Building Free', '免费开始制作')}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center gap-2 text-text-secondary border border-border-default hover:border-accent-emerald/30 px-6 py-4 rounded-2xl font-medium transition-all hover:text-text-primary hover:bg-bg-surface"
            >
              {t('Explore Features', '了解更多')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ---- STATS STRIP ---- */}
      <section className="relative z-10 border-y border-border-subtle bg-bg-surface/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { end: 20, suffix: '+', label: t('Resume Templates', '简历模板') },
              { end: 4, suffix: '', label: t('Categories', '行业分类') },
              { end: 2, suffix: '', label: t('Languages', '语言支持') },
              { end: 100, suffix: '%', label: t('Free Forever', '永久免费') },
            ].map((stat) => (
              <div key={stat.label} className="group">
                <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-br from-accent-emerald to-accent-mint bg-clip-text text-transparent mb-1.5">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <p className="text-xs sm:text-sm text-text-tertiary group-hover:text-text-secondary transition-colors">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- TEMPLATE CATEGORIES ---- */}
      <section className="relative z-10 py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-accent-emerald/70 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              {t('Template Categories', '模板分类')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              {t('Find Your Perfect Match', '找到最适合你的模板')}
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              {t(
                'Four curated categories — from ATS-friendly general templates to creative portfolios. Each category unlocks unique form fields tailored to your industry.',
                '四大精心分类——从 ATS 友好的通用模板到创意作品集。每个分类解锁专属表单字段，精准匹配你的行业需求。'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { color: 'emerald', title: t('General', '通用模板'), count: '8', desc: t('ATS-optimized, minimalist, two-column & more for any profession', 'ATS优化、极简、双栏等适配各类职业') },
              { color: 'teal', title: t('Technical', '技术岗位'), count: '5', desc: t('Web3, AI/ML, DevOps, Data Science & remote worker templates', 'Web3、AI/ML、DevOps、数据科学等专属模板') },
              { color: 'mint', title: t('Executive', '管理高管'), count: '3', desc: t('Leadership-focused layouts with KPI metrics and strategy sections', '聚焦领导力，含KPI指标与战略板块的简历布局') },
              { color: 'emerald', title: t('Creative', '创意营销'), count: '4', desc: t('Portfolio-style designs for designers, freelancers, and marketers', '为设计师、自由职业者打造的创意作品集风格') },
            ].map((cat, i) => (
              <Link
                key={cat.title}
                href={`/${lang}/builder`}
                className="group relative rounded-2xl border border-border-subtle bg-bg-surface/50 backdrop-blur-sm p-6 hover:border-accent-emerald/25 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-emerald/5 shimmer"
                style={{ animation: `fade-in-up 0.6s ease-out ${0.15 + i * 0.1}s forwards`, opacity: 0 }}
              >
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color === 'emerald' ? 'from-accent-emerald/20 to-accent-emerald/5' : cat.color === 'teal' ? 'from-accent-teal/20 to-accent-teal/5' : 'from-accent-mint/20 to-accent-mint/5'} flex items-center justify-center text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br ${cat.color === 'emerald' ? 'from-accent-emerald to-accent-mint' : cat.color === 'teal' ? 'from-accent-teal to-accent-mint' : 'from-accent-mint to-accent-emerald'} mb-5`}>
                    {cat.count}
                  </div>
                  <h3 className="font-bold text-text-primary text-lg mb-2">{cat.title}</h3>
                  <p className="text-sm text-text-tertiary leading-relaxed group-hover:text-text-secondary transition-colors">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FEATURES ---- */}
      <section id="features" className="relative z-10 border-t border-border-subtle py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-accent-emerald/70 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              {t('Features', '功能亮点')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              {t('Everything You Need', '你需要的全都有')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { p: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z', t: t('20 Premium Templates', '20 款精美模板'), d: t('From ATS-optimized to creative portfolios across 4 categories — pick what fits your industry best.', '从 ATS 优化到创意作品集，覆盖 4 大分类——挑最适合你行业的模板。') },
              { p: 'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', t: t('Real-Time Preview', '实时预览'), d: t('See every change instantly as you type. Switch templates and languages without losing any data.', '编辑时实时看到效果。随时切换模板和语言，数据不丢失。') },
              { p: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', t: t('One-Click PDF', '一键导出 PDF'), d: t('Download a print-ready, beautifully formatted PDF with a single click. No watermarks, no limits.', '一键下载排版精美的 PDF 简历。无水印，不限次数。') },
              { p: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9', t: t('Bilingual Support', '中英双语'), d: t('Create resumes in English and Chinese. Switch languages with one click. All templates fully bilingual.', '中英文简历一键切换。所有模板完全双语，轻松应对国内外求职。') },
              { p: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01', t: t('Rich Text Editing', '富文本编辑'), d: t('Bold and italic formatting for descriptions and summaries. Highlight what matters most.', '描述区域支持加粗和斜体格式。让关键成就更加突出。') },
              { p: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', t: t('100% Private', '数据隐私安全'), d: t('Everything stays in your browser. No account, no server upload. Your data is yours alone.', '所有数据保存在本地浏览器。无需注册账号，不上传服务器。数据完全属于你。') },
            ].map((item, i) => (
              <div
                key={item.t}
                className="group relative rounded-2xl border border-border-subtle bg-bg-surface/40 backdrop-blur-sm p-6 hover:border-accent-emerald/20 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-emerald/5"
                style={{ animation: `fade-in-up 0.6s ease-out ${0.1 + i * 0.08}s forwards`, opacity: 0 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-emerald/10 to-accent-teal/5 flex items-center justify-center text-accent-emerald mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.p} /></svg>
                </div>
                <h3 className="font-semibold text-text-primary mb-2">{item.t}</h3>
                <p className="text-sm text-text-tertiary leading-relaxed group-hover:text-text-secondary transition-colors">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- HOW IT WORKS ---- */}
      <section className="relative z-10 border-t border-border-subtle py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-accent-emerald/70 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              {t('How It Works', '使用流程')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              {t('Three Steps to Your Resume', '三步生成你的简历')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-gradient-to-r from-accent-emerald/5 via-accent-emerald/20 to-accent-emerald/5" />

            {[
              { step: '01', p: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: t('Fill Your Info', '填写信息'), desc: t('Enter your details, experience, education, and skills. Category-specific fields adapt to your industry.', '填写个人信息、工作经历、教育背景和技能。分类专属字段自动适配你的行业。') },
              { step: '02', p: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01', title: t('Pick a Template', '选择模板'), desc: t('Browse 20 templates across 4 categories. Preview in real-time and switch freely until you find the one.', '浏览 4 大分类 20 款模板，实时预览，自由切换。') },
              { step: '03', p: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4', title: t('Download PDF', '下载 PDF'), desc: t('One click exports a print-ready PDF. No watermarks, no sign-up, no limits. Just a beautiful resume.', '一键导出打印就绪的 PDF。无水印、无需注册、不限次数。') },
            ].map((item, i) => (
              <div key={item.step} className="text-center relative" style={{ animation: `fade-in-up 0.6s ease-out ${0.2 + i * 0.15}s forwards`, opacity: 0 }}>
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent-emerald/10 to-accent-teal/5 border border-accent-emerald/10 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <svg className="w-6 h-6 text-accent-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.p} /></svg>
                </div>
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-emerald to-accent-teal flex items-center justify-center text-[#0D0D0D] font-extrabold text-sm mx-auto -mt-12 mb-4 relative z-10 ring-4 ring-[#0D0D0D]">
                  {item.step}
                </div>
                <h3 className="font-bold text-text-primary text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-text-tertiary leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- MARQUEE ---- */}
      <section className="relative z-10 border-y border-border-subtle bg-bg-surface/20 overflow-hidden py-6">
        <div className="flex whitespace-nowrap animate-[marquee_40s_linear_infinite]">
          {[...Array(2)].map((_, n) => (
            <div key={n} className="flex items-center gap-12 shrink-0">
              {[
                'Minimalist', 'ATS-Optimized', 'Web3/Blockchain', 'AI/ML Engineer',
                'Executive Leadership', 'Creative Designer', 'Freelancer Portfolio',
                'DevOps Engineer', 'Product Manager', 'Data Scientist',
              ].map((name) => (
                <div key={name} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-emerald/40" />
                  <span className="text-sm text-text-tertiary font-medium tracking-wide">{name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ---- BOTTOM CTA ---- */}
      <section className="relative z-10 py-24 sm:py-32 overflow-hidden">
        {/* Gradient background behind CTA */}
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-emerald/3 blur-[150px] animate-pulse-glow" />

        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <div className="rounded-3xl border border-accent-emerald/10 bg-bg-surface/40 backdrop-blur-sm p-12 sm:p-16 animate-border-glow">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              {t('Ready to Build Your Resume?', '准备好制作你的简历了吗？')}
            </h2>
            <p className="text-text-secondary mb-10 max-w-lg mx-auto leading-relaxed">
              {t(
                'Free forever. No registration. No watermarks. Just professional resumes, instantly.',
                '永久免费。无需注册。无水印。即刻生成专业简历。'
              )}
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href={`/${lang}/builder`}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-accent-emerald to-accent-teal text-[#0D0D0D] px-10 py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-accent-emerald/25 hover:shadow-accent-emerald/40 hover:scale-[1.03] active:scale-[0.98]"
              >
                {t('Create Your Resume', '免费制作简历')}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
