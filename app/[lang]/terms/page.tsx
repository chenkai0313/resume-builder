import { getDictionary } from '@/lib/dictionary.server'

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = getDictionary(lang)

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">{dict.terms.title}</h1>
      <p className="text-sm text-muted-foreground mb-10">{dict.terms.lastUpdated}</p>

      <div className="space-y-8">
        {dict.terms.sections.map((section: { title: string; content: string }) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{section.content}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
