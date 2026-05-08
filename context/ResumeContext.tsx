'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useParams } from 'next/navigation'
import { ResumeData } from '@/lib/types'
import { getDefaultResume, genId } from '@/lib/resume'

const STORAGE_KEY = 'resume-data'

interface ResumeContextType {
  data: ResumeData
  updatePersonalInfo: (field: string, value: string) => void
  updateAdvantages: (value: string) => void
  addWorkExperience: () => void
  updateWorkExperience: (id: string, field: string, value: unknown) => void
  removeWorkExperience: (id: string) => void
  addEducation: () => void
  updateEducation: (id: string, field: string, value: string) => void
  removeEducation: (id: string) => void
  addSkill: (skill: string) => void
  removeSkill: (idx: number) => void
  addProject: () => void
  updateProject: (id: string, field: string, value: unknown) => void
  removeProject: (id: string) => void
  addCertification: () => void
  updateCertification: (id: string, field: string, value: string) => void
  removeCertification: (id: string) => void
  addLanguage: () => void
  updateLanguage: (id: string, field: string, value: string) => void
  removeLanguage: (id: string) => void
  clearResume: () => void
  loadDefaultResume: () => void
}

const ResumeContext = createContext<ResumeContextType | null>(null)

export function ResumeProvider({ children }: { children: ReactNode }) {
  const params = useParams()
  const lang = (params.lang as string) || 'en'
  const [data, setData] = useState<ResumeData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return JSON.parse(saved) as ResumeData
    }
    return getDefaultResume(lang)
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const updatePersonalInfo = (field: string, value: string) =>
    setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }))

  const updateAdvantages = (value: string) =>
    setData(prev => ({ ...prev, advantages: value }))

  const addWorkExperience = () =>
    setData(prev => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        { id: genId(), company: '', position: '', startDate: '', endDate: '', current: false, description: [''] },
      ],
    }))

  const updateWorkExperience = (id: string, field: string, value: unknown) =>
    setData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }))

  const removeWorkExperience = (id: string) =>
    setData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(exp => exp.id !== id),
    }))

  const addEducation = () =>
    setData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { id: genId(), school: '', degree: '', major: '', startDate: '', endDate: '' },
      ],
    }))

  const updateEducation = (id: string, field: string, value: string) =>
    setData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }))

  const removeEducation = (id: string) =>
    setData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id),
    }))

  const addSkill = (skill: string) =>
    setData(prev => ({
      ...prev,
      skills: [...prev.skills, skill],
    }))

  const removeSkill = (idx: number) =>
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== idx),
    }))

  const addProject = () =>
    setData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: genId(), name: '', role: '', techStack: [], description: '', url: '', startDate: '', endDate: '' },
      ],
    }))

  const updateProject = (id: string, field: string, value: unknown) =>
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    }))

  const removeProject = (id: string) =>
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
    }))

  const addCertification = () =>
    setData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { id: genId(), name: '', date: '' }],
    }))

  const updateCertification = (id: string, field: string, value: string) =>
    setData(prev => ({
      ...prev,
      certifications: prev.certifications.map(c =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    }))

  const removeCertification = (id: string) =>
    setData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id),
    }))

  const addLanguage = () =>
    setData(prev => ({
      ...prev,
      languages: [...prev.languages, { id: genId(), name: '', proficiency: '' }],
    }))

  const updateLanguage = (id: string, field: string, value: string) =>
    setData(prev => ({
      ...prev,
      languages: prev.languages.map(l =>
        l.id === id ? { ...l, [field]: value } : l
      ),
    }))

  const removeLanguage = (id: string) =>
    setData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l.id !== id),
    }))

  const clearResume = () => {
    localStorage.removeItem(STORAGE_KEY)
    setData({
      personalInfo: { name: '', email: '', phone: '', title: '', website: '', github: '', linkedin: '', employmentStatus: '', salaryExpectation: '', workMode: '', avatar: '' },
      advantages: '',
      workExperience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: [],
    })
  }

  const loadDefaultResume = () => {
    localStorage.removeItem(STORAGE_KEY)
    setData(getDefaultResume(lang))
  }

  return (
    <ResumeContext.Provider
      value={{
        data,
        updatePersonalInfo,
        updateAdvantages,
        addWorkExperience,
        updateWorkExperience,
        removeWorkExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        addCertification,
        updateCertification,
        removeCertification,
        addLanguage,
        updateLanguage,
        removeLanguage,
        clearResume,
        loadDefaultResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume must be used within ResumeProvider')
  return ctx
}
