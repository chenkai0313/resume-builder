import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import ResumeAvatar from '../ResumeAvatar'

export default function Creative({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto flex">
      <div className="w-2 bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500" />
      <div className="flex-1 p-8">
        <div className="mb-6 flex items-start gap-4">
          <ResumeAvatar src={p.avatar} size={56} className="mt-1" />
          <div className="min-w-0">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">{p.name || 'Your Name'}</h1>
            <p className="text-sm text-gray-500 mt-1">{p.title}</p>
            <div className="flex flex-wrap gap-x-4 text-xs text-gray-400 mt-2">
              {p.email && <span>✉ {p.email}</span>}
              {p.phone && <span>📞 {p.phone}</span>}
            </div>
          </div>
        </div>

        {data.advantages && (
          <div className="text-sm text-gray-600 mb-5 leading-relaxed border-l-2 border-purple-300 pl-3" dangerouslySetInnerHTML={{ __html: data.advantages }} />
        )}

        {data.workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-3">💼 {T.experience}</h2>
            {data.workExperience.map((exp) => (
              <div key={exp.id} className="mb-4 pl-3 border-l-2 border-purple-200">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                  <span className="text-xs text-gray-400">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                </div>
                <p className="text-xs text-pink-500 mb-1">{exp.company}</p>
                <ul className="space-y-0.5">
                  {exp.description.filter(Boolean).map((d, i) => (
                    <li key={i} className="text-xs text-gray-600">✦ <span dangerouslySetInnerHTML={{ __html: d }} /></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {data.education.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3">🎓 {T.education}</h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <h3 className="font-semibold text-sm text-gray-900">{edu.school}</h3>
                  <p className="text-xs text-gray-500">{edu.major}</p>
                  <p className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-pink-600 uppercase tracking-wider mb-3">⚡ {T.skills}</h2>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((s, i) => (
                  <span key={i} className="text-xs bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {data.projects.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3">🚀 {T.projects}</h2>
            {data.projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <h3 className="font-semibold text-sm text-gray-900">{proj.name} <span className="text-xs text-gray-400 font-normal">{proj.role}</span></h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {proj.techStack.filter(Boolean).map((t, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5">{t}</span>
                  ))}
                </div>
                {proj.description && <p className="text-xs text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: proj.description }} />}
              </div>
            ))}
          </div>
        )}

        {data.certifications.length > 0 && (
          <div className="mt-4">
            <h2 className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-2">📜 {T.certifications}</h2>
            {data.certifications.map((cert) => (
              <p key={cert.id} className="text-xs text-gray-600">🏅 {cert.name}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
