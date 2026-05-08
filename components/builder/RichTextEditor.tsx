'use client'

import { useRef, useEffect } from 'react'
import { Bold, Italic } from 'lucide-react'
import { useTranslations } from '@/lib/i18n'

interface Props {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const { t } = useTranslations()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || ''
    }
  }, [value])

  const exec = (cmd: string) => {
    document.execCommand(cmd, false)
    ref.current?.focus()
    if (ref.current) {
      onChange(ref.current.innerHTML)
    }
  }

  const handleInput = () => {
    if (ref.current) {
      onChange(ref.current.innerHTML)
    }
  }

  return (
    <div className="border border-input bg-transparent rounded-lg focus-within:ring-3 focus-within:ring-ring/50 transition-colors">
      <div className="flex gap-1 px-2 py-1.5 border-b border-border bg-muted/30 rounded-t-lg">
        <button type="button" onClick={() => exec('bold')} className="p-1.5 rounded hover:bg-muted text-muted-foreground transition-colors" title={t.builder.form.bold}>
          <Bold className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => exec('italic')} className="p-1.5 rounded hover:bg-muted text-muted-foreground transition-colors" title={t.builder.form.italic}>
          <Italic className="w-4 h-4" />
        </button>
      </div>
      <div
        ref={ref}
        contentEditable
        onInput={handleInput}
        data-placeholder={placeholder}
        className="px-3 py-2.5 text-sm min-h-[100px] text-foreground focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground"
      />
    </div>
  )
}
