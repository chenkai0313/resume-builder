import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { proficiencyDisplay } from '@/lib/display'
import ResumeAvatar from '../ResumeAvatar'

export default function Simple({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-black font-sans p-8 max-w-[210mm] mx-auto text-sm">
      <div className="mb-6 flex items-start gap-4">
        <ResumeAvatar src={p.avatar} size={56} className="mt-1" />
        <div className="min-w-0">
          <h1 className="text-2xl font-bold">{p.name || 'Your Name'}</h1>
          <p className="text-base mt-0.5">{p.title}</p>
          <div className="text-xs text-gray-500 mt-2">
            {[p.email, p.phone].filter(Boolean).join(' | ')}
          </div>
        </div>
      </div>

      {data.advantages && (
        <div className="mb-5 border-t border-black pt-3">
          <div dangerouslySetInnerHTML={{ __html: data.advantages }} />
        </div>
      )}

      {data.workExperience.length > 0 && (
        <div className="mb-5 border-t border-black pt-3">
          <h2 className="text-xs font-bold uppercase mb-3">{T.experience}</h2>
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between font-bold">
                <span>{exp.position}, {exp.company}</span>
                <span className="font-normal text-xs">{exp.startDate} – {exp.current ? T.present : exp.endDate}</span>
              </div>
              {exp.description.filter(Boolean).length > 0 && (
                <div className="mt-1">
                  {exp.description.filter(Boolean).map((d, i) => (
                    <p key={i} className="text-xs ml-4">- <span dangerouslySetInnerHTML={{ __html: d }} /></p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-5 border-t border-black pt-3">
          <h2 className="text-xs font-bold uppercase mb-3">{T.education}</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2 flex justify-between">
              <div><span className="font-bold">{edu.school}</span> — {edu.major}{edu.degree && ` (${edu.degree})`}</div>
              <span className="text-xs">{edu.startDate} – {edu.endDate}</span>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-5 border-t border-black pt-3">
          <h2 className="text-xs font-bold uppercase mb-3">{T.skills}</h2>
          <div className="flex flex-wrap gap-x-2">{data.skills.map((s, i) => <span key={i}>{s}</span>)}</div>
        </div>
      )}

      {data.projects.length > 0 && (
        <div className="mb-5 border-t border-black pt-3">
          <h2 className="text-xs font-bold uppercase mb-3">{T.projects}</h2>
          {data.projects.map((proj) => (
            <div key={proj.id} className="mb-2">
              <span className="font-bold">{proj.name}</span>
              {proj.techStack.filter(Boolean).length > 0 && <span> — {proj.techStack.filter(Boolean).join(', ')}</span>}
              {proj.description && <p className="text-xs ml-4" dangerouslySetInnerHTML={{ __html: proj.description }} />}
            </div>
          ))}
        </div>
      )}

      {data.certifications.length > 0 && (
        <div className="mb-5 border-t border-black pt-3">
          <h2 className="text-xs font-bold uppercase mb-2">{T.certifications}</h2>
          {data.certifications.map((cert) => (
            <p key={cert.id}>{cert.name}{cert.date && ` (${cert.date})`}</p>
          ))}
        </div>
      )}

      {data.languages.length > 0 && (
        <div className="border-t border-black pt-3">
          <h2 className="text-xs font-bold uppercase mb-2">{T.languages}</h2>
          <p>{data.languages.map(l => `${l.name}${l.proficiency ? ` (${proficiencyDisplay(l.proficiency, lang)})` : ''}`).join(', ')}</p>
        </div>
      )}
    </div>
  )
}
