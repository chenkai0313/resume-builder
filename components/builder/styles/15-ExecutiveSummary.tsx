import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { proficiencyDisplay } from '@/lib/display'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function ExecutiveSummary({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto">
      <div className="bg-black px-10 py-10 text-center">
        <ResumeAvatar src={p.avatar} size={80} className="ring-1 ring-yellow-400/50 mx-auto mb-4" />
        <h1 className="text-4xl font-light text-yellow-400 tracking-wide">{p.name || 'Your Name'}</h1>
        <div className="w-12 h-px bg-yellow-700 mx-auto my-3" />
        <p className="text-gray-400 text-sm tracking-[0.15em] uppercase">{p.title}</p>
        <div className="flex justify-center flex-wrap gap-x-6 text-xs text-gray-500 mt-4">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
        </div>
        <CustomFields fields={p.customFields || []} />
      </div>

      <div className="px-10 py-8">
        {data.advantages && (
          <div className="mb-10">
            <h2 className="text-xs tracking-[0.2em] uppercase text-[#B8860B] font-medium mb-4 border-b border-[#B8860B]/20 pb-2">{T.executiveProfile}</h2>
            <div className="text-sm text-gray-600 leading-relaxed italic" dangerouslySetInnerHTML={{ __html: data.advantages }} />
          </div>
        )}

        {data.workExperience.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xs tracking-[0.2em] uppercase text-[#B8860B] font-medium mb-4 border-b border-[#B8860B]/20 pb-2">{T.careerHistory}</h2>
            {data.workExperience.map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                    <p className="text-xs text-[#B8860B]">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0 ml-2">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                </div>
                {exp.metrics && (
                  <div className="mt-2 text-xs text-gray-500 italic leading-relaxed" dangerouslySetInnerHTML={{ __html: exp.metrics }} />
                )}
                <ul className="mt-2 space-y-1">
                  {exp.description.filter(Boolean).map((d, i) => (
                    <li key={i} className="text-xs text-gray-600 flex gap-2"><span className="text-[#B8860B] mt-0.5 shrink-0">—</span><span dangerouslySetInnerHTML={{ __html: d }} /></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-3 gap-6">
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-xs tracking-[0.2em] uppercase text-[#B8860B] font-medium mb-3 border-b border-[#B8860B]/20 pb-1">{T.coreCompetencies}</h2>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((s, i) => (
                  <span key={i} className="text-xs bg-yellow-50 text-yellow-800 px-2 py-0.5 border border-yellow-200">{s}</span>
                ))}
              </div>
            </div>
          )}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-xs tracking-[0.2em] uppercase text-[#B8860B] font-medium mb-3 border-b border-[#B8860B]/20 pb-1">{T.education}</h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <p className="font-medium text-xs text-gray-900">{edu.school}</p>
                  <p className="text-xs text-gray-500">{edu.degree}, {edu.major}</p>
                  <p className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
          {data.certifications.length > 0 && (
            <div>
              <h2 className="text-xs tracking-[0.2em] uppercase text-[#B8860B] font-medium mb-3 border-b border-[#B8860B]/20 pb-1">{T.certs}</h2>
              {data.certifications.map((cert) => (
                <p key={cert.id} className="text-xs text-gray-600 mb-1">{cert.name}{cert.date && <span className="text-gray-400"> ({cert.date})</span>}</p>
              ))}
            </div>
          )}
        </div>

        {data.languages.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xs tracking-[0.2em] uppercase text-[#B8860B] font-medium mb-3 border-b border-[#B8860B]/20 pb-1">{T.languages}</h2>
            <div className="flex flex-wrap gap-x-4 text-xs text-gray-600">
              {data.languages.map((l) => (
                <span key={l.id}>{l.name}{l.proficiency && ` (${proficiencyDisplay(l.proficiency, lang)})`}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
