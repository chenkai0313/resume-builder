import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { employmentStatusDisplay, salaryDisplay, workModeDisplay, proficiencyDisplay } from '@/lib/display'
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Code, Award } from 'lucide-react'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function OnePageStartup({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)
  return (
    <div className="bg-white text-gray-800 font-sans p-6 max-w-[210mm] mx-auto text-xs">
      <div className="flex items-center gap-4 mb-4 pb-4 border-b-2 border-indigo-500">
        <ResumeAvatar src={p.avatar} size={48} className="shrink-0" />
        <div className="min-w-0">
          <h1 className="text-lg font-bold text-indigo-700">{p.name || 'Your Name'}</h1>
          <p className="text-xs text-indigo-500 mt-0.5">{p.title}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5 text-gray-500">
            {p.email && <span className="flex items-center gap-1"><Mail size={12} />{p.email}</span>}
            {p.phone && <span className="flex items-center gap-1"><Phone size={12} />{p.phone}</span>}
            {p.website && <span className="flex items-center gap-1"><MapPin size={12} />{p.website}</span>}
          </div>
          {(p.employmentStatus || p.salaryExpectation || p.workMode) && (
            <div className="flex flex-wrap gap-x-3 text-[10px] text-gray-400 mt-0.5">
              {p.employmentStatus && <span>{employmentStatusDisplay(p.employmentStatus, lang)}</span>}
              {p.salaryExpectation && <span>{salaryDisplay(p.salaryExpectation, lang)}</span>}
              {p.workMode && <span>{workModeDisplay(p.workMode, lang)}</span>}
            </div>
          )}
          <CustomFields fields={p.customFields || []} />
        </div>
      </div>

      {data.advantages && (
        <div className="mb-3">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 mb-1">{T.keyStrengths}</h2>
          <div className="text-xs text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
        </div>
      )}

      {data.workExperience.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 mb-2 flex items-center gap-1">
            <Briefcase size={12} />{T.experience}
          </h2>
          {data.workExperience.map((exp, i) => (
            <div key={exp.id} className={`${i > 0 ? 'mt-2 pt-2 border-t border-indigo-100' : ''}`}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-xs text-gray-900">{exp.position}</h3>
                <span className="text-[10px] text-gray-400">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
              </div>
              <p className="text-[10px] text-indigo-500">{exp.company}</p>
              <ul className="list-disc list-inside mt-0.5 space-y-0.5">
                {exp.description.filter(Boolean).map((d, j) => (
                  <li key={j} className="text-[11px] text-gray-600 leading-snug" dangerouslySetInnerHTML={{ __html: d }} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 mb-1.5 flex items-center gap-1">
            <Code size={12} />{T.skills}
          </h2>
          <div className="flex flex-wrap gap-1">
            {data.skills.map((s, i) => (
              <span key={i} className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">{s}</span>
            ))}
          </div>
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 mb-1.5 flex items-center gap-1">
            <GraduationCap size={12} />{T.education}
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-1.5">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-xs text-gray-900">{edu.school}</h3>
                <span className="text-[10px] text-gray-400">{edu.startDate} — {edu.endDate}</span>
              </div>
              <p className="text-[11px] text-gray-600">{edu.degree}{edu.major ? ` — ${edu.major}` : ''}</p>
            </div>
          ))}
        </div>
      )}

      {data.projects.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 mb-1.5 flex items-center gap-1">
            <Award size={12} />{T.projects}
          </h2>
          {data.projects.slice(0, 2).map((proj) => (
            <div key={proj.id} className="mb-1.5">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-xs text-gray-900">{proj.name}</h3>
                <span className="text-[10px] text-gray-400">{proj.startDate} — {proj.endDate}</span>
              </div>
              <p className="text-[10px] text-indigo-400">{proj.role}</p>
              {proj.techStack.length > 0 && (
                <p className="text-[10px] text-gray-400">{proj.techStack.join(', ')}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {data.certifications.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 mb-1">{T.certifications}</h2>
          {data.certifications.map((cert) => (
            <p key={cert.id} className="text-[11px] text-gray-600">{cert.name}{cert.date ? ` (${cert.date})` : ''}</p>
          ))}
        </div>
      )}

      {data.languages.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 mb-1">{T.languages}</h2>
          <p className="text-[11px] text-gray-600">{data.languages.map(l => `${l.name} (${proficiencyDisplay(l.proficiency, lang)})`).join(', ')}</p>
        </div>
      )}
    </div>
  )
}
