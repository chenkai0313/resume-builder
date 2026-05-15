import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { salaryDisplay, employmentStatusDisplay, workModeDisplay, proficiencyDisplay } from '@/lib/display'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function ProductManager({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto">
      <div className="px-8 pt-7 pb-4 border-b-2 border-blue-600">
        <div className="flex items-start gap-4">
          <ResumeAvatar src={p.avatar} size={56} className="mt-1 shrink-0" />
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{p.name || 'Your Name'}</h1>
            <p className="text-blue-600 text-sm font-medium mt-0.5">{p.title}</p>
            <div className="flex flex-wrap gap-x-5 text-xs text-gray-500 mt-2">
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>{p.phone}</span>}
              {p.website && <span>{p.website}</span>}
              {p.linkedin && <span>{p.linkedin}</span>}
            </div>
            {(p.employmentStatus || p.salaryExpectation || p.workMode) && (
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mt-1">
                {p.employmentStatus && <span>{employmentStatusDisplay(p.employmentStatus, lang)}</span>}
                {p.salaryExpectation && <span>{salaryDisplay(p.salaryExpectation, lang)}</span>}
                {p.workMode && <span>{workModeDisplay(p.workMode, lang)}</span>}
              </div>
            )}
            <CustomFields fields={p.customFields || []} />
          </div>
        </div>
      </div>
      <div className="p-8">
        {data.advantages && (
          <div className="mb-6">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">{T.strengths}</h2>
            <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
          </div>
        )}
        {data.workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">{T.experience}</h2>
            {data.workExperience.map((exp) => (
              <div key={exp.id} className="mb-5 pl-4 border-l-2 border-blue-200 relative">
                <div className="absolute w-2.5 h-2.5 bg-blue-600 rounded-full -left-[5.5px] top-1" />
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                  <span className="text-xs text-gray-400 shrink-0 ml-2">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                </div>
                <p className="text-xs text-blue-700 mb-1">{exp.company}</p>
                {exp.metrics && (
                  <div className="text-xs text-blue-600 mb-1 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: exp.metrics }} />
                )}
                <ul className="space-y-0.5">
                  {exp.description.filter(Boolean).map((d, i) => (
                    <li key={i} className="text-xs text-gray-600" dangerouslySetInnerHTML={{ __html: d }} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">{T.keyProjects}</h2>
            <div className="grid grid-cols-2 gap-3">
              {data.projects.map((proj) => (
                <div key={proj.id} className="border border-blue-100 rounded">
                  <div className="bg-blue-50 px-3 py-2">
                    <h3 className="font-semibold text-xs text-blue-900">{proj.name}</h3>
                    {proj.role && <p className="text-xs text-blue-600">{proj.role}</p>}
                    <p className="text-xs text-gray-400 mt-0.5">{proj.startDate} — {proj.endDate}</p>
                  </div>
                  <div className="px-3 py-2 border-t border-blue-100">
                    {proj.description && (
                      <div className="text-xs text-gray-600 mb-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: proj.description }} />
                    )}
                    {proj.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {proj.techStack.map((t, i) => (
                          <span key={i} className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-6">
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">{T.skills}</h2>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((s, i) => (
                  <span key={i} className="text-xs border border-blue-200 text-blue-700 px-2 py-0.5 rounded">{s}</span>
                ))}
              </div>
            </div>
          )}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">{T.education}</h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <h3 className="font-semibold text-xs text-gray-900">{edu.school}</h3>
                  <p className="text-xs text-gray-500">{edu.degree}{lang === 'zh' ? ' ' : ' in '}{edu.major}</p>
                  <p className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</p>
                  {edu.gpa && <p className="text-xs text-blue-600 font-medium">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-6 mt-6">
          {data.certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">{T.certs}</h2>
              {data.certifications.map((cert) => (
                <p key={cert.id} className="text-xs text-gray-600 mb-1">{cert.name}{cert.date && <span className="text-gray-400"> ({cert.date})</span>}</p>
              ))}
            </div>
          )}
          {data.languages.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">{T.languages}</h2>
              {data.languages.map((l) => (
                <p key={l.id} className="text-xs text-gray-600 mb-1"><strong>{l.name}</strong>{l.proficiency && `: ${proficiencyDisplay(l.proficiency, lang)}`}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
