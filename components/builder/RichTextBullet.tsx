'use client'

import { useRef, useEffect } from 'react'
import { Bold, Italic } from 'lucide-react'

interface Props {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  className?: string
}

export default function RichTextBullet({ value, onChange, placeholder, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || ''
    }
  }, [value])

  const exec = (cmd: string) => {
    document.execCommand(cmd, false)
    ref.current?.focus()
    if (ref.current) onChange(ref.current.innerHTML)
  }

  const handleInput = () => {
    if (ref.current) onChange(ref.current.innerHTML)
  }

  return (
    <div className={`flex items-start gap-1 border border-input bg-transparent rounded-lg focus-within:ring-3 focus-within:ring-ring/50 transition-colors ${className}`}>
      <div className="flex gap-0.5 px-1 py-1.5 border-r border-border">
        <button type="button" onClick={() => exec('bold')} className="p-1 rounded hover:bg-muted text-muted-foreground transition-colors">
          <Bold className="w-3 h-3" />
        </button>
        <button type="button" onClick={() => exec('italic')} className="p-1 rounded hover:bg-muted text-muted-foreground transition-colors">
          <Italic className="w-3 h-3" />
        </button>
      </div>
      <div
        ref={ref}
        contentEditable
        onInput={handleInput}
        data-placeholder={placeholder}
        className="flex-1 px-2 py-1.5 text-sm text-foreground focus:outline-none min-h-[28px] empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground"
      />
    </div>
  )
}
