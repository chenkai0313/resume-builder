import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { employmentStatusDisplay, salaryDisplay, workModeDisplay, proficiencyDisplay } from '@/lib/display'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function TwoColumn({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto flex">
      <div className="w-[35%] bg-teal-50 p-5 min-h-full">
        <div className="mb-5">
          <ResumeAvatar src={p.avatar} size={64} className="mb-3" />
          <h1 className="text-lg font-bold text-teal-800">{p.name || 'Your Name'}</h1>
          <p className="text-xs text-teal-600 mt-0.5">{p.title}</p>
          <div className="mt-3 space-y-1 text-xs text-gray-600">
            {p.email && <p>{p.email}</p>}
            {p.phone && <p>{p.phone}</p>}
            {p.website && <p className="break-all">{p.website}</p>}
            {p.github && <p>{p.github}</p>}
            {p.linkedin && <p>{p.linkedin}</p>}
          </div>
          {(p.employmentStatus || p.salaryExpectation || p.workMode) && (
            <div className="mt-2 space-y-0.5 text-xs text-gray-500">
              {p.employmentStatus && <p>Status: {employmentStatusDisplay(p.employmentStatus, lang)}</p>}
              {p.salaryExpectation && <p>Salary: {salaryDisplay(p.salaryExpectation, lang)}</p>}
              {p.workMode && <p>Mode: {workModeDisplay(p.workMode, lang)}</p>}
            </div>
          )}
          <CustomFields fields={p.customFields || []} />
        </div>

        {data.skills.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2 border-b border-teal-200 pb-1">{T.skills}</h2>
            <div className="space-y-1">
              {data.skills.map((s, i) => (
                <div key={i} className="text-xs text-gray-600">{s}</div>
              ))}
            </div>
          </div>
        )}

        {data.education.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2 border-b border-teal-200 pb-1">{T.education}</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="text-xs font-semibold text-gray-800">{edu.school}</p>
                <p className="text-xs text-gray-600">{edu.degree}{edu.major ? ` — ${edu.major}` : ''}</p>
                <p className="text-xs text-gray-500">{edu.startDate} — {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {data.languages.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2 border-b border-teal-200 pb-1">{T.languages}</h2>
            <div className="space-y-1">
              {data.languages.map((l) => (
                <p key={l.id} className="text-xs text-gray-600">{l.name} — {proficiencyDisplay(l.proficiency, lang)}</p>
              ))}
            </div>
          </div>
        )}

        {data.certifications.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2 border-b border-teal-200 pb-1">{T.certifications}</h2>
            {data.certifications.map((cert) => (
              <p key={cert.id} className="text-xs text-gray-600">{cert.name}</p>
            ))}
          </div>
        )}
      </div>

      <div className="w-[65%] p-5">
        {data.advantages && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-2 border-l-2 border-teal-400 pl-2">{T.keyStrengths}</h2>
            <div className="text-xs text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
          </div>
        )}

        {data.workExperience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-3 border-l-2 border-teal-400 pl-2">{T.experience}</h2>
            {data.workExperience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                  <span className="text-xs text-gray-500">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                </div>
                <p className="text-xs text-teal-600 mb-1">{exp.company}</p>
                <ul className="list-disc list-inside space-y-0.5">
                  {exp.description.filter(Boolean).map((d, i) => (
                    <li key={i} className="text-xs text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: d }} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {data.projects.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-3 border-l-2 border-teal-400 pl-2">{T.projects}</h2>
            {data.projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-sm text-gray-900">{proj.name}</h3>
                  <span className="text-xs text-gray-500">{proj.startDate} — {proj.endDate}</span>
                </div>
                <p className="text-xs text-gray-500">{proj.role}</p>
                {proj.techStack.length > 0 && (
                  <p className="text-xs text-gray-400 mt-0.5">{proj.techStack.join(', ')}</p>
                )}
                {proj.description && (
                  <div className="text-xs text-gray-600 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: proj.description }} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
