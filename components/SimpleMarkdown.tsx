'use client'

interface SimpleMarkdownProps {
  content: string
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function SimpleMarkdown({ content }: SimpleMarkdownProps) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0
  let inCodeBlock = false
  let codeLang = ''
  let codeLines: string[] = []
  let inList = false
  let listItems: string[] = []
  let key = 0

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc pl-5 space-y-1 mb-6 text-[15px] sm:text-base text-text-secondary leading-relaxed">
          {listItems.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      )
      listItems = []
      inList = false
    }
  }

  function flushCode() {
    if (codeLines.length > 0) {
      elements.push(
        <pre key={key++} className="rounded-xl border border-border-subtle bg-bg-surface/60 p-4 overflow-x-auto mb-6 text-sm">
          {codeLang && <div className="text-[10px] text-text-tertiary uppercase tracking-wider mb-2">{codeLang}</div>}
          <code>{codeLines.join('\n')}</code>
        </pre>
      )
      codeLines = []
      inCodeBlock = false
      codeLang = ''
    }
  }

  while (i < lines.length) {
    const line = lines[i]

    // Code block boundary
    if (line.startsWith('```')) {
      flushList()
      if (inCodeBlock) {
        flushCode()
      } else {
        inCodeBlock = true
        codeLang = line.slice(3).trim()
      }
      i++
      continue
    }

    if (inCodeBlock) {
      codeLines.push(line)
      i++
      continue
    }

    // Blank line
    if (line.trim() === '') {
      flushList()
      i++
      continue
    }

    // H2
    if (line.startsWith('## ')) {
      flushList()
      const text = line.slice(3)
      elements.push(
        <h2 key={key++} id={slugify(text)} className="text-xl sm:text-2xl font-bold text-text-primary mt-10 mb-4 pb-2 border-b border-border-subtle">
          {text}
        </h2>
      )
      i++
      continue
    }

    // H3
    if (line.startsWith('### ')) {
      flushList()
      const text = line.slice(4)
      elements.push(
        <h3 key={key++} id={slugify(text)} className="text-lg font-semibold text-text-primary mt-8 mb-3">
          {text}
        </h3>
      )
      i++
      continue
    }

    // List item
    if (line.startsWith('- ')) {
      inList = true
      listItems.push(line.slice(2))
      i++
      continue
    }

    // Regular paragraph
    flushList()
    elements.push(
      <p key={key++} className="text-[15px] sm:text-base text-text-secondary leading-relaxed mb-5">
        {line}
      </p>
    )
    i++
  }

  flushList()
  flushCode()

  return <div>{elements}</div>
}
