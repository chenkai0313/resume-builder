'use client'

import { useTranslations } from '@/lib/i18n'
import { useResume } from '@/context/ResumeContext'
import TagInput from './TagInput'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SkillsForm() {
  const { t } = useTranslations()
  const { data, addSkill, removeSkill } = useResume()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.builder.skills}</CardTitle>
      </CardHeader>
      <CardContent>
        <TagInput
          tags={data.skills}
          onAdd={addSkill}
          onRemove={removeSkill}
          placeholder={t.builder.form.skillsPlaceholder}
        />
      </CardContent>
    </Card>
  )
}
