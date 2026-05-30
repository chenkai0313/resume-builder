import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { employmentStatusDisplay, salaryDisplay, workModeDisplay, proficiencyDisplay } from '@/lib/display'
import CustomFields from './CustomFields'

export default function DenseProfessional({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans p-5 max-w-[210mm] mx-auto text-[85%]">
      {/* Header — no avatar, single row */}
      <div className="flex justify-between items-start mb-4 pb-3 border-b border-gray-200">
        <div className="min-w-0">
          <h1 className="text-base font-bold text-gray-900 leading-tight">{p.name || 'Your Name'}</h1>
          <p className="text-[11px] text-gray-500 mt-0.5">{p.title}</p>
        </div>
        <div className="text-right text-[10px] text-gray-500 leading-relaxed space-y-0.5 shrink-0 ml-4">
          {p.email && <div>{p.email}</div>}
          {p.phone && <div>{p.phone}</div>}
          {p.website && <div className="truncate max-w-[180px]">{p.website}</div>}
          {p.github && <div className="truncate max-w-[180px]">{p.github}</div>}
          {p.linkedin && <div className="truncate max-w-[180px]">{p.linkedin}</div>}
          {(p.employmentStatus || p.salaryExpectation || p.workMode) && (
            <div className="text-[10px] text-gray-400">
              {[p.employmentStatus, p.salaryExpectation, p.workMode]
                .filter(Boolean)
                .map((v, i, arr) => (
                  <span key={i}>
                    {i > 0 && ' | '}
                    {v === p.employmentStatus ? employmentStatusDisplay(v, lang) :
                     v === p.salaryExpectation ? salaryDisplay(v, lang) :
                     workModeDisplay(v, lang)}
                  </span>
                ))}
            </div>
          )}
          <CustomFields fields={p.customFields || []} className="justify-end text-[10px]" />
        </div>
      </div>

      {data.advantages && (
        <Section title={T.keyStrengths}>
          <div className="text-[11px] leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: data.advantages }} />
        </Section>
      )}

      {data.workExperience.length > 0 && (
        <Section title={T.experience}>
          {data.workExperience.map((exp, i) => (
            <div key={exp.id} className={`${i > 0 ? 'mt-2.5 pt-2.5 border-t border-gray-100' : ''}`}>
              <div className="flex justify-between items-baseline gap-2">
                <h3 className="font-semibold text-[11px] text-gray-900">{exp.position}</h3>
                <span className="text-[10px] text-gray-400 whitespace-nowrap shrink-0">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
              </div>
              <p className="text-[10px] text-gray-500 mt-px">{exp.company}</p>
              <ul className="list-disc list-inside mt-1 space-y-px">
                {exp.description.filter(Boolean).map((d, j) => (
                  <li key={j} className="text-[10.5px] text-gray-600 leading-snug" dangerouslySetInnerHTML={{ __html: d }} />
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {data.education.length > 0 && (
        <Section title={T.education}>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-1.5 last:mb-0">
              <div className="flex justify-between items-baseline gap-2">
                <h3 className="font-semibold text-[11px] text-gray-900">{edu.school}</h3>
                <span className="text-[10px] text-gray-400 whitespace-nowrap shrink-0">{edu.startDate} — {edu.endDate}</span>
              </div>
              <p className="text-[10px] text-gray-500">{edu.degree}{edu.major ? ` — ${edu.major}` : ''}</p>
            </div>
          ))}
        </Section>
      )}

      {data.skills.length > 0 && (
        <Section title={T.skills}>
          <p className="text-[10.5px] text-gray-600 leading-relaxed">{data.skills.join(' / ')}</p>
        </Section>
      )}

      {data.projects.length > 0 && (
        <Section title={T.projects}>
          {data.projects.map((proj) => (
            <div key={proj.id} className="mb-2 last:mb-0">
              <div className="flex justify-between items-baseline gap-2">
                <h3 className="font-semibold text-[11px] text-gray-900">{proj.name}</h3>
                <span className="text-[10px] text-gray-400 whitespace-nowrap shrink-0">{proj.startDate} — {proj.endDate}</span>
              </div>
              <div className="flex items-baseline gap-2 text-[10px] text-gray-500 mt-px">
                {proj.role && <span>{proj.role}</span>}
                {proj.techStack.length > 0 && <span className="text-gray-400">| {proj.techStack.join(', ')}</span>}
              </div>
              {proj.description && (
                <div className="text-[10.5px] text-gray-600 mt-0.5 leading-snug" dangerouslySetInnerHTML={{ __html: proj.description }} />
              )}
            </div>
          ))}
        </Section>
      )}

      {data.certifications.length > 0 && (
        <Section title={T.certifications}>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10.5px] text-gray-600">
            {data.certifications.map((cert) => (
              <span key={cert.id}>{cert.name}{cert.date ? ` (${cert.date})` : ''}</span>
            ))}
          </div>
        </Section>
      )}

      {data.languages.length > 0 && (
        <Section title={T.languages}>
          <p className="text-[10.5px] text-gray-600">{data.languages.map(l => `${l.name} (${proficiencyDisplay(l.proficiency, lang)})`).join(' / ')}</p>
        </Section>
      )}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3 pb-2.5 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0">
      <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">{title}</h2>
      {children}
    </div>
  )
}
