'use client'

import { useTranslations } from '@/lib/i18n'
import { useResume } from '@/context/ResumeContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

export default function LanguagesForm() {
  const { t } = useTranslations()
  const { data, addLanguage, updateLanguage, removeLanguage } = useResume()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t.builder.languages}</CardTitle>
          <Button variant="outline" size="sm" onClick={addLanguage}>
            <Plus className="w-4 h-4" /> {t.builder.add}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.languages.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">{t.builder.add} {t.builder.languages}</p>
        )}

        {data.languages.map((lang) => (
          <div key={lang.id} className="rounded-lg border bg-card p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label>{t.builder.form.language}</Label>
                <Input
                  type="text" value={lang.name}
                  onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t.builder.form.proficiency}</Label>
                <Select
                  value={lang.proficiency || null}
                  onValueChange={(val) => updateLanguage(lang.id, 'proficiency', val ?? '')}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="native">{t.builder.form.proficiencyOptions.native}</SelectItem>
                    <SelectItem value="fluent">{t.builder.form.proficiencyOptions.fluent}</SelectItem>
                    <SelectItem value="advanced">{t.builder.form.proficiencyOptions.advanced}</SelectItem>
                    <SelectItem value="intermediate">{t.builder.form.proficiencyOptions.intermediate}</SelectItem>
                    <SelectItem value="basic">{t.builder.form.proficiencyOptions.basic}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              variant="ghost" size="icon-sm"
              onClick={() => removeLanguage(lang.id)}
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
