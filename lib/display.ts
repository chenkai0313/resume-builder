export const salaryDisplay = (key: string, lang: string): string => {
  const map: Record<string, Record<string, string>> = {
    under10: { en: '< 10k', zh: '10k以下' },
    '10_20': { en: '10k - 20k', zh: '10-20k' },
    '20_30': { en: '20k - 30k', zh: '20-30k' },
    '30_50': { en: '30k - 50k', zh: '30-50k' },
    above50: { en: '50k+', zh: '50k以上' },
  }
  return map[key]?.[lang] || key
}

export const employmentStatusDisplay = (key: string, lang: string): string => {
  const map: Record<string, Record<string, string>> = {
    employed: { en: 'Employed', zh: '在职-看机会' },
    unemployed: { en: 'Unemployed', zh: '离职-随时到岗' },
    student: { en: 'Student', zh: '应届生' },
  }
  return map[key]?.[lang] || key
}

export const workModeDisplay = (key: string, lang: string): string => {
  const map: Record<string, Record<string, string>> = {
    remote: { en: 'Remote', zh: '远程' },
    office: { en: 'On-site', zh: '坐班' },
    hybrid: { en: 'Hybrid', zh: '混合' },
  }
  return map[key]?.[lang] || key
}

export const proficiencyDisplay = (key: string, lang: string): string => {
  const map: Record<string, Record<string, string>> = {
    native: { en: 'Native', zh: '母语' },
    fluent: { en: 'Fluent', zh: '流利' },
    advanced: { en: 'Advanced', zh: '高级' },
    intermediate: { en: 'Intermediate', zh: '中级' },
    basic: { en: 'Basic', zh: '基础' },
  }
  return map[key]?.[lang] || key
}
