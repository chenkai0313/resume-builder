import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { employmentStatusDisplay, salaryDisplay, workModeDisplay, proficiencyDisplay } from '@/lib/display'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function TechStack({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans p-8 max-w-[210mm] mx-auto">
      <div className="mb-6 pb-4 border-b-2 border-blue-400 border-dashed">
        <div className="flex items-start gap-4">
          <ResumeAvatar src={p.avatar} size={52} className="mt-0.5" />
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-blue-700">{p.name || 'Your Name'}</h1>
            <p className="text-sm text-blue-500 font-mono mt-0.5">{p.title}</p>
            <div className="flex flex-wrap gap-x-4 text-xs text-gray-500 mt-1.5 font-mono">
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>{p.phone}</span>}
              {p.website && <span>{p.website}</span>}
            </div>
            {(p.github || p.linkedin) && (
              <div className="flex flex-wrap gap-x-4 text-xs text-gray-400 mt-0.5 font-mono">
                {p.github && <span>{p.github}</span>}
                {p.linkedin && <span>{p.linkedin}</span>}
              </div>
            )}
            {(p.employmentStatus || p.salaryExpectation || p.workMode) && (
              <div className="flex flex-wrap gap-x-3 text-xs text-gray-400 mt-0.5 font-mono">
                {p.employmentStatus && <span>{employmentStatusDisplay(p.employmentStatus, lang)}</span>}
                {p.salaryExpectation && <span>{salaryDisplay(p.salaryExpectation, lang)}</span>}
                {p.workMode && <span>{workModeDisplay(p.workMode, lang)}</span>}
              </div>
            )}
            <CustomFields fields={p.customFields || []} />
          </div>
        </div>
      </div>

      {data.advantages && (
        <div className="mb-5 pl-3 border-l-2 border-blue-400 border-dashed">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1.5">{T.keyStrengths}</h2>
          <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">{T.skills}</h2>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((s, i) => (
              <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200 font-mono">{s}</span>
            ))}
          </div>
        </div>
      )}

      {data.projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">{T.projects}</h2>
          {data.projects.map((proj, i) => (
            <div key={proj.id} className={`${i > 0 ? 'mt-3 pt-3 border-t border-blue-100 border-dashed' : ''}`}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm text-gray-900">{proj.name}</h3>
                <span className="text-xs text-gray-500 font-mono">{proj.startDate} — {proj.endDate}</span>
              </div>
              <p className="text-xs text-blue-500 font-mono mt-0.5">{proj.role}</p>
              {proj.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {proj.techStack.filter(Boolean).map((t, j) => (
                    <span key={j} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-mono">{t}</span>
                  ))}
                </div>
              )}
              {proj.description && (
                <div className="text-sm text-gray-600 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: proj.description }} />
              )}
            </div>
          ))}
        </div>
      )}

      {data.workExperience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">{T.experience}</h2>
          {data.workExperience.map((exp, i) => (
            <div key={exp.id} className={`${i > 0 ? 'mt-3 pt-3 border-t border-blue-100 border-dashed' : ''} pl-3 border-l-2 border-blue-400 border-dashed`}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                <span className="text-xs text-gray-500 font-mono">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
              </div>
              <p className="text-xs text-blue-600 font-mono mt-0.5">{exp.company}</p>
              <ul className="space-y-0.5 mt-1">
                {exp.description.filter(Boolean).map((d, j) => (
                  <li key={j} className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: d }} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">{T.education}</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2 pl-3 border-l-2 border-blue-400 border-dashed">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm text-gray-900">{edu.school}</h3>
                <span className="text-xs text-gray-500 font-mono">{edu.startDate} — {edu.endDate}</span>
              </div>
              <p className="text-sm text-gray-600">{edu.degree}{edu.major ? ` — ${edu.major}` : ''}</p>
            </div>
          ))}
        </div>
      )}

      {data.certifications.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">{T.certifications}</h2>
          {data.certifications.map((cert) => (
            <p key={cert.id} className="text-sm text-gray-600">{cert.name}{cert.date ? ` (${cert.date})` : ''}</p>
          ))}
        </div>
      )}

      {data.languages.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">{T.languages}</h2>
          <p className="text-sm text-gray-600">{data.languages.map(l => `${l.name} (${proficiencyDisplay(l.proficiency, lang)})`).join(' | ')}</p>
        </div>
      )}
    </div>
  )
}
