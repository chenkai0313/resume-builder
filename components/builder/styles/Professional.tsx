import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { proficiencyDisplay } from '@/lib/display'

export default function Professional({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto">
      <div className="bg-slate-800 text-white px-8 py-6">
        <h1 className="text-2xl font-bold">{p.name || 'Your Name'}</h1>
        <p className="text-blue-300 text-sm mt-1">{p.title}</p>
        <div className="flex flex-wrap gap-x-6 text-xs text-gray-300 mt-3">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.website && <span>{p.website}</span>}
        </div>
      </div>

      <div className="p-8">
        {data.advantages && (
          <div className="mb-6">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">{T.strengths}</h2>
            <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
          </div>
        )}

        {data.workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">{T.experience}</h2>
            {data.workExperience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                  <span className="text-xs text-gray-400">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                </div>
                <p className="text-xs text-blue-700 mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.filter(Boolean).map((d, i) => (
                    <li key={i} className="text-xs text-gray-600 flex gap-2"><span className="text-blue-600 mt-0.5">▸</span><span dangerouslySetInnerHTML={{ __html: d }} /></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {data.education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">{T.education}</h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <h3 className="font-semibold text-xs text-gray-900">{edu.school}</h3>
                  <p className="text-xs text-gray-600">{edu.major}{edu.degree && ` — ${edu.degree}`}</p>
                  <p className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">{T.skills}</h2>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((s, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5">{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {data.projects.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">{T.projects}</h2>
            {data.projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <h3 className="font-semibold text-xs text-gray-900">{proj.name}</h3>
                <p className="text-xs text-gray-500">{proj.role && `${proj.role} | `}{proj.techStack.filter(Boolean).join(', ')}</p>
                {proj.description && <p className="text-xs text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: proj.description }} />}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-6 mt-6">
          {data.certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">{T.certifications}</h2>
              {data.certifications.map((cert) => (
                <p key={cert.id} className="text-xs text-gray-600 mb-1">{cert.name}{cert.date && ` (${cert.date})`}</p>
              ))}
            </div>
          )}
          {data.languages.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">{T.languages}</h2>
              {data.languages.map((l) => (
                <p key={l.id} className="text-xs text-gray-600 mb-1"><strong>{l.name}</strong>{l.proficiency && `: ${proficiencyDisplay(l.proficiency, lang)}`}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
