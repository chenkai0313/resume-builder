import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { proficiencyDisplay } from '@/lib/display'
import ResumeAvatar from '../ResumeAvatar'

export default function Sidebar({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto flex min-h-[297mm]">
      <div className="w-[35%] bg-gray-50 p-6 border-r border-gray-200">
        <ResumeAvatar src={p.avatar} size={96} className="mx-auto mb-4" />
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">{p.name || 'Your Name'}</h1>
          <p className="text-sm text-gray-600 mt-1">{p.title}</p>
        </div>

        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">{T.contact}</h2>
          <div className="space-y-1.5 text-xs text-gray-600">
            {p.email && <p>✉ {p.email}</p>}
            {p.phone && <p>📞 {p.phone}</p>}
{p.website && <p>🌐 {p.website}</p>}
          </div>
        </div>

        {data.skills.length > 0 && (
          <div className="mb-5">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">{T.skills}</h2>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((s, i) => {
                const colors = ['bg-blue-100 text-blue-700', 'bg-green-100 text-green-700', 'bg-purple-100 text-purple-700', 'bg-amber-100 text-amber-700']
                return <span key={i} className={`text-[10px] px-2 py-0.5 rounded ${colors[i % colors.length]}`}>{s}</span>
              })}
            </div>
          </div>
        )}

        {data.languages.length > 0 && (
          <div className="mb-5">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">{T.languages}</h2>
            {data.languages.map((l) => (
              <div key={l.id} className="flex justify-between text-xs mb-1">
                <span>{l.name}</span>
                <span className="text-gray-400">{proficiencyDisplay(l.proficiency, lang)}</span>
              </div>
            ))}
          </div>
        )}

        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">{T.certifications}</h2>
            {data.certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <p className="text-xs font-medium">{cert.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-[65%] p-6">
        {data.advantages && (
          <div className="mb-5">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">{T.strengths}</h2>
            <div className="text-xs text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
          </div>
        )}

        {data.workExperience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">{T.experience}</h2>
            {data.workExperience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="text-xs font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-[10px] text-gray-400">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                </div>
                <p className="text-[10px] text-gray-500 mb-1">{exp.company}</p>
                <ul className="space-y-0.5">
                  {exp.description.filter(Boolean).map((d, i) => (
                    <li key={i} className="text-[10px] text-gray-600 flex gap-1.5"><span className="text-gray-300">•</span><span dangerouslySetInnerHTML={{ __html: d }} /></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {data.education.length > 0 && (
          <div className="mb-5">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">{T.education}</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <h3 className="text-xs font-bold text-gray-900">{edu.school}</h3>
                <p className="text-[10px] text-gray-600">{edu.degree} in {edu.major}</p>
                <p className="text-[10px] text-gray-400">{edu.startDate} — {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {data.projects.length > 0 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">{T.projects}</h2>
            {data.projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <h3 className="text-xs font-bold text-gray-900">{proj.name}</h3>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {proj.techStack.filter(Boolean).map((t, i) => (
                    <span key={i} className="text-[9px] bg-gray-100 text-gray-500 px-1.5">{t}</span>
                  ))}
                </div>
                {proj.description && <p className="text-[10px] text-gray-600 mt-0.5" dangerouslySetInnerHTML={{ __html: proj.description }} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
