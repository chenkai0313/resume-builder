'use client'

import { useTranslations } from '@/lib/i18n'
import { useResume } from '@/context/ResumeContext'
import MonthPicker from './MonthPicker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'


export default function CertificationsForm() {
  const { t } = useTranslations()
  const { data, addCertification, updateCertification, removeCertification } = useResume()
  const { lang } = useTranslations()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t.builder.certifications}</CardTitle>
          <Button variant="outline" size="sm" onClick={addCertification}>
            <Plus className="w-4 h-4" /> {t.builder.add}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.certifications.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">{t.builder.add} {t.builder.certifications}</p>
        )}

        {data.certifications.map((cert) => (
                <div key={cert.id} className="rounded-lg border bg-card p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label>{t.builder.form.certName}</Label>
                <Input
                  type="text" value={cert.name}
                  onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t.builder.form.date}</Label>
                <MonthPicker
                  value={cert.date}
                  onChange={(val) => updateCertification(cert.id, 'date', val)}
                  lang={lang}
                />
              </div>
            </div>
            <Button
              variant="ghost" size="icon-sm"
              onClick={() => removeCertification(cert.id)}
              className="mt-2 text-destructive hover:text-destructive/80"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
                </div>
        ))}
      </CardContent>
    </Card>
  )
}
