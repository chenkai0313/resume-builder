import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'

export default function Executive({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto">
      <div className="bg-slate-900 px-8 py-7">
        <h1 className="text-2xl font-bold text-white">{p.name || 'Your Name'}</h1>
        <p className="text-amber-400 text-sm font-medium mt-1">{p.title}</p>
        <div className="flex flex-wrap gap-x-5 text-xs text-gray-400 mt-3">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
        </div>
        <div className="h-0.5 w-12 bg-amber-500 mt-3" />
      </div>

      <div className="p-8">
        {data.advantages && (
          <div className="mb-6">
            <h2 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-2">{T.executiveProfile}</h2>
            <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
          </div>
        )}

        {data.workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-3 border-b border-gray-200 pb-2">{T.careerHistory}</h2>
            {data.workExperience.map((exp) => (
              <div key={exp.id} className="mb-5">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">{exp.position}</h3>
                    <p className="text-xs text-amber-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-400">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                </div>
                <ul className="mt-2 space-y-1">
                  {exp.description.filter(Boolean).map((d, i) => (
                    <li key={i} className="text-xs text-gray-600 flex gap-2"><span className="text-amber-500 mt-0.5">—</span><span dangerouslySetInnerHTML={{ __html: d }} /></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          {data.education.length > 0 && (
            <div>
              <h2 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-3 border-b border-gray-200 pb-2">{T.education}</h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <h3 className="font-bold text-xs text-gray-900">{edu.school}</h3>
                  <p className="text-xs text-gray-500">{edu.degree} in {edu.major}</p>
                  <p className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-3 border-b border-gray-200 pb-2">{T.coreCompetencies}</h2>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.skills.map((s, i) => (
                  <span key={i} className="text-xs bg-amber-50 text-amber-800 px-2 py-0.5">{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {data.projects.length > 0 && (
          <div className="mt-6">
            <h2 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-3 border-b border-gray-200 pb-2">{T.keyProjects}</h2>
            {data.projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="font-bold text-xs text-gray-900">{proj.name}</h3>
                  <span className="text-xs text-gray-400">{proj.startDate} — {proj.endDate}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5" dangerouslySetInnerHTML={{ __html: proj.description }} />
              </div>
            ))}
          </div>
        )}

        {data.certifications.length > 0 && (
          <div className="mt-4">
            <h2 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-2 border-b border-gray-200 pb-1">{T.certifications}</h2>
            {data.certifications.map((cert) => (
              <p key={cert.id} className="text-xs text-gray-600 mb-1">{cert.name}{cert.date && ` (${cert.date})`}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
