import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'zh' ? '免费在线简历生成器 - 制作专业简历 | resbu.top' : 'Free Online Resume Builder - Create Professional Resumes | resbu.top',
    description: lang === 'zh'
      ? '免费在线制作专业简历，支持10种精美模板，实时预览，一键下载PDF。无需注册，不限次数，立即开始制作你的简历。'
      : 'Create a professional resume online for free. 10 templates, live preview, PDF download. No sign-up required, unlimited downloads.',
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'Free Online Resume Builder',
        alternateName: '免费在线简历生成器',
        url: 'https://resbu.top',
        description: 'Create professional resumes online for free. Build, preview, and download your resume in minutes.',
        inLanguage: ['en', 'zh'],
      },
      {
        '@type': 'WebApplication',
        name: 'Free Online Resume Builder',
        url: `https://resbu.top/${lang}/builder`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
    ],
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,230,118,0.12),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(0,191,165,0.08),transparent_50%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 pt-28 pb-20 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-emerald/20 bg-accent-emerald/5 text-accent-emerald text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
            {lang === 'zh' ? '完全免费 · 无需注册' : 'Free · No Sign-up Required'}
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-accent-emerald via-accent-teal to-accent-mint bg-clip-text text-transparent">
              {lang === 'zh' ? '在线简历生成器' : 'Resume Builder'}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            {lang === 'zh'
              ? '填写信息，选择风格，一键生成专业简历。支持 PDF 下载，完全免费。'
              : 'Fill in your info, pick a style, and generate a professional resume instantly. Free PDF download.'}
          </p>
          <p className="text-sm text-muted-foreground/70 max-w-xl mx-auto mb-10 leading-relaxed">
            {lang === 'zh'
              ? '无论你是应届毕业生还是资深职场人士，我们的在线简历工具都能帮你快速创建一份令人印象深刻的简历。无需下载软件，无需注册账号，打开浏览器即可使用。'
              : 'Whether you are a fresh graduate or a seasoned professional, our online resume tool helps you create an impressive resume quickly. No downloads, no sign-ups, just your browser.'}
          </p>
          <Link
            href={`/${lang}/builder`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-emerald to-accent-teal text-white px-10 py-4 rounded-xl font-medium hover:opacity-90 transition-all text-lg shadow-lg shadow-accent-emerald/20 hover:shadow-accent-emerald/30 hover:scale-[1.02]"
          >
            {lang === 'zh' ? '开始制作' : 'Build Your Resume'}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            {lang === 'zh' ? '为什么选择我们？' : 'Why Choose Us?'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {lang === 'zh'
              ? '我们提供一切你需要的工具，让你的简历在求职中脱颖而出'
              : 'Everything you need to make your resume stand out in your job search'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: lang === 'zh' ? '多种专业模板' : '10 Templates',
              desc: lang === 'zh' ? '从现代、经典、简约等 10 种模板中选择，适配各种求职场景' : 'Choose from 10 professional templates for any job scenario',
            },
            {
              title: lang === 'zh' ? '实时预览' : 'Live Preview',
              desc: lang === 'zh' ? '编辑时实时查看简历效果，随时切换风格，所见即所得' : 'See changes instantly as you type, switch styles freely',
            },
            {
              title: lang === 'zh' ? 'PDF 导出' : 'PDF Export',
              desc: lang === 'zh' ? '一键下载高质量 PDF，排版精美，可直接用于求职' : 'Download high-quality PDF with one click, ready to submit',
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="group relative rounded-xl border bg-card p-6 hover:border-accent-emerald/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent-emerald/5"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-emerald/5 to-accent-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-emerald to-accent-teal flex items-center justify-center text-white text-sm font-bold mb-4">
                  0{i + 1}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border">
        <div className="max-w-5xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              {lang === 'zh' ? '如何使用' : 'How It Works'}
            </h2>
            <p className="text-muted-foreground">
              {lang === 'zh' ? '三步生成你的专业简历' : 'Create your resume in three simple steps'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: lang === 'zh' ? '填写信息' : 'Fill in Info',
                desc: lang === 'zh'
                  ? '在表单中填写你的个人信息、工作经历、教育背景、技能等。支持富文本编辑，可加粗、斜体强调重点。'
                  : 'Fill in your personal info, work experience, education, and skills. Rich text supported — bold and italic to highlight key points.',
              },
              {
                step: '02',
                title: lang === 'zh' ? '选择风格' : 'Pick a Style',
                desc: lang === 'zh'
                  ? '从 10 种精心设计的简历模板中挑选你喜欢的风格，实时预览效果，随时切换。'
                  : 'Choose from 10 carefully designed resume templates. Preview in real-time and switch freely.',
              },
              {
                step: '03',
                title: lang === 'zh' ? '下载 PDF' : 'Download PDF',
                desc: lang === 'zh'
                  ? '一键导出高质量 PDF 简历，排版精美，可直接投递。完全免费，不限次数。'
                  : 'Export to high-quality PDF with one click. Beautifully formatted, ready to submit. Completely free.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-emerald to-accent-teal flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t border-border">
        <div className="max-w-5xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              {lang === 'zh' ? '更多功能' : 'More Features'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: lang === 'zh' ? '双语支持' : 'Bilingual Support',
                desc: lang === 'zh' ? '支持中文和英文简历制作，一键切换语言，轻松应对国内外求职' : 'Create resumes in Chinese or English, switch languages with one click',
              },
              {
                title: lang === 'zh' ? '富文本编辑' : 'Rich Text Editing',
                desc: lang === 'zh' ? '描述区域支持加粗、斜体等格式，让重点更加突出' : 'Bold and italic formatting for descriptions to highlight key achievements',
              },
              {
                title: lang === 'zh' ? '标签式输入' : 'Tag-style Input',
                desc: lang === 'zh' ? '技能、技术栈等采用标签输入，按回车添加，简洁高效' : 'Skills and tech stack use tag input — press Enter to add, clean and efficient',
              },
              {
                title: lang === 'zh' ? '完全免费' : '100% Free',
                desc: lang === 'zh' ? '无需注册，不限下载次数，所有功能完全免费使用' : 'No registration, unlimited downloads, all features completely free',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border bg-card p-5 hover:border-accent-emerald/20 transition-colors">
                <h3 className="font-semibold text-foreground mb-1.5">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            {lang === 'zh' ? '准备好了吗？' : 'Ready to get started?'}
          </h2>
          <p className="text-muted-foreground mb-8">
            {lang === 'zh'
              ? '无需注册，完全免费，立即开始制作你的简历'
              : 'No sign-up needed, completely free. Start building your resume now.'}
          </p>
          <Link
            href={`/${lang}/builder`}
            className="inline-flex items-center gap-2 text-foreground border border-border px-6 py-3 rounded-lg hover:bg-muted transition-colors font-medium"
          >
            {lang === 'zh' ? '免费制作简历' : 'Create Your Resume'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
