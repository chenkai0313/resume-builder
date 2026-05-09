import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { employmentStatusDisplay, salaryDisplay, workModeDisplay, proficiencyDisplay } from '@/lib/display'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function ATSOptimized({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-black font-serif p-8 max-w-[210mm] mx-auto text-sm leading-normal">
      <div className="mb-5">
        <div className="flex items-start gap-3">
          <ResumeAvatar src={p.avatar} size={48} className="mt-0.5" />
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-black">{p.name || 'Your Name'}</h1>
            <p className="text-sm mt-0.5">{p.title}</p>
            <p className="text-xs mt-1">
              {[p.email, p.phone, p.website].filter(Boolean).join(' | ')}
            </p>
            {(p.employmentStatus || p.salaryExpectation || p.workMode) && (
              <p className="text-xs mt-0.5">
                {[p.employmentStatus && employmentStatusDisplay(p.employmentStatus, lang),
                  p.salaryExpectation && salaryDisplay(p.salaryExpectation, lang),
                  p.workMode && workModeDisplay(p.workMode, lang)].filter(Boolean).join(' | ')}
              </p>
            )}
            <CustomFields fields={p.customFields || []} />
          </div>
        </div>
      </div>

      {data.advantages && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1">{T.keyStrengths}</h2>
          <div className="text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
        </div>
      )}

      {data.workExperience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2">{T.experience}</h2>
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <p className="text-xs font-bold">{exp.position}, {exp.company}</p>
              <p className="text-xs">{exp.startDate} — {exp.current ? T.present : exp.endDate}</p>
              {exp.description.filter(Boolean).map((d, i) => (
                <p key={i} className="text-xs mt-0.5" dangerouslySetInnerHTML={{ __html: d }} />
              ))}
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1">{T.skills}</h2>
          <p className="text-xs">{data.skills.join(', ')}</p>
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2">{T.education}</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <p className="text-xs font-bold">{edu.school}</p>
              <p className="text-xs">{edu.degree}{edu.major ? `, ${edu.major}` : ''}</p>
              <p className="text-xs">{edu.startDate} — {edu.endDate}</p>
            </div>
          ))}
        </div>
      )}

      {data.projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2">{T.projects}</h2>
          {data.projects.map((proj) => (
            <div key={proj.id} className="mb-2">
              <p className="text-xs font-bold">{proj.name}</p>
              <p className="text-xs">{proj.role} | {proj.startDate} — {proj.endDate}</p>
              {proj.techStack.length > 0 && <p className="text-xs">Tech: {proj.techStack.join(', ')}</p>}
              {proj.description && (
                <p className="text-xs mt-0.5" dangerouslySetInnerHTML={{ __html: proj.description }} />
              )}
            </div>
          ))}
        </div>
      )}

      {data.certifications.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1">{T.certifications}</h2>
          {data.certifications.map((cert) => (
            <p key={cert.id} className="text-xs">{cert.name}{cert.date ? ` (${cert.date})` : ''}</p>
          ))}
        </div>
      )}

      {data.languages.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1">{T.languages}</h2>
          <p className="text-xs">{data.languages.map(l => `${l.name} (${proficiencyDisplay(l.proficiency, lang)})`).join(', ')}</p>
        </div>
      )}
    </div>
  )
}
