import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { proficiencyDisplay } from '@/lib/display'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function DataScientist({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto p-8">
      <div className="flex items-start gap-4 mb-6">
        <ResumeAvatar src={p.avatar} size={64} className="mt-1 ring-2 ring-blue-300" />
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-900">{p.name || 'Your Name'}</h1>
          <p className="text-base text-blue-600 mt-0.5">{p.title}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-2">
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>{p.phone}</span>}
            {p.github && <span className="font-mono text-blue-600">{p.github}</span>}
          </div>
          <CustomFields fields={p.customFields || []} />
        </div>
      </div>

      {data.advantages && (
        <div className="mb-5 border-2 border-dashed border-blue-200 rounded-lg p-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">{T.strengths}</h2>
          <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
        </div>
      )}

      {data.projects.length > 0 && (
        <div className="mb-5 border-2 border-dashed border-blue-200 rounded-lg p-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-3">{T.projects}</h2>
          {data.projects.map((proj) => (
            <div key={proj.id} className="mb-3 last:mb-0">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-gray-900">{proj.name}</h3>
                <span className="text-[10px] text-gray-400">{proj.startDate} — {proj.endDate}</span>
              </div>
              <p className="text-xs text-gray-500">{proj.role}</p>
              {proj.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {proj.techStack.filter(Boolean).map((t, i) => (
                    <span key={i} className="text-[10px] font-mono bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">{t}</span>
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
        <div className="mb-5 border-2 border-dashed border-blue-200 rounded-lg p-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">{T.skills}</h2>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((s, i) => (
              <span key={i} className="text-xs font-mono bg-blue-50 text-blue-800 px-2 py-0.5 rounded">{s}</span>
            ))}
          </div>
        </div>
      )}

      {data.workExperience.length > 0 && (
        <div className="mb-5 border-2 border-dashed border-blue-200 rounded-lg p-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-3">{T.experience}</h2>
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="mb-4 last:mb-0">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-gray-900">{exp.position}</h3>
                <span className="text-[10px] text-gray-400">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
              </div>
              <p className="text-xs text-gray-500 mb-1">{exp.company}</p>
              <ul className="space-y-0.5">
                {exp.description.filter(Boolean).map((d, i) => (
                  <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                    <span className="text-blue-300 mt-0.5 shrink-0">&#x2022;</span>
                    <span dangerouslySetInnerHTML={{ __html: d }} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-5 border-2 border-dashed border-blue-200 rounded-lg p-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-3">{T.education}</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2 last:mb-0">
              <h3 className="text-sm font-bold text-gray-900">{edu.school}</h3>
              <p className="text-xs text-gray-600">{edu.degree} in {edu.major}</p>
              <p className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</p>
              {edu.gpa && <p className="text-xs text-blue-600 font-mono">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {data.certifications.length > 0 && (
        <div className="mb-5 border-2 border-dashed border-blue-200 rounded-lg p-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">{T.certifications}</h2>
          {data.certifications.map((cert) => (
            <div key={cert.id} className="flex justify-between text-xs text-gray-600 py-0.5">
              <span>{cert.name}</span>
              <span className="text-gray-400">{cert.date}</span>
            </div>
          ))}
        </div>
      )}

      {data.languages.length > 0 && (
        <div className="border-2 border-dashed border-blue-200 rounded-lg p-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">{T.languages}</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
            {data.languages.map((l) => (
              <span key={l.id}><span className="font-medium">{l.name}</span> ({proficiencyDisplay(l.proficiency, lang)})</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
