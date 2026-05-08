'use client'

import { useRef, useCallback, useState } from 'react'
import { Camera, X, AlertCircle } from 'lucide-react'
import { useTranslations } from '@/lib/i18n'

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function AvatarUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')
  const { t } = useTranslations()

  const compressAndEncode = useCallback(async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setError(t.builder.form.avatarErrorSize)
      return
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError(t.builder.form.avatarErrorType)
      return
    }

    setError('')

    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image()
      i.onload = () => resolve(i)
      i.onerror = reject
      i.src = URL.createObjectURL(file)
    })

    let { width, height } = img
    const maxDim = 300
    if (width > maxDim || height > maxDim) {
      const ratio = Math.min(maxDim / width, maxDim / height)
      width = Math.round(width * ratio)
      height = Math.round(height * ratio)
    }

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0, width, height)
    URL.revokeObjectURL(img.src)

    canvas.toBlob((blob) => {
      if (!blob) return
      const reader = new FileReader()
      reader.onload = () => onChange(reader.result as string)
      reader.readAsDataURL(blob)
    }, 'image/jpeg', 0.7)
  }, [onChange, t])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) compressAndEncode(file)
    e.target.value = ''
  }

  return (
    <div className="flex items-center gap-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <div className="relative">
          <img
            src={value}
            alt=""
            className="w-20 h-20 rounded-full object-cover border-2 border-border"
          />
          <button
            onClick={() => { onChange(''); setError('') }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-80"
            aria-label={t.builder.form.removePhoto}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-20 h-20 rounded-full border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-accent-emerald hover:text-accent-emerald transition-colors"
        >
          <Camera className="w-5 h-5" />
          <span className="text-[10px]">{t.builder.form.uploadPhoto}</span>
        </button>
      )}

      {value && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
        >
          {t.builder.form.changePhoto}
        </button>
      )}

      {error && (
        <span className="text-xs text-destructive flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </span>
      )}
    </div>
  )
}
