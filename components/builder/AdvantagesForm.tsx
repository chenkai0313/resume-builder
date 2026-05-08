'use client'

import { useTranslations } from '@/lib/i18n'
import { useResume } from '@/context/ResumeContext'
import RichTextEditor from './RichTextEditor'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdvantagesForm() {
  const { t } = useTranslations()
  const { data, updateAdvantages } = useResume()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.builder.advantages}</CardTitle>
      </CardHeader>
      <CardContent>
        <RichTextEditor
          value={data.advantages}
          onChange={updateAdvantages}
          placeholder={t.builder.placeholder.advantages}
        />
      </CardContent>
    </Card>
  )
}
