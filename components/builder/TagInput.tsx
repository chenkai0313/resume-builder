'use client'

import { useState, useRef, type KeyboardEvent } from 'react'
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Props {
  tags: string[]
  onAdd: (tag: string) => void
  onRemove: (idx: number) => void
  placeholder?: string
}

export default function TagInput({ tags, onAdd, onRemove, placeholder }: Props) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const commit = () => {
    const val = input.trim()
    if (val && !tags.includes(val)) {
      onAdd(val)
    }
    setInput('')
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      commit()
    }
    if (e.key === 'Backspace' && !input && tags.length > 0) {
      onRemove(tags.length - 1)
    }
  }

  return (
    <div
      className="flex flex-wrap gap-1.5 border border-input bg-transparent rounded-lg px-3 py-2 text-sm focus-within:ring-3 focus-within:ring-ring/50 cursor-text min-h-[42px] transition-colors"
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag, i) => (
        <Badge key={i} variant="secondary" className="gap-1 pr-1">
          {tag}
          <button onClick={(e) => { e.stopPropagation(); onRemove(i) }} className="hover:text-destructive transition-colors">
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
        onBlur={commit}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="border-none outline-none flex-1 min-w-[80px] text-sm bg-transparent text-foreground placeholder:text-muted-foreground"
      />
    </div>
  )
}
