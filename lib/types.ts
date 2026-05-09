export type ResumeCategory = 'general' | 'tech' | 'executive' | 'creative'

export interface ResumeData {
  category: ResumeCategory
  personalInfo: PersonalInfo
  advantages: string
  workExperience: WorkExperience[]
  education: Education[]
  skills: string[]
  projects: Project[]
  certifications: Certification[]
  languages: Language[]
}

export interface CustomField {
  id: string
  label: string
  value: string
}

export interface PersonalInfo {
  name: string
  email: string
  phone: string
  title: string
  website: string
  github: string
  linkedin: string
  employmentStatus: string
  salaryExpectation: string
  workMode: string
  avatar: string
  customFields: CustomField[]
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string[]
  metrics?: string
}

export interface Education {
  id: string
  school: string
  degree: string
  major: string
  startDate: string
  endDate: string
  gpa?: string
  awards?: string
}

export interface Project {
  id: string
  name: string
  role: string
  techStack: string[]
  description: string
  url: string
  startDate: string
  endDate: string
}

export interface Certification {
  id: string
  name: string
  date: string
}

export interface Language {
  id: string
  name: string
  proficiency: string
}

export type ResumeStyle =
  | 'modern'
  | 'classic'
  | 'minimal'
  | 'professional'
  | 'creative'
  | 'compact'
  | 'executive'
  | 'sidebar'
  | 'timeline'
  | 'simple'
  | 'web3'
  | 'aiml'
  | 'remote-worker'
  | 'data-scientist'
  | 'devops'
  | 'creative-designer'
  | 'freelancer'
  | 'sales-bd'
  | 'marketing-digital'
