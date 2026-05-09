'use client'

import { useState, useRef, useCallback } from 'react'
import { useResume } from '@/context/ResumeContext'
import { useTranslations } from '@/lib/i18n'
import { styles, categories } from './styles/registry'
import { X, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ResumeCategory } from '@/lib/types'
import { generatePDF, downloadPDF } from '@/lib/pdf-service'

interface Props {
  onClose: () => void
}

export default function PreviewModal({ onClose }: Props) {
  const { data, updateCategory } = useResume()
  const { t, lang } = useTranslations()
  const [activeCategory, setActiveCategory] = useState<ResumeCategory>(data.category || 'general')
  const [selectedStyle, setSelectedStyle] = useState(
    () => styles.filter(s => s.category === (data.category || 'general'))[0]?.id || styles[0].id
  )
  const previewRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)
  const [pdfError, setPdfError] = useState('')

  const filteredStyles = styles.filter(s => s.category === activeCategory)
  const currentStyle = styles.find(s => s.id === selectedStyle)!
  const PreviewComponent = currentStyle.component

  const handleDownload = useCallback(async () => {
    if (!previewRef.current) return
    setDownloading(true)
    setPdfError('')
    try {
      const el = previewRef.current
      const blob = await generatePDF(el)
      downloadPDF(blob)
    } catch (err) {
      console.error('PDF generation failed:', err)
      setPdfError(String(err))
    } finally {
      setDownloading(false)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-xl w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">{t.builder.preview}</h2>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleDownload}
              disabled={downloading}
              className="bg-gradient-to-r from-accent-emerald to-accent-teal text-white hover:opacity-90 shadow-lg"
            >
              <Download className="w-4 h-4" />
              {downloading ? '...' : t.builder.download}
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {pdfError && (
          <div className="px-6 py-2 bg-destructive/10 text-destructive text-xs border-b border-border">
            PDF error: {pdfError}
          </div>
        )}

        <div className="flex flex-1 overflow-hidden">
          <div className="w-52 border-r border-border p-3 overflow-y-auto bg-muted/30 flex flex-col gap-3">
            {/* Category tabs */}
            <div className="flex flex-col gap-1">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id
                const catStyles = styles.filter(s => s.category === cat.id)
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id)
                      updateCategory(cat.id)
                      setSelectedStyle(catStyles[0]?.id || styles[0].id)
                    }}
                    className={'w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ' + (
                      isActive
                        ? 'bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent'
                    )}
                  >
                    <span>{cat.name[lang as keyof typeof cat.name]}</span>
                    <span className="ml-2 text-xs text-muted-foreground/60">{catStyles.length}</span>
                  </button>
                )
              })}
            </div>

            {/* Templates in active category */}
            <div className="border-t border-border pt-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
                {t.builder.style}
              </h3>
              <div className="space-y-1">
                {filteredStyles.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStyle(s.id)}
                    className={'w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ' + (
                      selectedStyle === s.id
                        ? 'bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent'
                    )}
                  >
                    {s.name[lang as keyof typeof s.name]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="shadow-2xl mx-auto" style={{ maxWidth: '210mm' }}>
              <div ref={previewRef}>
                <PreviewComponent data={data} lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
