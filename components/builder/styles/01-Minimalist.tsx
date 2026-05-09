import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { employmentStatusDisplay, salaryDisplay, workModeDisplay, proficiencyDisplay } from '@/lib/display'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function Minimalist({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans p-8 max-w-[210mm] mx-auto">
      <div className="mb-6">
        <div className="flex items-start gap-4">
          <ResumeAvatar src={p.avatar} size={52} className="mt-0.5" />
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-gray-900">{p.name || 'Your Name'}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{p.title}</p>
            <div className="flex flex-wrap gap-x-4 text-xs text-gray-400 mt-1.5">
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>{p.phone}</span>}
              {p.website && <span>{p.website}</span>}
            </div>
            {(p.employmentStatus || p.salaryExpectation || p.workMode) && (
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-400 mt-0.5">
                {p.employmentStatus && <span>{employmentStatusDisplay(p.employmentStatus, lang)}</span>}
                {p.salaryExpectation && <span>{salaryDisplay(p.salaryExpectation, lang)}</span>}
                {p.workMode && <span>{workModeDisplay(p.workMode, lang)}</span>}
              </div>
            )}
            <CustomFields fields={p.customFields || []} />
          </div>
        </div>
      </div>

      {data.advantages && (
        <Section title={T.keyStrengths}>
          <div className="text-sm leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: data.advantages }} />
        </Section>
      )}

      {data.workExperience.length > 0 && (
        <Section title={T.experience}>
          {data.workExperience.map((exp, i) => (
            <div key={exp.id} className={`${i > 0 ? 'mt-4 pt-4 border-t border-gray-100' : ''}`}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                <span className="text-xs text-gray-400">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{exp.company}</p>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                {exp.description.filter(Boolean).map((d, j) => (
                  <li key={j} className="text-xs text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: d }} />
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {data.skills.length > 0 && (
        <Section title={T.skills}>
          <p className="text-xs text-gray-600 leading-relaxed">{data.skills.join(' / ')}</p>
        </Section>
      )}

      {data.education.length > 0 && (
        <Section title={T.education}>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm text-gray-900">{edu.school}</h3>
                <span className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</span>
              </div>
              <p className="text-xs text-gray-500">{edu.degree}{edu.major ? ` — ${edu.major}` : ''}</p>
            </div>
          ))}
        </Section>
      )}

      {data.projects.length > 0 && (
        <Section title={T.projects}>
          {data.projects.map((proj) => (
            <div key={proj.id} className="mb-3 last:mb-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm text-gray-900">{proj.name}</h3>
                <span className="text-xs text-gray-400">{proj.startDate} — {proj.endDate}</span>
              </div>
              {proj.techStack.length > 0 && (
                <p className="text-xs text-gray-400 mt-0.5">{proj.techStack.join(' / ')}</p>
              )}
              {proj.description && (
                <div className="text-xs text-gray-600 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: proj.description }} />
              )}
            </div>
          ))}
        </Section>
      )}

      {data.certifications.length > 0 && (
        <Section title={T.certifications}>
          {data.certifications.map((cert) => (
            <p key={cert.id} className="text-xs text-gray-600">{cert.name}{cert.date ? ` — ${cert.date}` : ''}</p>
          ))}
        </Section>
      )}

      {data.languages.length > 0 && (
        <Section title={T.languages}>
          <p className="text-xs text-gray-600">{data.languages.map(l => `${l.name} (${proficiencyDisplay(l.proficiency, lang)})`).join(' / ')}</p>
        </Section>
      )}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0">
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2.5">{title}</h2>
      {children}
    </div>
  )
}
