import { getDictionary } from '@/lib/dictionary.server'

export default async function CookiePolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = getDictionary(lang)
  const t = (en: string, zh: string) => lang === 'zh' ? zh : en

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">{dict.cookiePolicy.title}</h1>
      <p className="text-sm text-muted-foreground mb-10">{dict.cookiePolicy.lastUpdated}</p>

      <div className="space-y-8">
        <section>
          <p className="text-muted-foreground leading-relaxed">{dict.cookiePolicy.intro}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">{dict.cookiePolicy.whatAreCookies.title}</h2>
          <p className="text-muted-foreground leading-relaxed">{dict.cookiePolicy.whatAreCookies.content}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">{dict.cookiePolicy.howWeUse.title}</h2>
          <p className="text-muted-foreground leading-relaxed">{dict.cookiePolicy.howWeUse.content}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">{dict.cookiePolicy.cookieTable.title}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border-subtle rounded-lg">
              <thead>
                <tr className="bg-bg-surface/50">
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">{t('Cookie Name', 'Cookie 名称')}</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">{t('Purpose', '用途')}</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">{t('Duration', '时长')}</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">{t('Category', '类别')}</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-primary">{t('Provider', '提供方')}</th>
                </tr>
              </thead>
              <tbody>
                {dict.cookiePolicy.cookieTable.rows.map((row: { name: string; purpose: string; duration: string; category: string; provider: string }, i: number) => (
                  <tr key={row.name} className={i % 2 === 0 ? 'bg-bg-surface/20' : ''}>
                    <td className="px-4 py-3 font-mono text-xs">{row.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.purpose}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.duration}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent-emerald/10 text-accent-emerald">
                        {row.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{row.provider}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">{dict.cookiePolicy.thirdParty.title}</h2>
          <p className="text-muted-foreground leading-relaxed">{dict.cookiePolicy.thirdParty.content}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">{dict.cookiePolicy.yourChoices.title}</h2>
          <p className="text-muted-foreground leading-relaxed">{dict.cookiePolicy.yourChoices.content}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">{dict.cookiePolicy.contact.title}</h2>
          <p className="text-muted-foreground leading-relaxed">{dict.cookiePolicy.contact.content}</p>
        </section>
      </div>
    </div>
  )
}
