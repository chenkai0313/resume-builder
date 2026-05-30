import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { employmentStatusDisplay, salaryDisplay, workModeDisplay, proficiencyDisplay } from '@/lib/display'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

const tagColors = [
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-purple-100 text-purple-800',
  'bg-orange-100 text-orange-800',
  'bg-pink-100 text-pink-800',
  'bg-teal-100 text-teal-800',
  'bg-indigo-100 text-indigo-800',
  'bg-yellow-100 text-yellow-800',
  'bg-red-100 text-red-800',
  'bg-cyan-100 text-cyan-800',
]

export default function Frontend({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto p-8">
      {/* Header with avatar */}
      <div className="flex items-start gap-5 mb-6 pb-5 border-b border-gray-200">
        <ResumeAvatar
          src={p.avatar}
          size={60}
          className="mt-1 rounded-full ring-2 ring-blue-200 ring-offset-2 shrink-0"
        />
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-900">{p.name || 'Your Name'}</h1>
          <p className="text-sm text-emerald-600 font-medium mt-0.5">{p.title}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-500 mt-1.5">
            {p.email && <span className="inline-flex items-center gap-1">{p.email}</span>}
            {p.phone && <span className="inline-flex items-center gap-1">{p.phone}</span>}
            {p.website && <span className="inline-flex items-center gap-1">{p.website}</span>}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-400 mt-0.5">
            {p.github && <span>{p.github}</span>}
            {p.linkedin && <span>{p.linkedin}</span>}
          </div>
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

      {/* Advantages */}
      {data.advantages && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">{T.strengths}</h2>
          <div className="text-sm text-gray-600 leading-relaxed bg-blue-50 rounded-lg p-4" dangerouslySetInnerHTML={{ __html: data.advantages }} />
        </div>
      )}

      {/* Skills as colorful badges */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">{T.skills}</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s, i) => (
              <span
                key={i}
                className={`text-xs font-medium px-3 py-1 rounded-full ${tagColors[i % tagColors.length]}`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects first - 2-column card grid */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">{T.projects}</h2>
          <div className="grid grid-cols-2 gap-3">
            {data.projects.map((proj) => (
              <div key={proj.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between gap-1 mb-1">
                  <h3 className="text-sm font-semibold text-gray-900 leading-tight">{proj.name}</h3>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap shrink-0">{proj.startDate} — {proj.endDate}</span>
                </div>
                {proj.role && <p className="text-xs text-emerald-600 font-medium mb-1.5">{proj.role}</p>}
                {proj.description && (
                  <div className="text-xs text-gray-600 mb-2 line-clamp-3" dangerouslySetInnerHTML={{ __html: proj.description }} />
                )}
                {proj.techStack.filter(Boolean).length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {proj.techStack.filter(Boolean).map((t, j) => (
                      <span key={j} className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${tagColors[j % tagColors.length]}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">{T.experience}</h2>
          <div className="space-y-4">
            {data.workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-xs text-emerald-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0 ml-2">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                </div>
                {exp.description.filter(Boolean).length > 0 && (
                  <ul className="mt-1.5 space-y-0.5">
                    {exp.description.filter(Boolean).map((d, j) => (
                      <li key={j} className="text-xs text-gray-600 leading-relaxed flex gap-2">
                        <span className="text-blue-300 shrink-0 mt-0.5">-</span>
                        <span dangerouslySetInnerHTML={{ __html: d }} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">{T.education}</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-semibold text-gray-900">{edu.school}</h3>
                <span className="text-xs text-gray-400 shrink-0 ml-2">{edu.startDate} — {edu.endDate}</span>
              </div>
              <p className="text-xs text-gray-600">{edu.degree}{edu.major ? ` — ${edu.major}` : ''}</p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">{T.certifications}</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
            {data.certifications.map((cert) => (
              <span key={cert.id}>{cert.name}{cert.date ? ` (${cert.date})` : ''}</span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">{T.languages}</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
            {data.languages.map((l) => (
              <span key={l.id}>{l.name} ({proficiencyDisplay(l.proficiency, lang)})</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
