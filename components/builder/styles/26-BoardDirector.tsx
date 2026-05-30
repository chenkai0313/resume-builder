import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { employmentStatusDisplay, salaryDisplay, workModeDisplay, proficiencyDisplay } from '@/lib/display'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function BoardDirector({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto">
      {/* Header — dark navy banner with formal square avatar */}
      <div className="bg-blue-900 px-10 py-8">
        <div className="flex items-start gap-6">
          <ResumeAvatar src={p.avatar} size={80} className="ring-2 ring-blue-400/30 shrink-0" />
          <div className="min-w-0 pt-1">
            <h1 className="text-3xl font-bold text-white tracking-tight">{p.name || 'Your Name'}</h1>
            <div className="h-px w-20 bg-blue-400 mt-3 mb-3" />
            <p className="text-blue-200 text-sm font-medium tracking-wide">{p.title}</p>
            <div className="flex flex-wrap gap-x-6 text-xs text-blue-300 mt-4">
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>{p.phone}</span>}
              {p.linkedin && <span>{p.linkedin}</span>}
            </div>
            {(p.employmentStatus || p.salaryExpectation || p.workMode) && (
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-blue-300 mt-1">
                {p.employmentStatus && <span>{employmentStatusDisplay(p.employmentStatus, lang)}</span>}
                {p.salaryExpectation && <span>{salaryDisplay(p.salaryExpectation, lang)}</span>}
                {p.workMode && <span>{workModeDisplay(p.workMode, lang)}</span>}
              </div>
            )}
            <CustomFields fields={p.customFields || []} />
          </div>
        </div>
      </div>

      <div className="px-10 py-8">
        {/* Executive Profile — prominent advantages section */}
        {data.advantages && (
          <div className="mb-8 pb-6 border-b border-blue-100">
            <h2 className="font-serif text-xs font-bold text-blue-900 uppercase tracking-[0.2em] mb-4">EXECUTIVE PROFILE</h2>
            <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
          </div>
        )}

        {/* Career History */}
        {data.workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="font-serif text-xs font-bold text-blue-900 uppercase tracking-[0.2em] mb-4 pb-2 border-b border-blue-100">{T.careerHistory}</h2>
            <div className="space-y-6">
              {data.workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="font-bold text-sm text-gray-900">{exp.position}</h3>
                      <p className="text-xs text-blue-800 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0 ml-2">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                  </div>
                  {exp.metrics && (
                    <div className="mt-2 bg-blue-50 border-l-2 border-blue-800 px-3 py-2 text-xs text-blue-900 leading-relaxed" dangerouslySetInnerHTML={{ __html: exp.metrics }} />
                  )}
                  <ul className="mt-2 space-y-1">
                    {exp.description.filter(Boolean).map((d, i) => (
                      <li key={i} className="text-xs text-gray-600 flex gap-2">
                        <span className="text-blue-800 mt-0.5 shrink-0">—</span>
                        <span dangerouslySetInnerHTML={{ __html: d }} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two-column grid for education + skills */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {data.education.length > 0 && (
            <div>
              <h2 className="font-serif text-xs font-bold text-blue-900 uppercase tracking-[0.2em] mb-4 pb-1 border-b border-blue-100">{T.education}</h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <h3 className="font-bold text-xs text-gray-900">{edu.school}</h3>
                  <p className="text-xs text-gray-500">{edu.degree}{edu.major ? `${lang === 'zh' ? '' : ', '}${edu.major}` : ''}</p>
                  <p className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</p>
                  {edu.gpa && <p className="text-xs text-blue-800 font-medium mt-0.5">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}
          {data.skills.length > 0 && (
            <div>
              <h2 className="font-serif text-xs font-bold text-blue-900 uppercase tracking-[0.2em] mb-4 pb-1 border-b border-blue-100">{T.coreCompetencies}</h2>
              <div className="space-y-2">
                {data.skills.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-800 rounded-full shrink-0" />
                    <span className="text-xs text-gray-700">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects / Board Engagements */}
        {data.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="font-serif text-xs font-bold text-blue-900 uppercase tracking-[0.2em] mb-4 pb-2 border-b border-blue-100">{T.keyProjects}</h2>
            <div className="space-y-4">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-sm text-gray-900">{proj.name}</h3>
                    <span className="text-xs text-gray-400">{proj.startDate} — {proj.endDate}</span>
                  </div>
                  {proj.role && <p className="text-xs text-blue-800 font-medium">{proj.role}</p>}
                  {proj.description && (
                    <div className="text-xs text-gray-600 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: proj.description }} />
                  )}
                  {proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {proj.techStack.map((t, i) => (
                        <span key={i} className="text-[10px] bg-blue-50 text-blue-800 px-2 py-0.5">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom row: certifications + languages */}
        <div className="grid grid-cols-2 gap-8">
          {data.certifications.length > 0 && (
            <div>
              <h2 className="font-serif text-xs font-bold text-blue-900 uppercase tracking-[0.2em] mb-3 pb-1 border-b border-blue-100">{T.certs}</h2>
              {data.certifications.map((cert) => (
                <p key={cert.id} className="text-xs text-gray-600 mb-1">{cert.name}{cert.date && <span className="text-gray-400"> ({cert.date})</span>}</p>
              ))}
            </div>
          )}
          {data.languages.length > 0 && (
            <div>
              <h2 className="font-serif text-xs font-bold text-blue-900 uppercase tracking-[0.2em] mb-3 pb-1 border-b border-blue-100">{T.languages}</h2>
              {data.languages.map((l) => (
                <p key={l.id} className="text-xs text-gray-600 mb-1"><span className="font-medium">{l.name}</span>{l.proficiency ? `: ${proficiencyDisplay(l.proficiency, lang)}` : ''}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
