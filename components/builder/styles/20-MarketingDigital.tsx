import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { proficiencyDisplay } from '@/lib/display'
import CustomFields from './CustomFields'

export default function MarketingDigital({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto">
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-7 text-white">
        <h1 className="text-2xl font-bold">{p.name || 'Your Name'}</h1>
        <p className="text-sm text-pink-100 mt-1">{p.title}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-pink-200 mt-3">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.website && <span>{p.website}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
        </div>
        <CustomFields fields={p.customFields || []} />
      </div>

      <div className="p-8 space-y-6">
        {data.advantages && (
          <div>
            <h2 className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">{T.strengths}</h2>
            <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
          </div>
        )}

        {data.workExperience.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-3">{lang === 'zh' ? '营销战役成果' : 'Campaign Results'}</h2>
            {data.workExperience.map((exp) => (
              <div key={exp.id} className="mb-4 pb-4 border-b border-pink-100 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                  <span className="text-xs text-gray-400">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                </div>
                <p className="text-xs text-pink-600 font-medium">{exp.company}</p>
                {exp.metrics && (
                  <div className="mt-1 text-xs text-purple-700 font-medium" dangerouslySetInnerHTML={{ __html: exp.metrics }} />
                )}
                <ul className="mt-1.5 space-y-0.5">
                  {exp.description.filter(Boolean).map((d, i) => (
                    <li key={i} className="text-xs text-gray-600 flex gap-1.5"><span className="text-pink-300 mt-0.5 shrink-0">&#x2666;</span><span dangerouslySetInnerHTML={{ __html: d }} /></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">{lang === 'zh' ? '工具栈' : 'Tool Stack'}</h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((s, i) => (
                <span key={i} className="text-xs bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 px-3 py-1 rounded-full">{s}</span>
              ))}
            </div>
          </div>
        )}

        {data.projects.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">{T.projects}</h2>
            <div className="grid grid-cols-2 gap-3">
              {data.projects.map((proj) => (
                <div key={proj.id} className="border border-pink-100 rounded-lg p-3">
                  <h3 className="font-semibold text-sm text-gray-900">{proj.name}</h3>
                  <p className="text-xs text-gray-500">{proj.role}</p>
                  {proj.description && <p className="text-xs text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: proj.description }} />}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">{T.education}</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <h3 className="font-semibold text-sm text-gray-900">{edu.school}</h3>
                <p className="text-xs text-gray-500">{edu.degree}{edu.major ? ` — ${edu.major}` : ''}</p>
                <p className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
