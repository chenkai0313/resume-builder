'use client'

import { useTranslations } from '@/lib/i18n'
import { useResume } from '@/context/ResumeContext'
import RichTextBullet from './RichTextBullet'
import MonthPicker from './MonthPicker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

export default function WorkExperienceForm() {
  const { t } = useTranslations()
  const { data, addWorkExperience, updateWorkExperience, removeWorkExperience } = useResume()
  const { lang } = useTranslations()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t.builder.workExperience}</CardTitle>
          <Button variant="outline" size="sm" onClick={addWorkExperience}>
            <Plus className="w-4 h-4" /> {t.builder.add}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.workExperience.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">{t.builder.add} {t.builder.workExperience}</p>
        )}

        {data.workExperience.map((exp, idx) => (
          <div key={exp.id} className="rounded-lg border bg-card p-4 relative">
            <div className="absolute right-2 top-2 text-xs text-muted-foreground">#{idx + 1}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label>{t.builder.form.company}</Label>
                <Input
                  type="text" value={exp.company}
                  onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t.builder.form.position}</Label>
                <Input
                  type="text" value={exp.position}
                  onChange={(e) => updateWorkExperience(exp.id, 'position', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t.builder.form.startDate}</Label>
                <MonthPicker
                  value={exp.startDate}
                  onChange={(val) => updateWorkExperience(exp.id, 'startDate', val)}
                  lang={lang}
                />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1 grid gap-2">
                  <Label>{t.builder.form.endDate}</Label>
                  <MonthPicker
                    value={exp.current ? '' : exp.endDate}
                    onChange={(val) => updateWorkExperience(exp.id, 'endDate', val)}
                    disabled={exp.current}
                    lang={lang}
                  />
                </div>
                <Label className="flex items-center gap-1.5 pb-1 cursor-pointer">
                  <input
                    type="checkbox" checked={exp.current}
                    onChange={(e) => updateWorkExperience(exp.id, 'current', e.target.checked)}
                    className="rounded border-border bg-transparent"
                  />
                  {t.builder.form.current}
                </Label>
              </div>
            </div>
            <div className="mt-3">
              <Label className="mb-2 block">{t.builder.form.description}</Label>
              {exp.description.map((point, pi) => (
                <div key={pi} className="flex gap-2 mb-1.5 items-start">
                  <RichTextBullet
                    value={point}
                    onChange={(html) => {
                      const newDesc = [...exp.description]
                      newDesc[pi] = html
                      updateWorkExperience(exp.id, 'description', newDesc)
                    }}
                    className="flex-1"
                    placeholder={t.builder.placeholder.description}
                  />
                  {exp.description.length > 1 && (
                    <button
                      onClick={() => {
                        const newDesc = exp.description.filter((_, i) => i !== pi)
                        updateWorkExperience(exp.id, 'description', newDesc)
                      }}
                      className="text-destructive hover:text-destructive/80 text-xs mt-2.5"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <Button
                variant="ghost" size="sm"
                onClick={() => updateWorkExperience(exp.id, 'description', [...exp.description, ''])}
                className="mt-1 h-auto px-2 text-xs"
              >
                + {t.builder.form.addPoint}
              </Button>
            </div>
            <Button
              variant="ghost" size="icon-sm"
              onClick={() => removeWorkExperience(exp.id)}
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
