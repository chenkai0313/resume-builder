import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function VisualDesigner({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto">
      {/* Vibrant gradient header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 px-8 pt-8 pb-6 text-white">
        <div className="flex items-start gap-5">
          <ResumeAvatar src={p.avatar} size={64} className="ring-4 ring-white/40 rounded-full shrink-0" />
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold tracking-tight">{p.name || 'Your Name'}</h1>
            <p className="text-sm text-pink-100 mt-0.5 font-medium">{p.title}</p>
            {/* Contact in compact row with separators */}
            {p.email || p.phone || p.website ? (
              <div className="flex flex-wrap items-center gap-x-0 gap-y-1 text-xs text-white/80 mt-2">
                {p.email && <span>{p.email}</span>}
                {p.email && (p.phone || p.website) && <span className="mx-2 text-white/30">|</span>}
                {p.phone && <span>{p.phone}</span>}
                {p.phone && p.website && <span className="mx-2 text-white/30">|</span>}
                {p.website && <span>{p.website}</span>}
                {p.website && p.linkedin && <span className="mx-2 text-white/30">|</span>}
                {p.linkedin && <span>{p.linkedin}</span>}
                {p.linkedin && p.github && <span className="mx-2 text-white/30">|</span>}
                {p.github && <span>{p.github}</span>}
              </div>
            ) : null}
          </div>
        </div>
        <CustomFields fields={p.customFields || []} />
      </div>

      <div className="p-8 space-y-7">
        {/* Advantages / Professional Summary */}
        {data.advantages && (
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
            <h2 className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">{T.strengths}</h2>
            <div className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
          </div>
        )}

        {/* Experience */}
        {data.workExperience.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400" />
              {T.experience}
            </h2>
            <div className="space-y-5">
              {data.workExperience.map((exp) => (
                <div key={exp.id} className="relative pl-5 border-l-2 border-purple-200">
                  <span className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-500" />
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                      <p className="text-xs text-purple-600 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0 ml-2">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                  </div>
                  {exp.metrics && (
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded inline-block mt-1">{exp.metrics}</span>
                  )}
                  {exp.description.filter(Boolean).length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {exp.description.filter(Boolean).map((d, i) => (
                        <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                          <span className="inline-block w-1 h-1 rounded-full bg-pink-300 mt-[6px] shrink-0" />
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

        {/* Skills / Design Tools */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400" />
              {lang === 'zh' ? '设计工具' : 'Design Tools'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => {
                const colors = [
                  'bg-pink-100 text-pink-700',
                  'bg-purple-100 text-purple-700',
                  'bg-indigo-100 text-indigo-700',
                  'bg-orange-100 text-orange-700',
                  'bg-teal-100 text-teal-700',
                ]
                return (
                  <span key={i} className={`text-xs font-medium px-3 py-1.5 rounded-lg ${colors[i % colors.length]}`}>{s}</span>
                )
              })}
            </div>
          </div>
        )}

        {/* Portfolio / Projects */}
        {data.projects.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-400" />
              {lang === 'zh' ? '设计作品' : 'Portfolio'}
            </h2>
            <div className="space-y-4">
              {data.projects.map((proj) => (
                <div key={proj.id} className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-sm text-gray-900">
                      {proj.url ? (
                        <a href={proj.url} className="text-indigo-600 hover:underline" target="_blank" rel="noreferrer">{proj.name}</a>
                      ) : proj.name}
                    </h3>
                    {proj.role && <span className="text-xs text-gray-400 shrink-0 ml-2">{proj.role}</span>}
                  </div>
                  {proj.techStack.filter(Boolean).length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {proj.techStack.filter(Boolean).map((t, i) => (
                        <span key={i} className="text-xs bg-white/80 text-purple-600 px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  )}
                  {proj.description && (
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: proj.description }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-400" />
              {T.education}
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="bg-teal-50 rounded-lg p-3">
                  <h3 className="font-semibold text-sm text-gray-900">{edu.school}</h3>
                  <p className="text-xs text-gray-500">{edu.degree}{edu.major ? ` — ${edu.major}` : ''}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400" />
              {T.certifications}
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.certifications.map((cert) => (
                <span key={cert.id} className="text-xs bg-pink-50 text-pink-700 border border-pink-200 rounded-lg px-3 py-1">
                  {cert.name}{cert.date ? <span className="text-pink-400 ml-1">({cert.date})</span> : ''}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-400" />
              {T.languages}
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.languages.map((langItem) => (
                <span key={langItem.id} className="text-xs bg-orange-50 text-orange-700 border border-orange-200 rounded-lg px-3 py-1">
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
