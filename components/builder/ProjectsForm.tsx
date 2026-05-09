'use client'

import { useTranslations } from '@/lib/i18n'
import { useResume } from '@/context/ResumeContext'
import TagInput from './TagInput'
import RichTextEditor from './RichTextEditor'
import MonthPicker from './MonthPicker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'


export default function ProjectsForm() {
  const { t } = useTranslations()
  const { data, addProject, updateProject, removeProject } = useResume()
  const { lang } = useTranslations()

  const addTag = (projId: string, tag: string) => {
    const proj = data.projects.find(p => p.id === projId)
    if (proj) {
      updateProject(projId, 'techStack', [...proj.techStack, tag])
    }
  }

  const removeTag = (projId: string, idx: number) => {
    const proj = data.projects.find(p => p.id === projId)
    if (proj) {
      updateProject(projId, 'techStack', proj.techStack.filter((_, i) => i !== idx))
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t.builder.projects}</CardTitle>
          <Button variant="outline" size="sm" onClick={addProject}>
            <Plus className="w-4 h-4" /> {t.builder.add}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.projects.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">{t.builder.add} {t.builder.projects}</p>
        )}

        {data.projects.map((proj) => (
                <div key={proj.id} className="rounded-lg border bg-card p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label>{t.builder.form.projectName}</Label>
                <Input
                  type="text" value={proj.name}
                  onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t.builder.form.role}</Label>
                <Input
                  type="text" value={proj.role}
                  onChange={(e) => updateProject(proj.id, 'role', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t.builder.form.startDate}</Label>
                <MonthPicker
                  value={proj.startDate}
                  onChange={(val) => updateProject(proj.id, 'startDate', val)}
                  lang={lang}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t.builder.form.endDate}</Label>
                <MonthPicker
                  value={proj.endDate}
                  onChange={(val) => updateProject(proj.id, 'endDate', val)}
                  lang={lang}
                />
              </div>
              <div className="sm:col-span-2 grid gap-2">
                <Label>{t.builder.form.techStack}</Label>
                <TagInput
                  tags={proj.techStack}
                  onAdd={(tag) => addTag(proj.id, tag)}
                  onRemove={(idx) => removeTag(proj.id, idx)}
                  placeholder={t.builder.form.skillsPlaceholder}
                />
              </div>
              <div className="sm:col-span-2 grid gap-2">
                <Label>{t.builder.form.description}</Label>
                <RichTextEditor
                  value={proj.description}
                  onChange={(html) => updateProject(proj.id, 'description', html)}
                  placeholder={t.builder.placeholder.description}
                />
              </div>
              <div className="sm:col-span-2 grid gap-2">
                <Label>{t.builder.form.projectUrl}</Label>
                <Input
                  type="text" value={proj.url}
                  onChange={(e) => updateProject(proj.id, 'url', e.target.value)}
                />
              </div>
            </div>
            <Button
              variant="ghost" size="icon-sm"
              onClick={() => removeProject(proj.id)}
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
