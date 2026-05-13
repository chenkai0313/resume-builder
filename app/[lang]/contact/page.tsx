import { getDictionary } from '@/lib/dictionary.server'

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = getDictionary(lang)
  const t = (en: string, zh: string) => lang === 'zh' ? zh : en

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">{dict.contact.title}</h1>
      <p className="text-muted-foreground leading-relaxed mb-12 max-w-xl">{dict.contact.intro}</p>

      <div className="space-y-10">
        <div className="rounded-2xl border border-border-subtle bg-bg-surface/40 backdrop-blur-sm p-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <svg className="w-5 h-5 text-accent-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {dict.contact.email.title}
          </h2>
          <p className="text-sm text-muted-foreground mb-2">{dict.contact.email.content}</p>
          <a href={`mailto:${dict.contact.email.address}`} className="text-accent-emerald hover:underline font-mono text-sm">
            {dict.contact.email.address}
          </a>
        </div>

        <div className="rounded-2xl border border-border-subtle bg-bg-surface/40 backdrop-blur-sm p-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <svg className="w-5 h-5 text-accent-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            {dict.contact.privacy.title}
          </h2>
          <p className="text-sm text-muted-foreground mb-2">{dict.contact.privacy.content}</p>
          <a href={`mailto:${dict.contact.privacy.address}`} className="text-accent-teal hover:underline font-mono text-sm">
            {dict.contact.privacy.address}
          </a>
        </div>

        <div className="rounded-2xl border border-border-subtle bg-bg-surface/40 backdrop-blur-sm p-6">
          <h2 className="text-lg font-semibold mb-3">{dict.contact.responseTime.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{dict.contact.responseTime.content}</p>
        </div>

        <div className="rounded-2xl border border-border-subtle bg-bg-surface/40 backdrop-blur-sm p-6">
          <h2 className="text-lg font-semibold mb-3">{dict.contact.feedback.title}</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            {dict.contact.feedback.bullets.map((bullet: string, i: number) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
