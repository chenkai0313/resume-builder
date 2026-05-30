import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { employmentStatusDisplay, salaryDisplay, workModeDisplay, proficiencyDisplay } from '@/lib/display'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function Timeline({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans p-8 max-w-[210mm] mx-auto">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-blue-100">
        <div className="flex items-start gap-4">
          <ResumeAvatar src={p.avatar} size={52} className="mt-0.5" />
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-gray-900">{p.name || 'Your Name'}</h1>
            <p className="text-sm text-blue-600 mt-0.5">{p.title}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-500 mt-1.5">
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
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">{T.keyStrengths}</h2>
          <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
        </div>
      )}

      {/* Work Experience — Timeline */}
      {data.workExperience.length > 0 && (
        <div className="mb-7">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-4">{T.experience}</h2>
          <div className="relative">
            {/* Vertical timeline rail */}
            <div className="absolute left-[0.2rem] top-2 bottom-2 w-0.5 bg-blue-200 rounded-full" />
            <div className="space-y-5">
              {data.workExperience.map((exp) => (
                <div key={exp.id} className="relative pl-7">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 w-[10px] h-[10px] rounded-full bg-blue-600 border-[3px] border-white shadow-sm ring-1 ring-blue-300" />
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                    <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                  </div>
                  <p className="text-xs text-blue-600 font-medium mt-0.5">{exp.company}</p>
                  <ul className="list-disc list-inside mt-1.5 space-y-0.5">
                    {exp.description.filter(Boolean).map((d, j) => (
                      <li key={j} className="text-xs text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: d }} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Education — Timeline */}
      {data.education.length > 0 && (
        <div className="mb-7">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-4">{T.education}</h2>
          <div className="relative">
            <div className="absolute left-[0.2rem] top-2 bottom-2 w-0.5 bg-blue-200 rounded-full" />
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="relative pl-7">
                  <div className="absolute left-0 top-1.5 w-[10px] h-[10px] rounded-full bg-blue-600 border-[3px] border-white shadow-sm ring-1 ring-blue-300" />
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-semibold text-sm text-gray-900">{edu.school}</h3>
                    <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">{edu.startDate} — {edu.endDate}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">{edu.degree}{edu.major ? ` — ${edu.major}` : ''}</p>
                  {(edu.gpa || edu.awards) && (
                    <div className="text-xs text-gray-400 mt-0.5">
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                      {edu.gpa && edu.awards && <span> | </span>}
                      {edu.awards && <span>{edu.awards}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-7">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3">{T.skills}</h2>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((s, i) => (
              <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded border border-blue-200">{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Projects — Timeline */}
      {data.projects.length > 0 && (
        <div className="mb-7">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-4">{T.projects}</h2>
          <div className="relative">
            <div className="absolute left-[0.2rem] top-2 bottom-2 w-0.5 bg-blue-200 rounded-full" />
            <div className="space-y-4">
              {data.projects.map((proj) => (
                <div key={proj.id} className="relative pl-7">
                  <div className="absolute left-0 top-1.5 w-[10px] h-[10px] rounded-full bg-blue-600 border-[3px] border-white shadow-sm ring-1 ring-blue-300" />
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-semibold text-sm text-gray-900">{proj.name}</h3>
                    <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">{proj.startDate} — {proj.endDate}</span>
                  </div>
                  <p className="text-xs text-blue-500 mt-0.5">{proj.role}</p>
                  {proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {proj.techStack.filter(Boolean).map((t, j) => (
                        <span key={j} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  )}
                  {proj.description && (
                    <div className="text-xs text-gray-600 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: proj.description }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">{T.certifications}</h2>
          {data.certifications.map((cert) => (
            <p key={cert.id} className="text-xs text-gray-600 mb-0.5 last:mb-0">{cert.name}{cert.date ? ` — ${cert.date}` : ''}</p>
          ))}
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">{T.languages}</h2>
          <p className="text-xs text-gray-600">{data.languages.map(l => `${l.name} (${proficiencyDisplay(l.proficiency, lang)})`).join(' | ')}</p>
        </div>
      )}
    </div>
  )
}
