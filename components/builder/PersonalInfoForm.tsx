'use client'

import { useTranslations } from '@/lib/i18n'
import { useResume } from '@/context/ResumeContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import AvatarUpload from './AvatarUpload'
import { Plus, Trash2 } from 'lucide-react'

export default function PersonalInfoForm() {
  const { t } = useTranslations()
  const { data, updatePersonalInfo, addCustomField, updateCustomField, removeCustomField } = useResume()

  const fields: { key: string; type: string }[] = [
    { key: 'name', type: 'text' },
    { key: 'email', type: 'email' },
    { key: 'phone', type: 'tel' },
    { key: 'title', type: 'text' },
    { key: 'website', type: 'url' },
    { key: 'github', type: 'text' },
    { key: 'linkedin', type: 'text' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.builder.personalInfo}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-5">
          <Label>{t.builder.form.avatar}</Label>
          <div className="mt-2">
            <AvatarUpload
              value={data.personalInfo.avatar}
              onChange={(val) => updatePersonalInfo('avatar', val)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {fields.map(({ key, type }) => (
            <div key={key} className="grid gap-2">
              <Label>{String(t.builder.form[key as keyof typeof t.builder.form])}</Label>
              <Input
                type={type}
                value={(data.personalInfo as any)[key]}
                onChange={(e) => updatePersonalInfo(key, e.target.value)}
              />
            </div>
          ))}

          <div className="grid gap-2">
            <Label>{t.builder.form.employmentStatus}</Label>
            <Select
              value={data.personalInfo.employmentStatus || null}
              onValueChange={(val) => updatePersonalInfo('employmentStatus', val ?? '')}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employed">{t.builder.employmentStatusOptions.employed}</SelectItem>
                <SelectItem value="unemployed">{t.builder.employmentStatusOptions.unemployed}</SelectItem>
                <SelectItem value="student">{t.builder.employmentStatusOptions.student}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>{t.builder.form.salaryExpectation}</Label>
            <Select
              value={data.personalInfo.salaryExpectation || null}
              onValueChange={(val) => updatePersonalInfo('salaryExpectation', val ?? '')}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under10">{t.builder.salaryOptions.under10}</SelectItem>
                <SelectItem value="10_20">{t.builder.salaryOptions['10_20']}</SelectItem>
                <SelectItem value="20_30">{t.builder.salaryOptions['20_30']}</SelectItem>
                <SelectItem value="30_50">{t.builder.salaryOptions['30_50']}</SelectItem>
                <SelectItem value="above50">{t.builder.salaryOptions.above50}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>{t.builder.form.workMode}</Label>
            <Select
              value={data.personalInfo.workMode || null}
              onValueChange={(val) => updatePersonalInfo('workMode', val ?? '')}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">{t.builder.workModeOptions.remote}</SelectItem>
                <SelectItem value="office">{t.builder.workModeOptions.office}</SelectItem>
                <SelectItem value="hybrid">{t.builder.workModeOptions.hybrid}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Custom Fields */}
          {(data.personalInfo.customFields || []).map((cf) => (
            <div key={cf.id} className="grid grid-cols-[1fr,1fr,auto] gap-2 items-end">
              <div className="grid gap-2">
                <Label className="text-xs">{t.builder.form.customFieldLabel}</Label>
                <Input
                  placeholder={t.builder.form.customFieldLabelPlaceholder}
                  value={cf.label}
                  onChange={(e) => updateCustomField(cf.id, 'label', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-xs">{t.builder.form.customFieldValue}</Label>
                <Input
                  placeholder={t.builder.form.customFieldValuePlaceholder}
                  value={cf.value}
                  onChange={(e) => updateCustomField(cf.id, 'value', e.target.value)}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCustomField(cf.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addCustomField}
            className="text-xs text-muted-foreground"
          >
            <Plus className="w-3 h-3" />
            {t.builder.form.addCustomField}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
