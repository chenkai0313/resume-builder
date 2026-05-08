'use client'

import { useState } from 'react'
import { useTranslations } from '@/lib/i18n'
import { useResume } from '@/context/ResumeContext'
import PersonalInfoForm from '@/components/builder/PersonalInfoForm'
import AdvantagesForm from '@/components/builder/AdvantagesForm'
import WorkExperienceForm from '@/components/builder/WorkExperienceForm'
import EducationForm from '@/components/builder/EducationForm'
import SkillsForm from '@/components/builder/SkillsForm'
import ProjectsForm from '@/components/builder/ProjectsForm'
import CertificationsForm from '@/components/builder/CertificationsForm'
import LanguagesForm from '@/components/builder/LanguagesForm'
import PreviewModal from '@/components/builder/PreviewModal'
import { Button } from '@/components/ui/button'
import { Eye, Sparkles, RotateCcw } from 'lucide-react'

export default function BuilderPage() {
  const { t } = useTranslations()
  const { clearResume, loadDefaultResume } = useResume()
  const [previewOpen, setPreviewOpen] = useState(false)

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold inline-flex items-center gap-2">
          <span className="bg-gradient-to-r from-accent-emerald via-accent-teal to-accent-mint bg-clip-text text-transparent">
            {t.builder.title}
          </span>
          <Sparkles className="w-6 h-6 text-accent-emerald" />
        </h1>
        <p className="text-muted-foreground text-sm mt-2">{t.builder.subtitle}</p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <Button
            onClick={() => { if (confirm(t.builder.clearConfirm)) clearResume() }}
            variant="outline"
            size="xs"
            className="text-muted-foreground"
          >
            <RotateCcw className="w-3 h-3" />
            {t.builder.clear}
          </Button>
          <Button
            onClick={loadDefaultResume}
            variant="outline"
            size="xs"
            className="text-muted-foreground"
          >
            <Sparkles className="w-3 h-3" />
            {t.builder.loadDefault}
          </Button>
        </div>
      </div>

      <div className="space-y-5">
        <PersonalInfoForm />
        <AdvantagesForm />
        <WorkExperienceForm />
        <EducationForm />
        <SkillsForm />
        <ProjectsForm />
        <CertificationsForm />
        <LanguagesForm />
      </div>

      <div className="mt-12 text-center">
        <Button
          onClick={() => setPreviewOpen(true)}
          size="lg"
          className="bg-gradient-to-r from-accent-emerald to-accent-teal text-white hover:opacity-90 shadow-lg shadow-accent-emerald/20 text-base h-12 px-10"
        >
          <Eye className="w-5 h-5" />
          {t.builder.preview}
        </Button>
      </div>

      {previewOpen && <PreviewModal onClose={() => setPreviewOpen(false)} />}
    </div>
  )
}
