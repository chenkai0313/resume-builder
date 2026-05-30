import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { employmentStatusDisplay, salaryDisplay, workModeDisplay, proficiencyDisplay } from '@/lib/display'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function Consultant({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto">
      {/* Minimal header — name, title, contact inline */}
      <div className="px-8 pt-8 pb-4 border-b border-gray-200">
        <div className="flex items-start gap-4">
          <ResumeAvatar src={p.avatar} size={48} className="mt-0.5 shrink-0" />
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{p.name || 'Your Name'}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{p.title}</p>
            <div className="flex flex-wrap gap-x-4 text-xs text-gray-400 mt-2">
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>{p.phone}</span>}
              {p.linkedin && <span>{p.linkedin}</span>}
            </div>
            {(p.employmentStatus || p.salaryExpectation || p.workMode) && (
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mt-1">
                {p.employmentStatus && <span>{employmentStatusDisplay(p.employmentStatus, lang)}</span>}
                {p.salaryExpectation && <span>{salaryDisplay(p.salaryExpectation, lang)}</span>}
                {p.workMode && <span>{workModeDisplay(p.workMode, lang)}</span>}
              </div>
            )}
            <CustomFields fields={p.customFields || []} />
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* EXECUTIVE SUMMARY */}
        {data.advantages && (
          <div className="mb-7">
            <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">EXECUTIVE SUMMARY</h2>
            <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
          </div>
        )}

        {/* Experience — results-oriented display */}
        {data.workExperience.length > 0 && (
          <div className="mb-7">
            <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">{T.experience}</h2>
            <div className="space-y-5">
              {data.workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                      <p className="text-xs text-gray-400">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0 ml-2">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                  </div>
                  {exp.metrics && (
                    <div className="mt-2 text-xs text-gray-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: exp.metrics }} />
                  )}
                  <ul className="mt-2 space-y-0.5">
                    {exp.description.filter(Boolean).map((d, i) => (
                      <li key={i} className="text-xs text-gray-600 flex gap-2">
                        <span className="text-gray-300 mt-0.5 shrink-0 select-none">-</span>
                        <span dangerouslySetInnerHTML={{ __html: d }} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects / Engagements */}
        {data.projects.length > 0 && (
          <div className="mb-7">
            <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">{lang === 'zh' ? '项目经历' : 'Engagements'}</h2>
            <div className="space-y-4">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-sm text-gray-900">{proj.name}</h3>
                    <span className="text-xs text-gray-400">{proj.startDate} — {proj.endDate}</span>
                  </div>
                  {proj.role && <p className="text-xs text-gray-500">{proj.role}</p>}
                  {proj.description && (
                    <div className="text-xs text-gray-600 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: proj.description }} />
                  )}
                  {proj.techStack.length > 0 && (
                    <p className="text-xs text-gray-400 mt-1">{proj.techStack.join(' / ')}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-7">
            <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">{T.education}</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-semibold text-xs text-gray-900">{edu.school}</h3>
                <p className="text-xs text-gray-500">{edu.degree}{edu.major ? `, ${edu.major}` : ''}</p>
                <p className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</p>
                {edu.gpa && <p className="text-xs text-gray-400">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Skills, certifications, languages — compact grid */}
        <div className="grid grid-cols-3 gap-6">
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">{T.skills}</h2>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((s, i) => (
                  <span key={i} className="text-xs text-gray-600">{s}{i < data.skills.length - 1 ? ',' : ''}</span>
                ))}
              </div>
            </div>
          )}
          {data.certifications.length > 0 && (
            <div>
              <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">{T.certs}</h2>
              {data.certifications.map((cert) => (
                <p key={cert.id} className="text-xs text-gray-600 mb-0.5">{cert.name}</p>
              ))}
            </div>
          )}
          {data.languages.length > 0 && (
            <div>
              <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">{T.languages}</h2>
              {data.languages.map((l) => (
                <p key={l.id} className="text-xs text-gray-600 mb-0.5"><span className="font-medium">{l.name}</span>{l.proficiency ? ` / ${proficiencyDisplay(l.proficiency, lang)}` : ''}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
