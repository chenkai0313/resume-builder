import type { CustomField } from '@/lib/types'

export default function CustomFields({ fields, className = '' }: { fields: CustomField[]; className?: string }) {
  if (!fields || fields.length === 0) return null
  return (
    <div className={`flex flex-wrap gap-x-3 text-xs text-gray-400 mt-0.5 ${className}`}>
      {fields.filter(f => f.label && f.value).map(f => (
        <span key={f.id}>{f.label}: {f.value}</span>
      ))}
    </div>
  )
}
