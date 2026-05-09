import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function Freelancer({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  const borderColors = ['border-blue-400', 'border-green-400', 'border-orange-400', 'border-purple-400']
  const tagColors = ['bg-blue-50 text-blue-700', 'bg-green-50 text-green-700', 'bg-orange-50 text-orange-700', 'bg-purple-50 text-purple-700']
  const dotColors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500']

  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto p-8">
      {/* Header */}
      <div className="mb-4 flex items-start gap-4">
        <ResumeAvatar src={p.avatar} size={56} className="mt-1 shrink-0" />
        <div className="min-w-0">
          <h1 className="text-3xl font-bold text-gray-900">{p.name || 'Your Name'}</h1>
          <p className="text-sm text-gray-500 mt-1">{p.title}</p>
        </div>
      </div>

      {/* Colorful accent blocks */}
      <div className="flex gap-1 mb-4">
        <div className="w-3 h-3 bg-blue-400" />
        <div className="w-3 h-3 bg-green-400" />
        <div className="w-3 h-3 bg-orange-400" />
        <div className="w-3 h-3 bg-purple-400" />
        <div className="w-3 h-3 bg-pink-400" />
        <div className="w-3 h-3 bg-teal-400" />
      </div>

      {/* Contact */}
      <div className="flex flex-wrap gap-x-4 text-xs text-gray-500 mb-6">
        {p.email && <span>{p.email}</span>}
        {p.phone && <span>{p.phone}</span>}
        {p.website && <span>{p.website}</span>}
        {p.linkedin && <span>{p.linkedin}</span>}
        {p.github && <span>{p.github}</span>}
      </div>

      <CustomFields fields={p.customFields || []} />

      {/* Client Cases = workExperience */}
      {data.workExperience.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2.5 h-2.5 rounded-full ${dotColors[0]}`} />
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">{lang === 'zh' ? '客户案例' : 'Client Cases'}</h2>
          </div>
          <div className="space-y-4">
            {data.workExperience.map((exp, idx) => (
              <div key={exp.id} className={`pl-3 border-l-2 ${borderColors[idx % borderColors.length]}`}>
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                  <span className="text-xs text-gray-400 shrink-0 ml-2">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                </div>
                <p className="text-xs text-gray-500 mb-1">{exp.company}</p>
                {exp.metrics && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded inline-block mb-1">{exp.metrics}</span>}
                {exp.description.filter(Boolean).length > 0 && (
                  <ul className="space-y-0.5">
                    {exp.description.filter(Boolean).map((d, i) => (
                      <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 bg-gray-300 mt-[6px] shrink-0" />
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

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2.5 h-2.5 rounded-full ${dotColors[1]}`} />
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">{T.skills}</h2>
          </div>
          <div className="flex flex-wrap gap-1">
            {data.skills.map((s, i) => (
              <span key={i} className={`text-xs px-2 py-0.5 rounded ${tagColors[i % tagColors.length]}`}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Projects / Portfolio */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2.5 h-2.5 rounded-full ${dotColors[2]}`} />
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">{T.projects}</h2>
          </div>
          <div className="space-y-2">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-semibold text-sm text-gray-900">{proj.name} <span className="text-xs text-gray-400 font-normal">{proj.role}</span></h3>
                {proj.description && <p className="text-xs text-gray-600" dangerouslySetInnerHTML={{ __html: proj.description }} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials = advantages */}
      {data.advantages && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2.5 h-2.5 rounded-full ${dotColors[3]}`} />
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">{lang === 'zh' ? '客户评价' : 'Testimonials'}</h2>
          </div>
          <div className="bg-orange-50 border-l-4 border-orange-300 p-3 text-sm text-gray-700 italic leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
        </div>
      )}
    </div>
  )
}
