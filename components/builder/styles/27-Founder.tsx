import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { employmentStatusDisplay, salaryDisplay, workModeDisplay, proficiencyDisplay } from '@/lib/display'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function Founder({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto">
      {/* Bold header with emerald accent */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-600 px-8 py-7">
        <div className="flex items-start gap-5">
          <ResumeAvatar src={p.avatar} size={68} className="ring-2 ring-emerald-300/40 shrink-0" />
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">{p.name || 'Your Name'}</h1>
            <p className="text-emerald-100 text-sm font-medium mt-1">{p.title}</p>
            <div className="flex flex-wrap gap-x-5 text-xs text-emerald-200 mt-3">
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>{p.phone}</span>}
              {p.website && <span>{p.website}</span>}
              {p.linkedin && <span>{p.linkedin}</span>}
            </div>
            {(p.employmentStatus || p.salaryExpectation || p.workMode) && (
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-emerald-200 mt-1">
                {p.employmentStatus && <span>{employmentStatusDisplay(p.employmentStatus, lang)}</span>}
                {p.salaryExpectation && <span>{salaryDisplay(p.salaryExpectation, lang)}</span>}
                {p.workMode && <span>{workModeDisplay(p.workMode, lang)}</span>}
              </div>
            )}
            <CustomFields fields={p.customFields || []} />
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Founder Profile */}
        {data.advantages && (
          <div className="mb-6">
            <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3">{lang === 'zh' ? '创始人简介' : 'Founder Profile'}</h2>
            <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
          </div>
        )}

        {/* Work Experience — company name bold, position secondary */}
        {data.workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3">{T.experience}</h2>
            <div className="space-y-5">
              {data.workExperience.map((exp) => (
                <div key={exp.id} className="border-l-3 border-emerald-500 pl-4">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="font-bold text-sm text-gray-900">{exp.company}</h3>
                      <p className="text-xs text-emerald-700 font-medium">{exp.position}</p>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0 ml-2">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                  </div>
                  {exp.metrics && (
                    <div className="mt-1.5 text-xs text-emerald-600 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: exp.metrics }} />
                  )}
                  <ul className="mt-1.5 space-y-0.5">
                    {exp.description.filter(Boolean).map((d, i) => (
                      <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                        <span className="text-emerald-500 mt-0.5 shrink-0">&#9656;</span>
                        <span dangerouslySetInnerHTML={{ __html: d }} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects — prominent for company/project building */}
        {data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3">{T.keyProjects}</h2>
            <div className="space-y-4">
              {data.projects.map((proj) => (
                <div key={proj.id} className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-sm text-gray-900">{proj.name}</h3>
                    <span className="text-xs text-gray-400">{proj.startDate} — {proj.endDate}</span>
                  </div>
                  {proj.role && <p className="text-xs text-emerald-700 font-medium mt-0.5">{proj.role}</p>}
                  {proj.description && (
                    <div className="text-xs text-gray-600 mt-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: proj.description }} />
                  )}
                  {proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {proj.techStack.map((t, i) => (
                        <span key={i} className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  )}
                  {proj.url && (
                    <a href={proj.url} className="text-xs text-emerald-600 mt-1 inline-block hover:underline" target="_blank" rel="noopener noreferrer">{proj.url}</a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills — inline tags with colored backgrounds */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3">{T.skills}</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <span key={i} className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Education + bottom sections */}
        <div className="grid grid-cols-2 gap-6">
          {data.education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3">{T.education}</h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <h3 className="font-bold text-xs text-gray-900">{edu.school}</h3>
                  <p className="text-xs text-gray-500">{edu.degree}{edu.major ? ` — ${edu.major}` : ''}</p>
                  <p className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
          <div className="space-y-4">
            {data.certifications.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">{T.certs}</h2>
                {data.certifications.map((cert) => (
                  <p key={cert.id} className="text-xs text-gray-600 mb-1">{cert.name}{cert.date && <span className="text-gray-400"> ({cert.date})</span>}</p>
                ))}
              </div>
            )}
            {data.languages.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">{T.languages}</h2>
                <div className="flex flex-wrap gap-x-3 text-xs text-gray-600">
                  {data.languages.map((l) => (
                    <span key={l.id} className="bg-gray-50 px-2 py-0.5">{l.name}{l.proficiency ? ` (${proficiencyDisplay(l.proficiency, lang)})` : ''}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
