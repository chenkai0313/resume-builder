import type { ResumeData } from '@/lib/types'
import { t } from '@/lib/titles'
import { employmentStatusDisplay, salaryDisplay, workModeDisplay, proficiencyDisplay } from '@/lib/display'
import ResumeAvatar from '../ResumeAvatar'
import CustomFields from './CustomFields'

export default function CloudSRE({ data, lang = 'en' }: { data: ResumeData; lang?: string }) {
  const { personalInfo: p } = data
  const T = t(lang)

  const groupedSkills = (skills: string[]) => {
    const groups: { label: string; items: string[] }[] = []
    const categoryLabels = [
      { label: lang === 'zh' ? '云平台' : 'Cloud Platforms', keywords: ['aws', 'gcp', 'azure', 'cloud', 'kubernetes', 'k8s', 'docker', 'container', 'terraform', 'pulumi', 'helm'] },
      { label: lang === 'zh' ? '监控/可观测' : 'Monitoring & Observability', keywords: ['prometheus', 'grafana', 'datadog', 'newrelic', 'new relic', 'sentry', 'opentelemetry', 'elk', 'elastic', 'splunk', 'jaeger', 'zipkin'] },
      { label: lang === 'zh' ? 'CI/CD' : 'CI/CD', keywords: ['jenkins', 'github actions', 'gitlab ci', 'circleci', 'argocd', 'flux', 'ci/cd', 'deployment'] },
      { label: lang === 'zh' ? '编程语言' : 'Languages', keywords: ['python', 'go', 'golang', 'bash', 'shell', 'rust', 'ruby', 'java', 'node', 'typescript', 'perl'] },
      { label: lang === 'zh' ? '数据库' : 'Databases', keywords: ['postgresql', 'mysql', 'redis', 'mongodb', 'cassandra', 'dynamodb', 'cockroachdb', 'sql'] },
      { label: lang === 'zh' ? '网络/安全' : 'Networking & Security', keywords: ['vpc', 'dns', 'cdn', 'tls', 'ssl', 'firewall', 'vpn', 'load balancer', 'ingress', 'istio', 'envoy', 'service mesh', 'oauth'] },
    ]

    const remaining: string[] = [...skills]

    for (const cat of categoryLabels) {
      const matched = remaining.filter(s => cat.keywords.some(k => s.toLowerCase().includes(k)))
      if (matched.length > 0) {
        groups.push({ label: cat.label, items: matched })
        matched.forEach(m => {
          const idx = remaining.indexOf(m)
          if (idx !== -1) remaining.splice(idx, 1)
        })
      }
    }

    if (remaining.length > 0) {
      groups.push({ label: lang === 'zh' ? '其他' : 'Other', items: remaining })
    }

    return groups
  }

  const skillGroups = groupedSkills(data.skills)

  return (
    <div className="bg-white text-gray-800 font-sans max-w-[210mm] mx-auto">
      {/* Dark header */}
      <div className="bg-slate-800 text-white px-8 pt-8 pb-6">
        <div className="flex items-start gap-4 mb-4">
          <ResumeAvatar src={p.avatar} size={56} className="mt-1 ring-2 ring-cyan-400 rounded-full" />
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight">{p.name || 'Your Name'}</h1>
            <p className="text-sm text-cyan-300 font-mono mt-1">{p.title}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300 font-mono border-t border-slate-700 pt-3">
          {p.email && <span className="inline-flex items-center gap-1">{p.email}</span>}
          {p.phone && <span className="inline-flex items-center gap-1">{p.phone}</span>}
          {p.github && <span className="inline-flex items-center gap-1">{p.github}</span>}
          {p.linkedin && <span className="inline-flex items-center gap-1">{p.linkedin}</span>}
          {p.website && <span className="inline-flex items-center gap-1">{p.website}</span>}
        </div>
        {(p.employmentStatus || p.salaryExpectation || p.workMode) && (
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400 mt-2">
            {p.employmentStatus && <span>{employmentStatusDisplay(p.employmentStatus, lang)}</span>}
            {p.salaryExpectation && <span>{salaryDisplay(p.salaryExpectation, lang)}</span>}
            {p.workMode && <span>{workModeDisplay(p.workMode, lang)}</span>}
          </div>
        )}
        <CustomFields fields={p.customFields || []} className="text-slate-400 mt-2" />
      </div>

      {/* Main content */}
      <div className="px-8 py-6 space-y-6">
        {/* Advantages */}
        {data.advantages && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">{T.strengths}</h2>
            <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.advantages }} />
          </div>
        )}

        {/* Grouped skills */}
        {skillGroups.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3 border-b border-indigo-200 pb-1">{T.skills}</h2>
            <div className="space-y-3">
              {skillGroups.map((group, gi) => (
                <div key={gi}>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 mb-1.5">{group.label}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((s, i) => (
                      <span key={i} className="text-xs font-mono bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {data.workExperience.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3 border-b border-indigo-200 pb-1">{T.experience}</h2>
            <div className="space-y-4">
              {data.workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold text-gray-900">{exp.company}</h3>
                    <span className="text-[10px] text-gray-400 font-mono shrink-0 ml-2">{exp.startDate} — {exp.current ? T.present : exp.endDate}</span>
                  </div>
                  <p className="text-xs text-indigo-600 font-semibold mb-1">{exp.position}</p>
                  {exp.metrics && (
                    <div className="text-xs text-cyan-700 bg-cyan-50 border border-cyan-100 rounded px-2 py-1 mb-1.5 font-mono">
                      {exp.metrics}
                    </div>
                  )}
                  {exp.description.filter(Boolean).length > 0 && (
                    <ul className="space-y-0.5">
                      {exp.description.filter(Boolean).map((d, i) => (
                        <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                          <span className="text-indigo-300 mt-0.5 shrink-0 font-mono">&gt;</span>
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

        {/* Projects */}
        {data.projects.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3 border-b border-indigo-200 pb-1">{T.projects}</h2>
            {data.projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-semibold text-gray-900">{proj.name}</h3>
                  <span className="text-[10px] text-gray-400 font-mono shrink-0 ml-2">{proj.startDate} — {proj.endDate}</span>
                </div>
                <p className="text-xs text-gray-500 font-mono">{proj.role}</p>
                {proj.techStack.filter(Boolean).length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {proj.techStack.filter(Boolean).map((t, i) => (
                      <span key={i} className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                )}
                {proj.description && (
                  <div className="text-xs text-gray-600 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: proj.description }} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3 border-b border-indigo-200 pb-1">{T.education}</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-semibold text-gray-900">{edu.school}</h3>
                  <span className="text-[10px] text-gray-400 font-mono shrink-0 ml-2">{edu.startDate} — {edu.endDate}</span>
                </div>
                <p className="text-xs text-gray-600">{edu.degree}{edu.major ? ` — ${edu.major}` : ''}</p>
                {edu.gpa && <p className="text-xs text-gray-500 font-mono">GPA: {edu.gpa}</p>}
                {edu.awards && <p className="text-xs text-gray-500">{edu.awards}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">{T.certifications}</h2>
            <div className="space-y-1">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between text-xs text-gray-600">
                  <span className="font-medium">{cert.name}</span>
                  {cert.date && <span className="text-gray-400 font-mono">{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">{T.languages}</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
              {data.languages.map((l) => (
                <span key={l.id}><span className="font-medium">{l.name}</span> ({proficiencyDisplay(l.proficiency, lang)})</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
