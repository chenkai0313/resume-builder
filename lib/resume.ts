import { ResumeData, ResumeCategory } from './types'

export function getDefaultResume(lang: string, category: ResumeCategory = 'general'): ResumeData {
  const isZh = lang === 'zh'

  const profiles: Record<ResumeCategory, () => ResumeData> = {
    general: () => ({
      category: 'general',
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
        customFields: [],
      },
      advantages: isZh
        ? '<strong>6 年前端开发经验</strong>，精通 React、Vue、TypeScript。拥有大型项目架构设计经验，善于团队协作与技术分享。<strong>英语流利</strong>，可无障碍阅读英文技术文档并进行跨国团队沟通。具备良好的产品思维，能从用户视角出发推动技术方案落地。'
        : '<strong>6+ years</strong> of frontend development experience with React, Vue, and TypeScript. Experienced in large-scale project architecture, team collaboration, and technical mentorship. <strong>Bilingual</strong> in English and Chinese with cross-cultural communication skills.',
      workExperience: [
        {
          id: 'exp_1', company: isZh ? '字节跳动' : 'ByteDance', position: isZh ? '高级前端工程师' : 'Senior Frontend Engineer',
          startDate: '2021-03', endDate: '', current: true,
          description: isZh
            ? ['负责抖音电商后台管理系统的前端架构设计与开发，<strong>日活用户超 50 万</strong>', '主导微前端架构升级，将单体应用拆解为 6 个独立子应用，<strong>构建效率提升 40%</strong>', '推动单元测试覆盖率从 20% 提升至 85%，<strong>线上 Bug 率降低 60%</strong>']
            : ['Architected the frontend for TikTok Shop admin dashboard, <strong>serving 500K+ DAU</strong>', 'Led micro-frontend migration, splitting monolith into 6 modules, <strong>improving build speed by 40%</strong>', 'Increased test coverage from 20% to 85%, <strong>reducing production bugs by 60%</strong>'],
        },
        {
          id: 'exp_2', company: isZh ? '阿里巴巴' : 'Alibaba Group', position: isZh ? '前端工程师' : 'Frontend Engineer',
          startDate: '2018-07', endDate: '2021-02', current: false,
          description: isZh
            ? ['参与淘宝首页改版项目，负责核心推荐模块的前端开发', '基于 React + TypeScript 开发通用组件库，<strong>被 10+ 个团队复用</strong>']
            : ['Developed core recommendation modules for Taobao homepage redesign', 'Built a shared React + TypeScript component library, <strong>adopted by 10+ teams</strong>'],
        },
      ],
      education: [{
        id: 'edu_1', school: isZh ? '浙江大学' : 'UC Berkeley',
        degree: isZh ? '本科' : "Bachelor's", major: isZh ? '计算机科学与技术' : 'Computer Science',
        startDate: '2014-09', endDate: '2018-06', gpa: '3.8/4.0',
      }],
      skills: isZh
        ? ['React', 'Vue', 'TypeScript', 'Node.js', 'Webpack', 'Docker', 'GraphQL']
        : ['React', 'Vue', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'GraphQL'],
      projects: [{
        id: 'proj_1',
        name: isZh ? '低代码可视化搭建平台' : 'Low-code Visual Builder',
        role: isZh ? '技术负责人' : 'Tech Lead',
        techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
        description: isZh ? '拖拽式页面搭建平台。<strong>覆盖 20+ 业务线</strong>，累计生成页面 3000+。' : 'Drag-and-drop page builder. <strong>Adopted by 20+ teams</strong>, 3000+ pages generated.',
        url: '', startDate: '2022-01', endDate: '2022-12',
      }],
      certifications: [{ id: 'cert_1', name: isZh ? 'AWS 解决方案架构师' : 'AWS Certified Solutions Architect', date: '2023-06' }],
      languages: [
        { id: 'lang_1', name: isZh ? '中文' : 'Chinese', proficiency: 'native' },
        { id: 'lang_2', name: isZh ? '英语' : 'English', proficiency: 'fluent' },
      ],
    }),

    tech: () => ({
      category: 'tech',
      personalInfo: {
        name: isZh ? '王磊' : 'Michael Wang',
        email: isZh ? 'wanglei@email.com' : 'michael.wang@email.com',
        phone: isZh ? '139-0000-5678' : '+1 (555) 234-5678',
        title: isZh ? '全栈开发工程师' : 'Full-Stack Developer',
        website: isZh ? 'https://wanglei.dev' : 'https://michaelwang.dev',
        github: 'https://github.com/mwang',
        linkedin: 'https://linkedin.com/in/mwang',
        employmentStatus: 'employed', salaryExpectation: '30_50', workMode: 'remote', avatar: '', customFields: [],
      },
      advantages: isZh
        ? '<strong>8 年全栈开发经验</strong>，精通 Golang、React、Solidity。主导过多个高并发微服务架构设计与开发。<strong>擅长系统性能优化</strong>，将核心服务延迟降低 60%。活跃开源贡献者，GitHub 2000+ stars。'
        : '<strong>8+ years</strong> full-stack experience with Golang, React, Solidity. Led high-concurrency microservices architecture. <strong>Performance optimization expert</strong>, reduced core service latency by 60%. Active open-source contributor with 2000+ GitHub stars.',
      workExperience: [
        {
          id: 'exp_1', company: isZh ? '腾讯' : 'Tencent', position: isZh ? '高级后端工程师' : 'Senior Backend Engineer',
          startDate: '2020-06', endDate: '', current: true,
          metrics: isZh ? '系统 QPS 从 5K 提升至 50K，延迟降低 60%' : 'Scaled system from 5K to 50K QPS, reduced latency by 60%',
          description: isZh
            ? ['负责即时通讯服务后端架构，<strong>支撑千万级并发连接</strong>', '设计并实现分布式消息队列系统，<strong>吞吐量提升 10 倍</strong>']
            : ['Architected real-time messaging backend, <strong>supporting 10M+ concurrent connections</strong>', 'Designed distributed message queue, <strong>10x throughput improvement</strong>'],
        },
        {
          id: 'exp_2', company: isZh ? '美团' : 'Meituan', position: isZh ? '后端工程师' : 'Backend Engineer',
          startDate: '2017-03', endDate: '2020-05', current: false,
          description: isZh
            ? ['参与外卖配送调度系统开发，<strong>日均处理 500 万订单</strong>', '优化数据库查询性能，接口响应时间从 800ms 降至 120ms']
            : ['Built food delivery dispatch system, <strong>processing 5M+ daily orders</strong>', 'Optimized DB queries, reducing API response from 800ms to 120ms'],
        },
      ],
      education: [{
        id: 'edu_1', school: isZh ? '华中科技大学' : 'Georgia Tech',
        degree: isZh ? '硕士' : "Master's", major: 'Computer Science',
        startDate: '2015-09', endDate: '2017-06',
      }],
      skills: ['Golang', 'React', 'TypeScript', 'Solidity', 'Docker', 'Kubernetes', 'AWS', 'Redis', 'PostgreSQL', 'GraphQL'],
      projects: [
        {
          id: 'proj_1', name: 'DeFi Swap Protocol', role: 'Smart Contract Lead',
          techStack: ['Solidity', 'Hardhat', 'Ethers.js', 'React'],
          description: isZh ? '去中心化交易所智能合约开发，TVL 峰值 5000 万美元。' : 'Developed DEX smart contracts, peak TVL of $50M.',
          url: 'https://github.com/mwang/defi-swap', startDate: '2023-01', endDate: '2023-08',
        },
        {
          id: 'proj_2', name: 'K8s Monitoring Tool', role: 'Creator',
          techStack: ['Go', 'Prometheus', 'Grafana', 'Kubernetes'],
          description: isZh ? '开源 Kubernetes 集群监控工具，GitHub 2000+ stars。' : 'Open-source K8s cluster monitoring tool, 2000+ GitHub stars.',
          url: 'https://github.com/mwang/k8s-monitor', startDate: '2022-03', endDate: '2022-12',
        },
      ],
      certifications: [
        { id: 'cert_1', name: 'AWS Certified Solutions Architect', date: '2023-06' },
        { id: 'cert_2', name: 'CKAD - Certified Kubernetes Application Developer', date: '2022-09' },
      ],
      languages: [
        { id: 'lang_1', name: isZh ? '中文' : 'Chinese', proficiency: 'native' },
        { id: 'lang_2', name: isZh ? '英语' : 'English', proficiency: 'fluent' },
      ],
    }),

    executive: () => ({
      category: 'executive',
      personalInfo: {
        name: isZh ? '陈建国' : 'James Chen',
        email: isZh ? 'chenjg@email.com' : 'james.chen@email.com',
        phone: isZh ? '136-0000-8888' : '+1 (555) 888-9999',
        title: isZh ? '首席技术官 (CTO)' : 'Chief Technology Officer',
        website: '', github: '', linkedin: 'https://linkedin.com/in/jameschen',
        employmentStatus: 'employed', salaryExpectation: 'above50', workMode: 'office', avatar: '', customFields: [],
      },
      advantages: isZh
        ? '<strong>15 年技术管理经验</strong>，带领过 100+ 人技术团队。主导公司从 0 到 1 搭建技术体系，<strong>支撑年营收 10 亿+</strong>。擅长技术战略规划、团队建设与组织效能提升。'
        : '<strong>15+ years</strong> in technology leadership. Built and led 100+ person engineering org. Established tech infrastructure <strong>supporting $100M+ annual revenue</strong>. Expert in technical strategy, team building, and organizational effectiveness.',
      workExperience: [
        {
          id: 'exp_1', company: isZh ? '某金融科技公司' : 'FinTech Corp', position: isZh ? '首席技术官' : 'CTO',
          startDate: '2019-01', endDate: '', current: true,
          metrics: isZh ? '团队从 20 人扩展到 120 人，系统支撑日交易额 5 亿元' : 'Scaled engineering from 20 to 120, platform processes $70M daily',
          description: isZh
            ? ['制定技术战略并搭建 120 人技术团队，<strong>年研发效率提升 300%</strong>', '主导核心交易系统架构升级，<strong>系统可用性达到 99.99%</strong>', '建立工程文化与管理体系，员工留存率高于行业平均 40%']
            : ['Defined tech strategy and built a 120-person engineering team, <strong>3x delivery velocity</strong>', 'Led core trading system architecture upgrade, <strong>achieved 99.99% uptime</strong>', 'Built engineering culture with 40% above-industry retention rate'],
        },
        {
          id: 'exp_2', company: isZh ? '某互联网公司' : 'Internet Plus Inc', position: isZh ? '技术副总裁' : 'VP of Engineering',
          startDate: '2015-06', endDate: '2018-12', current: false,
          metrics: isZh ? '管理 5 个技术部门 60+ 人，总体预算 8000 万/年' : 'Managed 5 engineering departments (60+), $8M annual budget',
          description: isZh
            ? ['负责 5 个技术团队管理，涵盖后端、前端、数据、运维、安全', '推动 OKR 管理制度，<strong>项目交付周期缩短 40%</strong>']
            : ['Managed backend, frontend, data, DevOps, and security teams', 'Implemented OKR system, <strong>reducing delivery cycles by 40%</strong>'],
        },
      ],
      education: [{
        id: 'edu_1', school: isZh ? '清华大学' : 'Stanford University',
        degree: isZh ? 'MBA' : 'MBA', major: isZh ? '工商管理' : 'Business Administration',
        startDate: '2013-09', endDate: '2015-06',
      }, {
        id: 'edu_2', school: isZh ? '北京大学' : 'Peking University',
        degree: isZh ? '本科' : "Bachelor's", major: 'Computer Science',
        startDate: '2006-09', endDate: '2010-06',
      }],
      skills: ['Technology Strategy', 'Team Leadership', 'Agile/OKR', 'Cloud Architecture', 'M&A Integration', 'Board Governance'],
      projects: [],
      certifications: [
        { id: 'cert_1', name: 'PMP Project Management Professional', date: '2016-08' },
        { id: 'cert_2', name: 'AWS Certified Solutions Architect', date: '2018-03' },
      ],
      languages: [
        { id: 'lang_1', name: isZh ? '中文' : 'Chinese', proficiency: 'native' },
        { id: 'lang_2', name: isZh ? '英语' : 'English', proficiency: 'fluent' },
      ],
    }),

    creative: () => ({
      category: 'creative',
      personalInfo: {
        name: isZh ? '林小美' : 'Mia Lin',
        email: isZh ? 'linxm@email.com' : 'mia.lin@email.com',
        phone: isZh ? '137-0000-6666' : '+1 (555) 666-7777',
        title: isZh ? '创意总监 / 品牌设计师' : 'Creative Director / Brand Designer',
        website: 'https://mialin.design', github: '', linkedin: 'https://linkedin.com/in/mialin',
        employmentStatus: 'employed', salaryExpectation: '30_50', workMode: 'remote', avatar: '', customFields: [],
      },
      advantages: isZh
        ? '<strong>10 年品牌设计经验</strong>，服务过 Nike、Apple 等国际品牌。擅长视觉识别系统设计、品牌策略与创意指导。<strong>获得 15+ 国际设计大奖</strong>，包括 Red Dot 与 iF 设计奖。'
        : '<strong>10+ years</strong> in brand design, worked with Nike, Apple, and global brands. Expert in visual identity, brand strategy, and creative direction. <strong>15+ international design awards</strong> including Red Dot and iF Design Award.',
      workExperience: [
        {
          id: 'exp_1', company: isZh ? '某创意工作室' : 'Creative Studio X', position: isZh ? '创意总监' : 'Creative Director',
          startDate: '2020-03', endDate: '', current: true,
          metrics: isZh ? '带领团队完成 50+ 品牌项目，客户续约率 90%' : 'Led 50+ brand projects, 90% client retention rate',
          description: isZh
            ? ['领导 15 人创意团队，服务 Nike、Apple 等国际客户', '<strong>品牌设计项目获得 Red Dot 最佳设计奖</strong>', '建立设计系统与品牌指南，被客户沿用 5 年以上']
            : ['Led a 15-person creative team serving Nike, Apple, and global clients', '<strong>Brand design project won Red Dot Best of the Best</strong>', 'Established design systems and brand guidelines used for 5+ years'],
        },
        {
          id: 'exp_2', company: isZh ? '4A 广告公司' : 'Omnicom Group', position: isZh ? '高级设计师' : 'Senior Designer',
          startDate: '2016-07', endDate: '2020-02', current: false,
          description: isZh
            ? ['负责多个国际品牌的中国市场本地化设计', '主导天猫超级品牌日视觉设计，<strong>单场活动曝光 5000 万+</strong>']
            : ['Led China market localization design for international brands', 'Directed visual design for Tmall Super Brand Day, <strong>50M+ impressions</strong>'],
        },
      ],
      education: [{
        id: 'edu_1', school: isZh ? '中央美术学院' : 'Rhode Island School of Design',
        degree: isZh ? '本科' : "Bachelor's", major: isZh ? '视觉传达设计' : 'Graphic Design',
        startDate: '2012-09', endDate: '2016-06', awards: isZh ? '优秀毕业设计奖' : 'Honors Thesis Award',
      }],
      skills: ['Brand Identity', 'UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Motion Design', 'Design Thinking', 'Art Direction'],
      projects: [
        {
          id: 'proj_1', name: 'Nike Air Max Campaign', role: 'Art Director',
          techStack: ['Branding', 'Print', 'Digital'],
          description: isZh ? 'Nike Air Max 全球 campaign 视觉设计。<strong>覆盖 15 个国家</strong>。' : 'Nike Air Max global campaign visual design. <strong>Launched across 15 countries</strong>.',
          url: 'https://mialin.design/nike', startDate: '2023-01', endDate: '2023-06',
        },
        {
          id: 'proj_2', name: 'Apple Store 艺术装置', role: 'Lead Designer',
          techStack: ['Installation', 'Spatial Design', 'Motion'],
          description: isZh ? '为 Apple Store 旗舰店设计的互动艺术装置。' : 'Interactive art installation for Apple Store flagship.',
          url: 'https://mialin.design/apple', startDate: '2022-06', endDate: '2022-12',
        },
      ],
      certifications: [{ id: 'cert_1', name: 'Red Dot Design Award 2023', date: '2023' }],
      languages: [
        { id: 'lang_1', name: isZh ? '中文' : 'Chinese', proficiency: 'native' },
        { id: 'lang_2', name: isZh ? '英语' : 'English', proficiency: 'advanced' },
      ],
    }),
  }

  return profiles[category]()
}

export const defaultResume = getDefaultResume('zh')

let counter = 0
export const genId = () => `field_${++counter}_${Date.now()}`
