export const t = (lang: string) => ({
  strengths: lang === 'zh' ? '个人优势' : 'Strengths',
  keyStrengths: lang === 'zh' ? '个人优势' : 'Key Strengths',
  executiveProfile: lang === 'zh' ? '个人概览' : 'Executive Profile',
  experience: lang === 'zh' ? '工作经历' : 'Experience',
  professionalExperience: lang === 'zh' ? '工作经历' : 'Professional Experience',
  careerHistory: lang === 'zh' ? '工作经历' : 'Career History',
  education: lang === 'zh' ? '教育背景' : 'Education',
  skills: lang === 'zh' ? '专业技能' : 'Skills',
  coreCompetencies: lang === 'zh' ? '核心能力' : 'Core Competencies',
  projects: lang === 'zh' ? '项目经历' : 'Projects',
  keyProjects: lang === 'zh' ? '重点项目' : 'Key Projects',
  certifications: lang === 'zh' ? '证书' : 'Certifications',
  certs: lang === 'zh' ? '证书' : 'Certs',
  languages: lang === 'zh' ? '语言能力' : 'Languages',
  contact: lang === 'zh' ? '联系方式' : 'Contact',
  present: lang === 'zh' ? '至今' : 'Present',
  months: lang === 'zh'
    ? ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
})
