import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { employmentStatusDisplay, salaryDisplay, workModeDisplay, proficiencyDisplay } from '@/lib/display'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function Academic({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-serif p-8 max-w-[210mm] mx-auto">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-300">
        <div className="flex items-start gap-4">
          <ResumeAvatar src={p.avatar} size={56} className="mt-0.5" />
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">{p.name || 'Your Name'}</h1>
            <p className="text-sm text-gray-500 mt-0.5 italic">{p.title}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-400 mt-1.5">
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>{p.phone}</span>}
              {p.website && <span className="truncate max-w-[220px]">{p.website}</span>}
              {p.github && <span className="truncate max-w-[220px]">{p.github}</span>}
              {p.linkedin && <span className="truncate max-w-[220px]">{p.linkedin}</span>}
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
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{T.keyStrengths}</h2>
          <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
        </div>
      )}

      {/* Education — prominent section for academic focus */}
      {data.education.length > 0 && (
        <div className="mb-7">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-4 pb-1.5 border-b border-gray-200 inline-block">{T.education}</h2>
          <div className="mt-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="font-semibold text-sm text-gray-900">{edu.school}</h3>
                  <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">{edu.startDate} — {edu.endDate}</span>
                </div>
                <p className="text-sm text-gray-600 mt-0.5">{edu.degree}{edu.major ? ` in ${edu.major}` : ''}</p>
                {(edu.gpa || edu.awards) && (
                  <div className="flex flex-wrap gap-x-3 text-xs text-gray-400 mt-0.5">
                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    {edu.awards && <span className="italic">{edu.awards}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">{T.skills}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{data.skills.join(' | ')}</p>
        </div>
      )}

      {/* Publications — from projects, using T.publications label, before work experience */}
      {data.projects.length > 0 && (
        <div className="mb-7">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-4 pb-1.5 border-b border-gray-200 inline-block">{T.publications}</h2>
          <div className="mt-4 space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="text-sm font-medium text-gray-900">&ldquo;{proj.name}&rdquo;</h3>
                  <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">{proj.startDate}{proj.endDate && proj.endDate !== proj.startDate ? `–${proj.endDate}` : ''}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 italic">{proj.role}</p>
                {proj.techStack.length > 0 && (
                  <p className="text-xs text-gray-400 mt-0.5">{proj.techStack.join(', ')}</p>
                )}
                {proj.description && (
                  <div className="text-sm text-gray-600 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: proj.description }} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience — comes after publications */}
      {data.workExperience.length > 0 && (
        <div className="mb-7">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-3">{T.experience}</h2>
          {data.workExperience.map((exp, i) => (
            <div key={exp.id} className={`${i > 0 ? 'mt-4 pt-4 border-t border-gray-100' : ''}`}>
              <div className="flex justify-between items-baseline gap-2">
                <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">{exp.company}</p>
              <ul className="list-disc list-inside mt-1.5 space-y-0.5">
                {exp.description.filter(Boolean).map((d, j) => (
                  <li key={j} className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: d }} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{T.certifications}</h2>
          {data.certifications.map((cert) => (
            <p key={cert.id} className="text-sm text-gray-600 mb-0.5 last:mb-0">{cert.name}{cert.date ? ` — ${cert.date}` : ''}</p>
          ))}
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{T.languages}</h2>
          <p className="text-sm text-gray-600">{data.languages.map(l => `${l.name} (${proficiencyDisplay(l.proficiency, lang)})`).join(' | ')}</p>
        </div>
      )}
    </div>
  )
}
