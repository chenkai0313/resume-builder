import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'

export default function Timeline({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans p-8 max-w-[210mm] mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{p.name || 'Your Name'}</h1>
        <p className="text-gray-500">{p.title}</p>
        <p className="text-sm text-gray-400">{p.email}{p.phone && ` | ${p.phone}`}</p>
      </div>

      {data.advantages && (
        <div className="mb-6 text-center">
          <div className="text-sm text-gray-600 italic max-w-xl mx-auto" dangerouslySetInnerHTML={{ __html: data.advantages }} />
        </div>
      )}

      {data.workExperience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider text-center mb-6">{T.experience}</h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px h-full w-0.5 bg-blue-200" />
            {data.workExperience.map((exp, idx) => (
              <div key={exp.id} className={`relative flex items-start mb-6 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-5/12" />
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow mt-1 z-10" />
                <div className={`w-5/12 ${idx % 2 === 0 ? 'pr-6 text-right' : 'pl-6'}`}>
                  <span className="text-xs text-blue-500 font-medium">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                  <h3 className="font-semibold text-sm text-gray-900 mt-1">{exp.position}</h3>
                  <p className="text-xs text-gray-500">{exp.company}</p>
                  <ul className={`mt-2 space-y-1 ${idx % 2 === 0 ? 'text-right' : ''}`}>
                    {exp.description.filter(Boolean).map((d, i) => (
                      <li key={i} className="text-xs text-gray-600" dangerouslySetInnerHTML={{ __html: d }} />
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 text-center">{T.education}</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3 border-l-2 border-blue-200 pl-3">
                <p className="text-xs text-blue-500">{edu.startDate} — {edu.endDate}</p>
                <h3 className="font-semibold text-sm text-gray-900">{edu.school}</h3>
                <p className="text-xs text-gray-600">{edu.major}{edu.degree && ` — ${edu.degree}`}</p>
              </div>
            ))}
          </div>
        )}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 text-center">{T.skills}</h2>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((s, i) => (
                <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {data.projects.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 text-center">{T.projects}</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map((proj) => (
              <div key={proj.id} className="border border-gray-100 rounded p-3">
                <h3 className="font-semibold text-sm text-gray-900">{proj.name}</h3>
                <p className="text-xs text-gray-500">{proj.techStack.filter(Boolean).join(' · ')}</p>
                {proj.description && <p className="text-xs text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: proj.description }} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
