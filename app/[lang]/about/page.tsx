import { getDictionary } from '@/lib/dictionary.server'

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = getDictionary(lang)

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">{dict.about.title}</h1>
      {dict.about.content.split('\n\n').map((paragraph: string, i: number) => (
        <p key={i} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>
      ))}
    </div>
  )
}
