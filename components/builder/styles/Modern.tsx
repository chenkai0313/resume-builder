import type { ResumeData } from '@/lib/types'
import { salaryDisplay, employmentStatusDisplay, workModeDisplay, proficiencyDisplay } from '@/lib/display'
import { t } from '@/lib/titles'
import ResumeAvatar from '../ResumeAvatar'

export default function Modern({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans p-8 max-w-[210mm] mx-auto">
      <div className="border-b-4 border-blue-600 pb-4 mb-6">
        <div className="flex items-start gap-4">
          <ResumeAvatar src={p.avatar} size={56} className="mt-1" />
          <div className="min-w-0">
            <h1 className="text-3xl font-bold text-gray-900">{p.name || 'Your Name'}</h1>
            <p className="text-lg text-blue-600 mt-1">{p.title}</p>
            <div className="flex flex-wrap gap-x-4 text-sm text-gray-500 mt-2">
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>{p.phone}</span>}
            </div>
            {(p.employmentStatus || p.salaryExpectation || p.workMode) && (
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                {p.employmentStatus && <span>{employmentStatusDisplay(p.employmentStatus, lang)}</span>}
                {p.salaryExpectation && <span>{salaryDisplay(p.salaryExpectation, lang)}</span>}
                {p.workMode && <span>{workModeDisplay(p.workMode, lang)}</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      {data.advantages && (
        <Section title={T.keyStrengths}>
          <div className="text-sm leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: data.advantages }} />
        </Section>
      )}

      {data.workExperience.length > 0 && (
        <Section title={T.experience}>
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                <span className="text-xs text-gray-500">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
              </div>
              <p className="text-sm text-gray-600">{exp.company}</p>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                {exp.description.filter(Boolean).map((d, i) => (
                  <li key={i} className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: d }} />
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {data.education.length > 0 && (
        <Section title={T.education}>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                <span className="text-xs text-gray-500">{edu.startDate} — {edu.endDate}</span>
              </div>
              <p className="text-sm text-gray-600">{edu.degree} — {edu.major}</p>
            </div>
          ))}
        </Section>
      )}

      {data.skills.length > 0 && (
        <Section title={T.skills}>
          <p className="text-sm text-gray-600">{data.skills.join(' · ')}</p>
        </Section>
      )}

      {data.projects.length > 0 && (
        <Section title={T.projects}>
          {data.projects.map((proj) => (
            <div key={proj.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                <span className="text-xs text-gray-500">{proj.startDate} — {proj.endDate}</span>
              </div>
              <p className="text-sm text-gray-600">{proj.role}</p>
              {proj.techStack.length > 0 && (
                <p className="text-xs text-gray-400 mt-0.5">{proj.techStack.join(' · ')}</p>
              )}
              {proj.description && (
                <div className="text-sm text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: proj.description }} />
              )}
            </div>
          ))}
        </Section>
      )}

      {data.certifications.length > 0 && (
        <Section title={T.certifications}>
          {data.certifications.map((cert) => (
            <div key={cert.id} className="flex justify-between text-sm text-gray-600">
              <span>{cert.name}</span>
              <span className="text-xs text-gray-500">{cert.date}</span>
            </div>
          ))}
        </Section>
      )}

      {data.languages.length > 0 && (
        <Section title={T.languages}>
          <p className="text-sm text-gray-600">{data.languages.map(l => `${l.name} (${proficiencyDisplay(l.proficiency, lang)})`).join(' · ')}</p>
        </Section>
      )}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">{title}</h2>
      {children}
    </div>
  )
}
