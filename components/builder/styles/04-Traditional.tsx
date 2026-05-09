import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { employmentStatusDisplay, salaryDisplay, workModeDisplay, proficiencyDisplay } from '@/lib/display'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function Traditional({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-serif p-8 max-w-[210mm] mx-auto">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-2">
          <ResumeAvatar src={p.avatar} size={56} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{p.name || 'Your Name'}</h1>
        <p className="text-sm text-gray-500 mt-1">{p.title}</p>
        <hr className="my-3 border-gray-300" />
        <div className="flex justify-center gap-x-4 text-xs text-gray-500">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
        </div>
        {(p.website || p.github || p.linkedin) && (
          <div className="flex justify-center gap-x-4 text-xs text-gray-500 mt-1">
            {p.website && <span>{p.website}</span>}
            {p.github && <span>{p.github}</span>}
            {p.linkedin && <span>{p.linkedin}</span>}
          </div>
        )}
        {(p.employmentStatus || p.salaryExpectation || p.workMode) && (
          <div className="flex justify-center gap-x-4 text-xs text-gray-400 mt-1">
            {p.employmentStatus && <span>{employmentStatusDisplay(p.employmentStatus, lang)}</span>}
            {p.salaryExpectation && <span>{salaryDisplay(p.salaryExpectation, lang)}</span>}
            {p.workMode && <span>{workModeDisplay(p.workMode, lang)}</span>}
          </div>
        )}
        <CustomFields fields={p.customFields || []} />
      </div>

      {data.advantages && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-2">{T.keyStrengths}</h2>
          <hr className="border-gray-200 mb-2" />
          <div className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
        </div>
      )}

      {data.workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-2">{T.experience}</h2>
          <hr className="border-gray-200 mb-3" />
          {data.workExperience.map((exp, i) => (
            <div key={exp.id} className={`${i > 0 ? 'mt-4 pt-4 border-t border-gray-100' : ''}`}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                <span className="text-xs text-gray-500">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
              </div>
              <p className="text-sm text-gray-600">{exp.company}</p>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                {exp.description.filter(Boolean).map((d, i) => (
                  <li key={i} className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: d }} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-2">{T.education}</h2>
          <hr className="border-gray-200 mb-3" />
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm text-gray-900">{edu.school}</h3>
                <span className="text-xs text-gray-500">{edu.startDate} — {edu.endDate}</span>
              </div>
              <p className="text-sm text-gray-600">{edu.degree}{edu.major ? ` in ${edu.major}` : ''}</p>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-2">{T.skills}</h2>
          <hr className="border-gray-200 mb-2" />
          <p className="text-sm text-gray-700 leading-relaxed">{data.skills.join(' · ')}</p>
        </div>
      )}

      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-2">{T.projects}</h2>
          <hr className="border-gray-200 mb-3" />
          {data.projects.map((proj) => (
            <div key={proj.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm text-gray-900">{proj.name}</h3>
                <span className="text-xs text-gray-500">{proj.startDate} — {proj.endDate}</span>
              </div>
              <p className="text-sm text-gray-600">{proj.role}</p>
              {proj.techStack.length > 0 && (
                <p className="text-xs text-gray-400 mt-0.5">{proj.techStack.join(', ')}</p>
              )}
              {proj.description && (
                <div className="text-sm text-gray-700 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: proj.description }} />
              )}
            </div>
          ))}
        </div>
      )}

      {data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-2">{T.certifications}</h2>
          <hr className="border-gray-200 mb-2" />
          {data.certifications.map((cert) => (
            <p key={cert.id} className="text-sm text-gray-700">{cert.name}{cert.date ? ` (${cert.date})` : ''}</p>
          ))}
        </div>
      )}

      {data.languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-2">{T.languages}</h2>
          <hr className="border-gray-200 mb-2" />
          <p className="text-sm text-gray-700">{data.languages.map(l => `${l.name} (${proficiencyDisplay(l.proficiency, lang)})`).join(' · ')}</p>
        </div>
      )}
    </div>
  )
}
