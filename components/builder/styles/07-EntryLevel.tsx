import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { employmentStatusDisplay, salaryDisplay, workModeDisplay, proficiencyDisplay } from '@/lib/display'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function EntryLevel({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans p-8 max-w-[210mm] mx-auto">
      <div className="text-center mb-6 pb-4 border-b-2 border-emerald-400">
        <ResumeAvatar src={p.avatar} size={60} className="mx-auto mb-2" />
        <h1 className="text-2xl font-bold text-emerald-700">{p.name || 'Your Name'}</h1>
        <p className="text-sm text-emerald-500 mt-0.5">{p.title}</p>
        <div className="flex justify-center gap-x-4 text-xs text-gray-500 mt-2">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.website && <span>{p.website}</span>}
        </div>
        {(p.employmentStatus || p.salaryExpectation || p.workMode) && (
          <div className="flex justify-center gap-x-3 text-xs text-gray-400 mt-1">
            {p.employmentStatus && <span>{employmentStatusDisplay(p.employmentStatus, lang)}</span>}
            {p.salaryExpectation && <span>{salaryDisplay(p.salaryExpectation, lang)}</span>}
            {p.workMode && <span>{workModeDisplay(p.workMode, lang)}</span>}
          </div>
        )}
        <CustomFields fields={p.customFields || []} />
      </div>

      {data.education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3">{T.education}</h2>
          <div className="grid grid-cols-2 gap-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="rounded-lg bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-3">
                <h3 className="font-semibold text-sm text-gray-900">{edu.school}</h3>
                <p className="text-xs text-emerald-600 mt-0.5">{edu.degree}{edu.major ? ` — ${edu.major}` : ''}</p>
                <p className="text-[10px] text-gray-400 mt-1">{edu.startDate} — {edu.endDate}</p>
                {edu.gpa && (
                  <p className="text-[10px] text-emerald-500 mt-0.5 font-semibold">GPA: {edu.gpa}</p>
                )}
                {edu.awards && (
                  <p className="text-[10px] text-gray-500 mt-0.5 italic">{edu.awards}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.advantages && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">{T.keyStrengths}</h2>
          <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
        </div>
      )}

      <div className="flex gap-6">
        <div className="w-1/3">
          {data.skills.length > 0 && (
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">{T.skills}</h2>
              <div className="space-y-1.5">
                {data.skills.map((s, i) => (
                  <span key={i} className="block text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md border border-emerald-200">{s}</span>
                ))}
              </div>
            </div>
          )}

          {data.languages.length > 0 && (
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">{T.languages}</h2>
              <div className="space-y-1">
                {data.languages.map((l) => (
                  <p key={l.id} className="text-xs text-gray-600">{l.name}: {proficiencyDisplay(l.proficiency, lang)}</p>
                ))}
              </div>
            </div>
          )}

          {data.certifications.length > 0 && (
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">{T.certifications}</h2>
              {data.certifications.map((cert) => (
                <p key={cert.id} className="text-xs text-gray-600">{cert.name}</p>
              ))}
            </div>
          )}
        </div>

        <div className="w-2/3">
          {data.projects.length > 0 && (
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3">{T.projects}</h2>
              {data.projects.map((proj) => (
                <div key={proj.id} className="rounded-lg bg-white border border-emerald-100 p-3 mb-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-sm text-gray-900">{proj.name}</h3>
                    <span className="text-xs text-gray-400">{proj.startDate} — {proj.endDate}</span>
                  </div>
                  <p className="text-xs text-emerald-500 mt-0.5">{proj.role}</p>
                  {proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {proj.techStack.filter(Boolean).map((t, i) => (
                        <span key={i} className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  )}
                  {proj.description && (
                    <div className="text-xs text-gray-600 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: proj.description }} />
                  )}
                </div>
              ))}
            </div>
          )}

          {data.workExperience.length > 0 && (
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3">{T.experience}</h2>
              {data.workExperience.map((exp) => (
                <div key={exp.id} className="rounded-lg bg-white border border-emerald-100 p-3 mb-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                    <span className="text-xs text-gray-400">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                  </div>
                  <p className="text-xs text-emerald-500 mt-0.5">{exp.company}</p>
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    {exp.description.filter(Boolean).map((d, i) => (
                      <li key={i} className="text-xs text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: d }} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
