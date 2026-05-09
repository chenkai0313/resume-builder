import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function SalesBD({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto p-8">
      {/* Header with gradient bottom border */}
      <div className="relative pb-4 mb-6">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500" />
        <div className="flex items-start gap-4">
          <ResumeAvatar src={p.avatar} size={56} className="mt-1 shrink-0" />
          <div className="min-w-0">
            <h1 className="text-3xl font-extrabold text-red-600">{p.name || 'Your Name'}</h1>
            <p className="text-sm text-gray-500 mt-1">{p.title}</p>
            <div className="flex flex-wrap gap-x-4 text-xs text-gray-400 mt-2">
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>{p.phone}</span>}
              {p.linkedin && <span>{p.linkedin}</span>}
            </div>
            <CustomFields fields={p.customFields || []} />
          </div>
        </div>
      </div>

      {/* Sales Performance = workExperience */}
      {data.workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-red-600 uppercase tracking-wider mb-3">{lang === 'zh' ? '销售业绩' : 'Sales Performance'}</h2>
          <div className="space-y-4">
            {data.workExperience.map((exp) => (
              <div key={exp.id} className="bg-orange-50 p-3 rounded border-l-4 border-red-400">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                    <p className="text-xs text-orange-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0 ml-2">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                </div>
                {exp.metrics && (
                  <span className="inline-block text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded mt-2">{exp.metrics}</span>
                )}
                {exp.description.filter(Boolean).length > 0 && (
                  <ul className="space-y-0.5 mt-2">
                    {exp.description.filter(Boolean).map((d, i) => (
                      <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                        <span className="text-red-400 font-bold shrink-0">{'>'}</span>
                        <span dangerouslySetInnerHTML={{ __html: d }} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Clients = projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-3">{lang === 'zh' ? '合作客户' : 'Clients'}</h2>
          <div className="grid grid-cols-2 gap-2">
            {data.projects.map((proj) => (
              <div key={proj.id} className="bg-red-50 p-2 rounded">
                <h3 className="font-semibold text-sm text-gray-900">{proj.name}</h3>
                <p className="text-xs text-gray-500">{proj.role}</p>
                {proj.description && <p className="text-xs text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: proj.description }} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-3">{T.skills}</h2>
          <div className="flex flex-wrap gap-1">
            {data.skills.map((s, i) => (
              <span key={i} className="text-xs bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded">{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Experience = education (condensed under Experience label) */}
      {data.education.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-red-600 uppercase tracking-wider mb-3">{T.experience}</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm text-gray-900">{edu.school}</h3>
                  <p className="text-xs text-gray-500">{edu.major}{edu.degree ? `, ${edu.degree}` : ''}</p>
                  <p className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
