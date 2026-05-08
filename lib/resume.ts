import { ResumeData } from './types'

export function getDefaultResume(lang: string): ResumeData {
  const isZh = lang === 'zh'
  return {
    personalInfo: {
      name: isZh ? '张明' : 'Alex Chen',
      email: isZh ? 'zhangming@email.com' : 'alex.chen@email.com',
      phone: isZh ? '138-0000-1234' : '+1 (555) 123-4567',
      title: isZh ? '高级前端工程师' : 'Senior Frontend Engineer',
      website: isZh ? 'https://zhangming.dev' : 'https://alexchen.dev',
      github: 'https://github.com/alexchen',
      linkedin: 'https://linkedin.com/in/alexchen',
      employmentStatus: 'employed',
      salaryExpectation: '30_50',
      workMode: 'hybrid',
      avatar: '',
    },
    advantages: isZh
      ? '<strong>6 年前端开发经验</strong>，精通 React、Vue、TypeScript。拥有大型项目架构设计经验，善于团队协作与技术分享。<strong>英语流利</strong>，可无障碍阅读英文技术文档并进行跨国团队沟通。具备良好的产品思维，能从用户视角出发推动技术方案落地。'
      : '<strong>6+ years</strong> of frontend development experience with React, Vue, and TypeScript. Experienced in large-scale project architecture, team collaboration, and technical mentorship. <strong>Bilingual</strong> in English and Chinese with cross-cultural communication skills.',
    workExperience: [
      {
        id: 'exp_1',
        company: isZh ? '字节跳动' : 'ByteDance',
        position: isZh ? '高级前端工程师' : 'Senior Frontend Engineer',
        startDate: '2021-03',
        endDate: '',
        current: true,
        description: isZh
          ? [
              '负责抖音电商后台管理系统的前端架构设计与开发，<strong>日活用户超 50 万</strong>',
              '主导微前端架构升级，将单体应用拆解为 6 个独立子应用，<strong>构建效率提升 40%</strong>',
              '推动单元测试覆盖率从 20% 提升至 85%，<strong>线上 Bug 率降低 60%</strong>',
              '建立前端性能监控体系，首屏加载时间从 3.2s 优化至 1.1s',
            ]
          : [
              'Architected and built the frontend for TikTok Shop admin dashboard, <strong>serving 500K+ DAU</strong>',
              'Led micro-frontend migration, splitting a monolith into 6 independent modules, <strong>improving build speed by 40%</strong>',
              'Increased test coverage from 20% to 85%, <strong>reducing production bugs by 60%</strong>',
              'Built performance monitoring, improving LCP from 3.2s to 1.1s',
            ],
      },
      {
        id: 'exp_2',
        company: isZh ? '阿里巴巴' : 'Alibaba Group',
        position: isZh ? '前端工程师' : 'Frontend Engineer',
        startDate: '2018-07',
        endDate: '2021-02',
        current: false,
        description: isZh
          ? [
              '参与淘宝首页改版项目，负责核心推荐模块的前端开发',
              '基于 React + TypeScript 开发通用组件库，<strong>被 10+ 个团队复用</strong>',
              '优化 Webpack 构建配置，<strong>打包时间从 5 分钟缩短至 1.5 分钟</strong>',
            ]
          : [
              'Developed core recommendation modules for Taobao homepage redesign',
              'Built a shared React + TypeScript component library, <strong>adopted by 10+ teams</strong>',
              'Optimized Webpack config, <strong>reducing build time from 5min to 1.5min</strong>',
            ],
      },
    ],
    education: [
      {
        id: 'edu_1',
        school: isZh ? '浙江大学' : 'University of California, Berkeley',
        degree: isZh ? '本科' : "Bachelor's",
        major: isZh ? '计算机科学与技术' : 'Computer Science',
        startDate: '2014-09',
        endDate: '2018-06',
      },
    ],
    skills: isZh
      ? ['React', 'Vue', 'TypeScript', 'Node.js', 'Webpack', 'Docker', 'GraphQL', 'Tailwind CSS', 'Next.js']
      : ['React', 'Vue', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'GraphQL', 'Python', 'Next.js'],
    projects: [
      {
        id: 'proj_1',
        name: isZh ? '低代码可视化搭建平台' : 'Low-code Visual Builder',
        role: isZh ? '技术负责人' : 'Tech Lead',
        techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
        description: isZh
          ? '负责设计并开发企业内部低代码平台，支持拖拽式页面搭建。<strong>覆盖 20+ 业务线</strong>，累计生成页面 3000+。实现了组件市场、主题定制、多端适配等核心功能。'
          : 'Designed and built an internal low-code platform with drag-and-drop page builder. <strong>Adopted by 20+ teams</strong>, generating 3000+ pages. Built component marketplace, theme customization, and multi-platform support.',
        url: '',
        startDate: '2022-01',
        endDate: '2022-12',
      },
    ],
    certifications: [
      {
        id: 'cert_1',
        name: isZh ? 'AWS 解决方案架构师认证' : 'AWS Certified Solutions Architect',
        date: '2023-06',
      },
    ],
    languages: [
      { id: 'lang_1', name: isZh ? '中文' : 'Chinese', proficiency: 'native' },
      { id: 'lang_2', name: isZh ? '英语' : 'English', proficiency: 'fluent' },
    ],
  }
}

export const defaultResume = getDefaultResume('zh')

let counter = 0
export const genId = () => `field_${++counter}_${Date.now()}`
