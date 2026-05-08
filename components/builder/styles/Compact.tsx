import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { proficiencyDisplay } from '@/lib/display'

export default function Compact({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans p-6 max-w-[210mm] mx-auto text-xs leading-snug">
      <div className="text-center mb-3 border-b border-gray-300 pb-2">
        <h1 className="text-lg font-bold">{p.name || 'Your Name'}</h1>
        <p className="text-gray-600">{[p.title, p.email, p.phone].filter(Boolean).join(' | ')}</p>
      </div>

      {data.advantages && <div className="mb-3 text-gray-600" dangerouslySetInnerHTML={{ __html: data.advantages }} />}

      {data.workExperience.length > 0 && (
        <div className="mb-3">
          <h2 className="font-bold uppercase tracking-wider text-[10px] border-b border-gray-200 mb-1">{T.experience}</h2>
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="mb-2">
              <div className="flex justify-between font-semibold">{exp.position}, {exp.company} <span className="font-normal text-gray-500">{exp.startDate}–{exp.current ? T.present : exp.endDate}</span></div>
              <ul className="pl-3 mt-0.5">
                {exp.description.filter(Boolean).map((d, i) => (
                  <li key={i} className="text-[11px] text-gray-600">• <span dangerouslySetInnerHTML={{ __html: d }} /></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-3">
          <h2 className="font-bold uppercase tracking-wider text-[10px] border-b border-gray-200 mb-1">{T.education}</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="flex justify-between"><span className="font-semibold">{edu.school}</span> <span className="text-gray-500">{edu.startDate}–{edu.endDate}</span></div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-3">
          <h2 className="font-bold uppercase tracking-wider text-[10px] border-b border-gray-200 mb-1">{T.skills}</h2>
          <div className="flex flex-wrap gap-x-2">{data.skills.map((s, i) => <span key={i} className="text-gray-600">{s}{i < data.skills.length - 1 && ','}</span>)}</div>
        </div>
      )}

      {data.projects.length > 0 && (
        <div className="mb-3">
          <h2 className="font-bold uppercase tracking-wider text-[10px] border-b border-gray-200 mb-1">{T.projects}</h2>
          {data.projects.map((proj) => (
            <div key={proj.id} className="mb-1"><span className="font-semibold">{proj.name}</span> — <span className="text-gray-500">{proj.techStack.filter(Boolean).join(', ')}</span></div>
          ))}
        </div>
      )}

      <div className="flex gap-4">
        {data.certifications.length > 0 && (
          <div className="flex-1"><h2 className="font-bold uppercase tracking-wider text-[10px] border-b border-gray-200 mb-1">{T.certs}</h2>
            {data.certifications.map((cert) => <p key={cert.id} className="text-[11px]">{cert.name}</p>)}
          </div>
        )}
        {data.languages.length > 0 && (
          <div className="flex-1"><h2 className="font-bold uppercase tracking-wider text-[10px] border-b border-gray-200 mb-1">{T.languages}</h2>
            {data.languages.map((l) => <p key={l.id} className="text-[11px]">{l.name}: {proficiencyDisplay(l.proficiency, lang)}</p>)}
          </div>
        )}
      </div>
    </div>
  )
}
