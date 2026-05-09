import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function CreativeDesigner({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto flex">
      {/* Gradient accent bar on left */}
      <div className="w-2 bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500 shrink-0" />
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-6 flex items-start gap-4">
          <ResumeAvatar src={p.avatar} size={56} className="mt-1 shrink-0" />
          <div className="min-w-0">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">{p.name || 'Your Name'}</h1>
            <p className="text-sm text-gray-500 mt-1">{p.title}</p>
            <div className="flex flex-wrap gap-x-4 text-xs text-gray-400 mt-2">
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>{p.phone}</span>}
              {p.website && <span>{p.website}</span>}
              {p.linkedin && <span>{p.linkedin}</span>}
            </div>
            <CustomFields fields={p.customFields || []} />
          </div>
        </div>

        {/* Portfolio = projects */}
        {data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-pink-600 uppercase tracking-wider mb-3 border-l-4 border-pink-400 pl-2">{lang === 'zh' ? '作品集' : 'Portfolio'}</h2>
            <div className="space-y-3">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="font-semibold text-sm text-gray-900">
                    {proj.url ? (
                      <a href={proj.url} className="text-indigo-600 hover:underline" target="_blank" rel="noreferrer">{proj.name}</a>
                    ) : proj.name}
                    {proj.role && <span className="text-xs text-gray-400 font-normal ml-2">{proj.role}</span>}
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {proj.techStack.filter(Boolean).map((t, i) => (
                      <span key={i} className="text-xs bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                  {proj.description && <p className="text-xs text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: proj.description }} />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-3 border-l-4 border-purple-400 pl-2">{T.skills}</h2>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((s, i) => (
                <span key={i} className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full">{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {data.workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3 border-l-4 border-indigo-400 pl-2">{T.experience}</h2>
            <div className="space-y-4">
              {data.workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                    <span className="text-xs text-gray-400 shrink-0 ml-2">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                  </div>
                  <p className="text-xs text-teal-500 mb-1">{exp.company}</p>
                  {exp.metrics && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded inline-block mb-1">{exp.metrics}</span>}
                  {exp.description.filter(Boolean).length > 0 && (
                    <ul className="space-y-0.5">
                      {exp.description.filter(Boolean).map((d, i) => (
                        <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-300 mt-[6px] shrink-0" />
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

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-3 border-l-4 border-teal-400 pl-2">{T.education}</h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-semibold text-sm text-gray-900">{edu.school}</h3>
                  <p className="text-xs text-gray-500">{edu.major}{edu.degree ? ` — ${edu.degree}` : ''}</p>
                  <p className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-orange-600 uppercase tracking-wider mb-3 border-l-4 border-orange-400 pl-2">{T.certifications}</h2>
            <div className="space-y-1">
              {data.certifications.map((cert) => (
                <p key={cert.id} className="text-xs text-gray-600">{cert.name}{cert.date ? <span className="text-gray-400"> ({cert.date})</span> : ''}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
