'use client'

import { useState, useRef, useCallback } from 'react'
import { useResume } from '@/context/ResumeContext'
import { useTranslations } from '@/lib/i18n'
import { styles } from './styles/registry'
import { X, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ResumeStyle } from '@/lib/types'
import { generatePDF, downloadPDF } from '@/lib/pdf-service'

interface Props {
  onClose: () => void
}

export default function PreviewModal({ onClose }: Props) {
  const { data } = useResume()
  const { t, lang } = useTranslations()
  const [selectedStyle, setSelectedStyle] = useState<ResumeStyle>('modern')
  const previewRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)
  const [pdfError, setPdfError] = useState('')

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
          <div className="w-48 border-r border-border p-3 overflow-y-auto bg-muted/30">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">{t.builder.style}</h3>
            <div className="space-y-1.5">
              {styles.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStyle(s.id)}
                  className={'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ' + (
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
