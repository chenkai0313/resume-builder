import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'

export default function Minimal({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans p-10 max-w-[210mm] mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-light text-gray-900">{p.name || 'Your Name'}</h1>
        <p className="text-sm text-gray-400 mt-2">{[p.email, p.phone, p.title].filter(Boolean).join(' / ')}</p>
      </div>

      {data.advantages && (
        <div className="text-sm text-gray-500 mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
      )}

      {data.workExperience.length > 0 && (
        <div className="mb-6">
          {data.workExperience.map((exp, i) => (
            <div key={exp.id} className={`${i > 0 ? 'mt-4 pt-4 border-t border-gray-100' : ''}`}>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{exp.startDate} — {exp.current ? T.present : exp.endDate}</p>
              <h3 className="font-medium text-gray-900">{exp.position}</h3>
              <p className="text-sm text-gray-500 mb-2">{exp.company}</p>
              <ul className="space-y-1">
                {exp.description.filter(Boolean).map((d, i) => (
                  <li key={i} className="text-sm text-gray-500 pl-4 border-l-2 border-gray-200" dangerouslySetInnerHTML={{ __html: d }} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-3">{T.education}</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <p className="text-sm font-medium text-gray-900">{edu.school}</p>
              <p className="text-sm text-gray-500">{edu.major}{edu.degree && ` — ${edu.degree}`}</p>
              <p className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</p>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-3">{T.skills}</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s, i) => (
              <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{s}</span>
            ))}
          </div>
        </div>
      )}

      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-3">{T.projects}</h2>
          {data.projects.map((proj) => (
            <div key={proj.id} className="mb-3">
              <p className="text-sm font-medium text-gray-900">{proj.name}</p>
              {proj.techStack.filter(Boolean).length > 0 && <p className="text-xs text-gray-400">{proj.techStack.filter(Boolean).join(' · ')}</p>}
              {proj.description && <p className="text-sm text-gray-500 mt-1" dangerouslySetInnerHTML={{ __html: proj.description }} />}
            </div>
          ))}
        </div>
      )}

      {data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-3">{T.certifications}</h2>
          {data.certifications.map((cert) => (
            <p key={cert.id} className="text-sm text-gray-600">{cert.name}{cert.date && ` (${cert.date})`}</p>
          ))}
        </div>
      )}
    </div>
  )
}
