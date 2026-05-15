import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function ExecutiveLeadership({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto">
      <div className="bg-blue-900 px-8 py-7">
        <div className="flex items-start gap-5">
          <ResumeAvatar src={p.avatar} size={72} className="ring-2 ring-amber-400/40 shrink-0" />
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-amber-400">{p.name || 'Your Name'}</h1>
            <div className="h-0.5 w-16 bg-amber-500 mt-2 mb-2" />
            <p className="text-white text-sm font-medium">{p.title}</p>
            <div className="flex flex-wrap gap-x-5 text-xs text-blue-200 mt-3">
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>{p.phone}</span>}
              {p.linkedin && <span>{p.linkedin}</span>}
            </div>
            <CustomFields fields={p.customFields || []} />
          </div>
        </div>
      </div>

      <div className="p-8">
        {data.advantages && (
          <div className="mb-7">
            <h2 className="text-[10px] font-bold text-blue-900 uppercase tracking-[0.15em] mb-3 pl-3 border-l-4 border-amber-500">{T.executiveProfile}</h2>
            <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
          </div>
        )}

        {data.workExperience.length > 0 && (
          <div className="mb-7">
            <h2 className="text-[10px] font-bold text-blue-900 uppercase tracking-[0.15em] mb-4 pl-3 border-l-4 border-amber-500">{T.careerHistory}</h2>
            {data.workExperience.map((exp) => (
              <div key={exp.id} className="mb-5">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">{exp.position}</h3>
                    <p className="text-xs text-amber-700 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0 ml-2">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                </div>
                <ul className="mt-2 space-y-1">
                  {exp.description.filter(Boolean).map((d, i) => (
                    <li key={i} className="text-xs text-gray-600 flex gap-2"><span className="text-amber-500 mt-0.5 shrink-0">—</span><span dangerouslySetInnerHTML={{ __html: d }} /></li>
                  ))}
                </ul>
                {exp.metrics && (
                  <div className="mt-2 bg-amber-50 border-l-2 border-amber-400 px-3 py-2 text-xs text-amber-900 leading-relaxed" dangerouslySetInnerHTML={{ __html: exp.metrics }} />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          {data.education.length > 0 && (
            <div>
              <h2 className="text-[10px] font-bold text-blue-900 uppercase tracking-[0.15em] mb-3 pl-3 border-l-4 border-amber-500">{T.education}</h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <h3 className="font-bold text-xs text-gray-900">{edu.school}</h3>
                  <p className="text-xs text-gray-500">{edu.degree}{lang === 'zh' ? ' ' : ' in '}{edu.major}</p>
                  <p className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-[10px] font-bold text-blue-900 uppercase tracking-[0.15em] mb-3 pl-3 border-l-4 border-amber-500">{T.coreCompetencies}</h2>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {data.skills.map((s, i) => (
                  <span key={i} className="text-xs bg-amber-50 text-amber-800 px-2.5 py-1">{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {data.certifications.length > 0 && (
          <div className="mt-7">
            <h2 className="text-[10px] font-bold text-blue-900 uppercase tracking-[0.15em] mb-3 pl-3 border-l-4 border-amber-500">{T.certs}</h2>
            {data.certifications.map((cert) => (
              <p key={cert.id} className="text-xs text-gray-600 mb-1">{cert.name}{cert.date && ` (${cert.date})`}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
