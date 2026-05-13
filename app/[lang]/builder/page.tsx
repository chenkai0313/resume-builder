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
import { Eye, Sparkles, RotateCcw, Lightbulb, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function BuilderPage() {
  const { t, lang } = useTranslations()
  const { data, clearResume, loadDefaultResume, updateCategory } = useResume()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [guideOpen, setGuideOpen] = useState(true)

  const categoryTabs: { id: typeof data.category; en: string; zh: string }[] = [
    { id: 'general', en: 'General', zh: '通用模板' },
    { id: 'tech', en: 'Technical', zh: '技术岗位' },
    { id: 'executive', en: 'Executive', zh: '管理高管' },
    { id: 'creative', en: 'Creative', zh: '创意营销' },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold inline-flex items-center gap-2">
          <span className="bg-gradient-to-r from-accent-emerald via-accent-teal to-accent-mint bg-clip-text text-transparent">
            {t.builder.title}
          </span>
          <Sparkles className="w-6 h-6 text-accent-emerald" />
        </h1>
        <p className="text-muted-foreground text-sm mt-2">{t.builder.subtitle}</p>

        <div className="mt-6 flex items-center justify-center gap-2">
          {categoryTabs.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateCategory(cat.id)}
              className={'px-4 py-2 rounded-lg text-sm font-medium transition-colors ' + (
                data.category === cat.id
                  ? 'bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent'
              )}
            >
              {lang === 'zh' ? cat.zh : cat.en}
            </button>
          ))}
        </div>

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

      {/* Quick Start Guide */}
      {guideOpen && (
        <div className="mb-8 rounded-2xl border border-accent-emerald/15 bg-accent-emerald/[0.03] backdrop-blur-sm p-6 relative">
          <button
            onClick={() => setGuideOpen(false)}
            className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors"
            aria-label="Close guide"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-accent-emerald" />
            {t.builder.guide.title}
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-6">{t.builder.guide.intro}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="rounded-xl border border-border-subtle bg-bg-surface/40 p-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-emerald to-accent-teal flex items-center justify-center text-[#0D0D0D] font-extrabold text-sm mb-3">1</div>
              <h3 className="font-semibold text-sm text-text-primary mb-1.5">{t.builder.guide.step1Title}</h3>
              <p className="text-xs text-text-tertiary leading-relaxed">{t.builder.guide.step1Desc}</p>
            </div>
            <div className="rounded-xl border border-border-subtle bg-bg-surface/40 p-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-emerald to-accent-teal flex items-center justify-center text-[#0D0D0D] font-extrabold text-sm mb-3">2</div>
              <h3 className="font-semibold text-sm text-text-primary mb-1.5">{t.builder.guide.step2Title}</h3>
              <p className="text-xs text-text-tertiary leading-relaxed">{t.builder.guide.step2Desc}</p>
            </div>
            <div className="rounded-xl border border-border-subtle bg-bg-surface/40 p-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-emerald to-accent-teal flex items-center justify-center text-[#0D0D0D] font-extrabold text-sm mb-3">3</div>
              <h3 className="font-semibold text-sm text-text-primary mb-1.5">{t.builder.guide.step3Title}</h3>
              <p className="text-xs text-text-tertiary leading-relaxed">{t.builder.guide.step3Desc}</p>
            </div>
          </div>

          <div className="border-t border-border-subtle pt-6">
            <h3 className="text-sm font-semibold text-text-primary mb-3">{t.builder.guide.tips}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1, 2, 3, 4, 5].map((n) => {
                const tipKey = `tip${n}` as keyof typeof t.builder.guide
                return (
                  <div key={n} className="flex gap-2 text-xs text-text-tertiary leading-relaxed">
                    <span className="text-accent-emerald shrink-0 mt-0.5">▸</span>
                    <span>{t.builder.guide[tipKey] as string}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center gap-1.5 text-sm text-accent-emerald hover:underline"
            >
              Read resume writing guides
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Re-open guide button */}
      {!guideOpen && (
        <div className="mb-8 text-center">
          <button
            onClick={() => setGuideOpen(true)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            {lang === 'zh' ? '显示使用指南' : 'Show usage guide'}
          </button>
        </div>
      )}

      {/* Form Sections */}
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

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <Button
          onClick={() => setPreviewOpen(true)}
          size="lg"
          className="bg-gradient-to-r from-accent-emerald to-accent-teal text-white hover:opacity-90 shadow-lg shadow-accent-emerald/20 text-base h-12 px-10"
        >
          <Eye className="w-5 h-5" />
          {t.builder.preview}
        </Button>
        <p className="text-xs text-muted-foreground mt-3">
          {lang === 'zh'
            ? '切换模板、实时预览、一键下载 PDF——完全免费，无需注册。'
            : 'Switch templates, live preview, one-click PDF — completely free, no sign-up.'}
        </p>
      </div>

      {previewOpen && <PreviewModal onClose={() => setPreviewOpen(false)} />}
    </div>
  )
}
