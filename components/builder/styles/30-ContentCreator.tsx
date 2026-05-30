import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function ContentCreator({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto">
      {/* Clean header with amber accent */}
      <div className="px-8 pt-8 pb-6 border-b border-amber-200">
        <div className="flex items-center gap-5">
          <ResumeAvatar src={p.avatar} size={60} className="shrink-0 ring-2 ring-amber-300/50 rounded-full" />
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-gray-900">{p.name || 'Your Name'}</h1>
            <p className="text-sm text-amber-600 font-medium mt-0.5">{p.title}</p>
            {/* Contact info compact and clean */}
            {p.email || p.phone || p.website || p.linkedin ? (
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-400 mt-2">
                {p.email && <span>{p.email}</span>}
                {p.phone && <span>{p.phone}</span>}
                {p.website && <span>{p.website}</span>}
                {p.linkedin && <span>{p.linkedin}</span>}
              </div>
            ) : null}
            <CustomFields fields={p.customFields || []} />
          </div>
        </div>
      </div>

      <div className="p-8 space-y-7">
        {/* About / Summary */}
        {data.advantages && (
          <div>
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">{lang === 'zh' ? '关于我' : 'About Me'}</h2>
            <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
          </div>
        )}

        {/* Experience */}
        {data.workExperience.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">{T.experience}</h2>
            <div className="space-y-5">
              {data.workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                    <span className="text-xs text-gray-400 shrink-0 ml-2">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                  </div>
                  <p className="text-xs text-amber-600 font-medium">{exp.company}</p>
                  {exp.metrics && (
                    <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded inline-block mt-1">{exp.metrics}</span>
                  )}
                  {exp.description.filter(Boolean).length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {exp.description.filter(Boolean).map((d, i) => (
                        <li key={i} className="text-xs text-gray-500 flex gap-2">
                          <span className="inline-block w-1 h-1 rounded-full bg-amber-300 mt-[6px] shrink-0" />
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

        {/* Skills as rounded pill badges */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">{T.skills}</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <span key={i} className="text-xs px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Content Portfolio / Projects */}
        {data.projects.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">{lang === 'zh' ? '内容作品' : 'Content Portfolio'}</h2>
            <div className="space-y-4">
              {data.projects.map((proj) => (
                <div key={proj.id} className="border border-gray-100 rounded-lg p-4 hover:border-amber-200 transition-colors">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-sm text-gray-900">
                      {proj.url ? (
                        <a href={proj.url} className="text-amber-700 hover:underline" target="_blank" rel="noreferrer">{proj.name}</a>
                      ) : proj.name}
                    </h3>
                    {proj.role && <span className="text-xs text-gray-400 shrink-0 ml-2">{proj.role}</span>}
                  </div>
                  {proj.techStack.filter(Boolean).length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {proj.techStack.filter(Boolean).map((t, i) => (
                        <span key={i} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  )}
                  {proj.description && (
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: proj.description }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">{T.education}</h2>
            <div className="space-y-2">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-semibold text-sm text-gray-900">{edu.school}</h3>
                  <p className="text-xs text-gray-500">{edu.degree}{edu.major ? ` — ${edu.major}` : ''}</p>
                  <p className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">{T.certifications}</h2>
            <div className="space-y-1">
              {data.certifications.map((cert) => (
                <p key={cert.id} className="text-xs text-gray-500">{cert.name}{cert.date ? <span className="text-gray-300"> ({cert.date})</span> : ''}</p>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">{T.languages}</h2>
            <div className="flex flex-wrap gap-2">
              {data.languages.map((langItem) => (
                <span key={langItem.id} className="text-xs px-3 py-1 rounded-full bg-gray-50 text-gray-600 border border-gray-200">
                  {langItem.name}{langItem.proficiency ? ` — ${langItem.proficiency}` : ''}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
