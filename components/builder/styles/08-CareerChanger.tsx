import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { employmentStatusDisplay, salaryDisplay, workModeDisplay, proficiencyDisplay } from '@/lib/display'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function CareerChanger({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans p-8 max-w-[210mm] mx-auto">
      <div className="mb-6 pb-4 border-b-4 border-orange-400">
        <div className="flex items-start gap-4">
          <ResumeAvatar src={p.avatar} size={56} className="mt-1" />
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-gray-900">{p.name || 'Your Name'}</h1>
            <p className="text-sm text-orange-600 mt-0.5">{p.title}</p>
            <div className="flex flex-wrap gap-x-4 text-xs text-gray-500 mt-1.5">
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>{p.phone}</span>}
              {p.website && <span>{p.website}</span>}
            </div>
            {(p.github || p.linkedin) && (
              <div className="flex flex-wrap gap-x-4 text-xs text-gray-400 mt-0.5">
                {p.github && <span>{p.github}</span>}
                {p.linkedin && <span>{p.linkedin}</span>}
              </div>
            )}
            {(p.employmentStatus || p.salaryExpectation || p.workMode) && (
              <div className="flex flex-wrap gap-x-3 text-xs text-gray-400 mt-0.5">
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
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-2">{T.keyStrengths}</h2>
          <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded-r">
            <div className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
          </div>
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-3">{T.coreCompetencies}</h2>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <span key={i} className="text-xs bg-orange-50 text-orange-700 px-3 py-1.5 rounded border border-orange-200 font-medium">{s}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {data.workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-3">{T.careerHistory}</h2>
          {data.workExperience.map((exp, i) => (
            <div key={exp.id} className={`${i > 0 ? 'mt-4 pt-4 border-t border-orange-100' : ''} relative pl-4`}>
              <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-orange-400" />
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                <span className="text-xs text-gray-400">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
              </div>
              <p className="text-xs text-orange-500 mt-0.5">{exp.company}</p>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                {exp.description.filter(Boolean).map((d, j) => (
                  <li key={j} className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: d }} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-3">{T.keyProjects}</h2>
          {data.projects.map((proj) => (
            <div key={proj.id} className="bg-orange-50 border border-orange-200 rounded p-3 mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm text-gray-900">{proj.name}</h3>
                <span className="text-xs text-gray-400">{proj.startDate} — {proj.endDate}</span>
              </div>
              <p className="text-xs text-orange-500 mt-0.5">{proj.role}</p>
              {proj.techStack.length > 0 && (
                <p className="text-xs text-gray-400 mt-0.5">{proj.techStack.join(', ')}</p>
              )}
              {proj.description && (
                <div className="text-sm text-gray-600 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: proj.description }} />
              )}
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-3">{T.education}</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm text-gray-900">{edu.school}</h3>
                <span className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</span>
              </div>
              <p className="text-sm text-gray-600">{edu.degree}{edu.major ? ` in ${edu.major}` : ''}</p>
              {edu.gpa && <p className="text-xs text-gray-400 mt-0.5">GPA: {edu.gpa}</p>}
              {edu.awards && <p className="text-xs text-orange-500 mt-0.5">{edu.awards}</p>}
            </div>
          ))}
        </div>
      )}

      {data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-2">{T.certifications}</h2>
          {data.certifications.map((cert) => (
            <div key={cert.id} className="flex items-baseline gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-300 shrink-0 mt-1.5" />
              <span className="text-sm text-gray-600">{cert.name}{cert.date ? ` (${cert.date})` : ''}</span>
            </div>
          ))}
        </div>
      )}

      {data.languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-2">{T.languages}</h2>
          <p className="text-sm text-gray-600">{data.languages.map(l => `${l.name} (${proficiencyDisplay(l.proficiency, lang)})`).join(' | ')}</p>
        </div>
      )}
    </div>
  )
}
