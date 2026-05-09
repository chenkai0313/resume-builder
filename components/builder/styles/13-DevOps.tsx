import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { proficiencyDisplay } from '@/lib/display'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function DevOps({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto">
      <div className="bg-green-900 text-white px-8 pt-8 pb-5">
        <div className="flex items-start gap-4 mb-3">
          <ResumeAvatar src={p.avatar} size={56} className="mt-1 ring-2 ring-green-400" />
          <div className="min-w-0">
            <h1 className="text-2xl font-bold">{p.name || 'Your Name'}</h1>
            <p className="text-sm text-green-300 mt-1">{p.title}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-green-200 font-mono border-t border-green-700 pt-3">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.github && <span>{p.github}</span>}
          {p.website && <span>{p.website}</span>}
        </div>
        <CustomFields fields={p.customFields || []} />
      </div>

      <div className="px-8 py-6 space-y-6">
        {data.advantages && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-green-700 mb-2">{T.strengths}</h2>
            <div className="text-sm text-gray-600 leading-relaxed font-mono" dangerouslySetInnerHTML={{ __html: data.advantages }} />
          </div>
        )}

        {data.projects.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-green-700 mb-3 border-b border-green-200 pb-1">{T.projects}</h2>
            {data.projects.map((proj) => (
              <div key={proj.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-gray-900">{proj.name}</h3>
                  <span className="text-[10px] text-gray-400">{proj.startDate} — {proj.endDate}</span>
                </div>
                <p className="text-xs text-gray-500">{proj.role}</p>
                {proj.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {proj.techStack.filter(Boolean).map((t, i) => (
                      <span key={i} className="text-[10px] font-mono bg-green-50 text-green-700 px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                )}
                {proj.description && (
                  <div className="text-xs text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: proj.description }} />
                )}
              </div>
            ))}
          </div>
        )}

        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-green-700 mb-2">{T.skills}</h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((s, i) => (
                <span key={i} className="text-xs font-mono bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-200">{s}</span>
              ))}
            </div>
          </div>
        )}

        {data.workExperience.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-green-700 mb-3 border-b border-green-200 pb-1">{T.experience}</h2>
            {data.workExperience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-[10px] text-gray-400">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                </div>
                <p className="text-xs text-green-700 mb-1">{exp.company}</p>
                <ul className="space-y-0.5">
                  {exp.description.filter(Boolean).map((d, i) => (
                    <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                      <span className="text-green-400 mt-0.5 shrink-0 font-mono">&gt;</span>
                      <span dangerouslySetInnerHTML={{ __html: d }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {data.education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-green-700 mb-3 border-b border-green-200 pb-1">{T.education}</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <h3 className="text-sm font-bold text-gray-900">{edu.school}</h3>
                <p className="text-xs text-gray-600">{edu.degree} in {edu.major}</p>
                <p className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-green-700 mb-2">{T.certifications}</h2>
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between text-xs text-gray-600 py-0.5">
                <span>{cert.name}</span>
                <span className="text-gray-400">{cert.date}</span>
              </div>
            ))}
          </div>
        )}

        {data.languages.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-green-700 mb-2">{T.languages}</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
              {data.languages.map((l) => (
                <span key={l.id}><span className="font-medium">{l.name}</span> ({proficiencyDisplay(l.proficiency, lang)})</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
