'use client'

import { useState, useEffect } from 'react'
import { t } from '@/lib/titles'

interface Props {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  lang?: string
}

export default function MonthPicker({ value, onChange, disabled, lang = 'en' }: Props) {
  const T = t(lang)
  const parts = value ? value.split('-') : ['', '']
  const [selYear, setSelYear] = useState(parts[0])
  const [selMonth, setSelMonth] = useState(parts[1])

  useEffect(() => {
    const p = value ? value.split('-') : ['', '']
    setSelYear(p[0])
    setSelMonth(p[1])
  }, [value])

  const now = new Date()
  const years = Array.from({ length: 30 }, (_, i) => now.getFullYear() - i)

  const handleYear = (y: string) => {
    setSelYear(y)
    if (y && selMonth) onChange(`${y}-${selMonth}`)
  }

  const handleMonth = (m: string) => {
    setSelMonth(m)
    if (selYear && m) onChange(`${selYear}-${m}`)
    else if (m) onChange(`2024-${m}`)
  }

  const selectClass =
    "h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm text-foreground transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"

  if (disabled) {
    return (
      <div className={selectClass + " opacity-40 flex items-center"}>
        {value || '—'}
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <select value={selYear} onChange={(e) => handleYear(e.target.value)} className={selectClass}>
        <option value="">Year</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
      <select value={selMonth} onChange={(e) => handleMonth(e.target.value)} className={selectClass}>
        <option value="">Month</option>
        {T.months.map((label, i) => {
          const v = (i + 1).toString().padStart(2, '0')
          return <option key={v} value={v}>{label}</option>
        })}
      </select>
    </div>
  )
}
