'use client'

import { useTranslations } from '@/lib/i18n'
import { useResume } from '@/context/ResumeContext'
import MonthPicker from './MonthPicker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'


export default function EducationForm() {
  const { t } = useTranslations()
  const { data, addEducation, updateEducation, removeEducation } = useResume()
  const { lang } = useTranslations()
  const showStudentFields = data.category === 'general'

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t.builder.education}</CardTitle>
          <Button variant="outline" size="sm" onClick={addEducation}>
            <Plus className="w-4 h-4" /> {t.builder.add}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.education.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">{t.builder.add} {t.builder.education}</p>
        )}

            {data.education.map((edu) => (
                <div key={edu.id} className="rounded-lg border bg-card p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label>{t.builder.form.school}</Label>
                <Input
                  type="text" value={edu.school}
                  onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t.builder.form.degree}</Label>
                <Input
                  type="text" value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t.builder.form.major}</Label>
                <Input
                  type="text" value={edu.major}
                  onChange={(e) => updateEducation(edu.id, 'major', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t.builder.form.startDate}</Label>
                <MonthPicker
                  value={edu.startDate}
                  onChange={(val) => updateEducation(edu.id, 'startDate', val)}
                  lang={lang}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t.builder.form.endDate}</Label>
                <MonthPicker
                  value={edu.endDate}
                  onChange={(val) => updateEducation(edu.id, 'endDate', val)}
                  lang={lang}
                />
              </div>
              {showStudentFields && (
                <>
                  <div className="grid gap-2">
                    <Label>{t.builder.form.gpa}</Label>
                    <Input
                      type="text" value={edu.gpa || ''}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      placeholder="e.g. 3.8/4.0"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>{t.builder.form.awards}</Label>
                    <Input
                      type="text" value={edu.awards || ''}
                      onChange={(e) => updateEducation(edu.id, 'awards', e.target.value)}
                      placeholder="e.g. Dean's List, Scholarship"
                    />
                  </div>
                </>
              )}
            </div>
            <Button
              variant="ghost" size="icon-sm"
              onClick={() => removeEducation(edu.id)}
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
