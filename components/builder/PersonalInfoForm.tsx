'use client'

import { useTranslations } from '@/lib/i18n'
import { useResume } from '@/context/ResumeContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function PersonalInfoForm() {
  const { t } = useTranslations()
  const { data, updatePersonalInfo } = useResume()

  const fields = [
    { key: 'name', type: 'text' },
    { key: 'email', type: 'email' },
    { key: 'phone', type: 'tel' },
    { key: 'title', type: 'text' },
    { key: 'website', type: 'url' },
    { key: 'github', type: 'text' },
    { key: 'linkedin', type: 'text' },
  ] as const

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.builder.personalInfo}</CardTitle>
      </CardHeader>
      <CardContent>
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
        </div>
      </CardContent>
    </Card>
  )
}
