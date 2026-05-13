import type { Translations } from './en'

const zh: Translations = {
  nav: {
    home: '首页',
    builder: '简历生成',
  },
  builder: {
    title: '简历生成器',
    subtitle: '填写信息，快速生成专业简历',
    preview: '预览',
    download: '下载 PDF',
    add: '添加',
    remove: '删除',
    clear: '清空数据',
    clearConfirm: '确定清空所有数据吗？',
    loadDefault: '加载示例数据',
    style: '简历风格',
    personalInfo: '个人信息',
    advantages: '个人优势',
    workExperience: '工作经历',
    education: '教育背景',
    skills: '技能',
    projects: '项目经历',
    certifications: '证书',
    languages: '语言能力',
    form: {
      name: '姓名',
      email: '邮箱',
      phone: '电话',
      title: '求职意向',
      website: '个人网站',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      company: '公司名称',
      position: '职位',
      startDate: '开始时间',
      endDate: '结束时间',
      current: '在职',
      description: '描述',
      addPoint: '添加要点',
      school: '学校',
      degree: '学位',
      major: '专业',
      projectName: '项目名称',
      role: '角色',
      techStack: '技术栈',
      projectUrl: '项目链接',
      certName: '证书名称',
      date: '日期',
      language: '语言',
      proficiency: '熟练程度',
      employmentStatus: '在职状态',
      salaryExpectation: '期望薪资',
      workMode: '工作模式',
      skillsPlaceholder: '输入技能后按回车...',
      typeAndEnter: '输入后按回车添加',
      addSkill: '添加技能',
      avatar: '头像',
      uploadPhoto: '上传',
      changePhoto: '更换',
      removePhoto: '删除',
      avatarErrorSize: '文件过大，最大 5MB。',
      avatarErrorType: '不支持的格式，请使用 JPEG 或 PNG。',
      gpa: 'GPA',
      awards: '获奖情况',
      metrics: '关键指标/KPI',
      category: '简历分类',
      bold: '加粗',
      italic: '斜体',
      customFieldLabel: '字段名称',
      customFieldLabelPlaceholder: '如：微信号、Skype...',
      customFieldValue: '内容',
      customFieldValuePlaceholder: '如：user123...',
      addCustomField: '添加自定义字段',
      proficiencyOptions: {
        native: '母语',
        fluent: '流利',
        advanced: '高级',
        intermediate: '中级',
        basic: '基础',
      },
    },
    salaryOptions: {
      under10: '10k以下',
      '10_20': '10-20k',
      '20_30': '20-30k',
      '30_50': '30-50k',
      above50: '50k以上',
    },
    employmentStatusOptions: {
      employed: '在职-看机会',
      unemployed: '离职-随时到岗',
      student: '应届生',
    },
    workModeOptions: {
      remote: '远程',
      office: '坐班',
      hybrid: '混合',
    },
    placeholder: {
      advantages: '你的核心优势和亮点...',
      description: '描述你的职责和成就...',
    },
    guide: {
      title: '如何制作一份出色的简历',
      intro: '按照以下三个步骤，制作一份招聘人员真正关注的简历。每个模板都针对特定职位类别量身定制——选择与目标行业匹配的模板。',
      step1Title: '选择分类',
      step1Desc: '通用模板对 ATS 友好，适用于大多数职位。技术模板突出技术栈和项目指标。高管模板聚焦领导力 KPI 和战略影响力。创意模板为设计和营销岗位提供作品集风格的布局。',
      step2Title: '填写信息',
      step2Desc: '要具体。与其写"提升团队绩效"，不如写"领导 5 人工程师团队交付了 3 个功能，将页面加载时间减少了 40%"。用数字和具体成果说话。使用行动动词：主导、设计、优化、上线、指导。',
      step3Title: '预览下载',
      step3Desc: '在预览弹窗中切换模板，看看哪种布局最适合你的内容。每个模板都适用于打印和 A4 格式。一键下载为 PDF——无水印，无需注册。',
      tips: '简历写作技巧',
      tip1: '用数据说话。"将营收提升 30%"比"负责营收增长"有说服力得多。',
      tip2: '每份简历都要针对投递岗位定制。通用的简历只会得到通用的结果。匹配职位描述中的关键词。',
      tip3: '工作经历不超过 10 年的尽量控制在一页。招聘人员在初筛时平均只花 6 秒。',
      tip4: '避免模糊的技能评分。列出具体的技术和工具。"精通 React、TypeScript、PostgreSQL"比"JavaScript：4/5"更专业。',
      tip5: '仔细校对。简历上的错别字传递粗心的信号。大声朗读、请朋友检查，或使用 Grammarly 等工具。',
    },
  },
  categories: {
    general: '通用模板',
    tech: '技术岗位',
    executive: '管理高管',
    creative: '创意营销',
  },
  styles: {
    minimalist: '极简时序',
    'ats-optimized': 'ATS 优化',
    'two-column': '现代双栏',
    traditional: '传统商务',
    'one-page-startup': '创业一页',
    'tech-stack': '技术栈聚焦',
    'entry-level': '应届入门',
    'career-changer': '转行功能型',
    web3: 'Web3/区块链',
    aiml: 'AI/ML 工程师',
    'remote-worker': '远程工作者',
    'data-scientist': '数据科学家',
    devops: 'DevOps 工程师',
    'exec-leadership': '高管领导力',
    'exec-summary': '高管摘要',
    'product-manager': '产品经理',
    'creative-designer': '创意设计师',
    freelancer: '自由职业者',
    'sales-bd': '销售/BD',
    'marketing-digital': '营销/数字',
  },
  footer: {
    copyright: '简历生成器。保留所有权利。',
    about: '关于我们',
    privacy: '隐私政策',
    terms: '服务条款',
    cookies: 'Cookie 政策',
    contact: '联系我们',
    friendLink: '站长工具',
    contactText: '有任何建议？请联系',
  },
  privacy: {
    title: '隐私政策',
    lastUpdated: '最后更新：2026年5月12日',
    sections: [
      {
        title: '我们收集的信息',
        content: '我们不会收集、存储或处理任何个人信息。您输入的所有简历数据完全在浏览器中处理，不会发送到我们的服务器。我们使用 Google AdSense 展示广告，广告服务可能会使用 Cookie 来提供相关广告。我们还使用百度统计来了解网站流量。',
      },
      {
        title: 'Cookie 使用',
        content: '我们使用 Cookie 用于三个目的：(1) 语言偏好——记住您偏好英文还是中文。(2) Google AdSense——用于投放个性化或非个性化广告。Google 可能会使用 Cookie 根据您之前访问本网站或其他网站的情况投放广告。(3) 百度统计——收集匿名流量统计数据，包括页面浏览量、访客数量和地域分布。有关所有使用的 Cookie 的详细信息，请参阅我们的 Cookie 政策。',
      },
      {
        title: '第三方服务',
        content: '我们使用 Google AdSense 投放广告和百度统计进行流量分析。Google 可能会根据您的浏览历史使用 Cookie 投放广告。百度统计收集匿名使用数据。您可以在 policies.google.com/technologies/partner-sites 了解更多信息。',
      },
      {
        title: '数据安全',
        content: '所有简历数据均在浏览器本地处理，不会传输到我们的服务器，您的数据安全地保存在您的设备上。无需注册或创建账户。隐私保护是此工具的核心设计原则。',
      },
      {
        title: '您的权利',
        content: '您可以随时通过浏览器设置禁用 Cookie。您也可以删除已经设置的 Cookie。您可以通过 Google 广告设置选择退出个性化广告。对于欧盟/欧洲经济区用户：根据 GDPR，您有权访问、更正和删除个人数据。',
      },
      {
        title: '联系方式',
        content: '如果您对本隐私政策有任何疑问，请通过 privacy@resbu.top 联系我们。',
      },
    ],
  },
  about: {
    title: '关于我们',
    content: `简历生成器的诞生源于一个简单的困扰：现有的简历工具要么收费昂贵，要么强制注册，要么生成丑陋、千篇一律的结果。

我在科技行业工作多年，坐在面试桌的两边——既作为工程师在创业公司和大型科技公司面试过，也作为招聘经理筛选过数百份简历。一个模式非常明显：简历结构清晰、排版干净的候选人，获得电话面试的几率是同等资历但简历排版混乱者的两倍。

然而，创建一份简洁简历的工具，要么是 SaaS 订阅服务（每月 20 美元换一个 PDF？），要么是需要学习曲线的桌面软件。免费的选项则充斥着广告，生成的简历没有人想看。

所以我按照三个原则构建了这个工具：

**永久免费。** 无需注册。没有付费版本。PDF 上没有水印。网站通过 Google AdSense 广告支持，这意味着它对所有人永久免费。

**你的数据保存在你的设备上。** 你在这里制作的每份简历完全在浏览器中处理。没有任何数据上传到我们的服务器。没有用户简历数据库。我们看不到你的数据，也不想看到。

**针对特定行业的模板。** 软件工程师的简历应该和市场营销总监的看起来不同。我们的 20 个模板涵盖四个分类——通用（ATS 优化）、技术（Web3、AI/ML、DevOps）、高管（领导力 KPI）和创意（作品集风格）——让你找到匹配行业规范的布局。

这是一个个人项目。我在维护它、写文章、处理用户支持。如果有任何问题或有建议，我会阅读每封邮件：support@resbu.top。`,
  },
  terms: {
    title: '服务条款',
    lastUpdated: '最后更新：2026年5月12日',
    sections: [
      {
        title: '条款接受',
        content: '使用简历生成器（resbu.top）即表示您同意这些服务条款。如果您不同意，请勿使用我们的服务。',
      },
      {
        title: '服务描述',
        content: '简历生成器是一款免费在线工具，允许您创建和下载简历。所有数据处理均在浏览器本地完成。我们不会存储、传输或访问您的简历数据。',
      },
      {
        title: '用户责任',
        content: '您对输入简历生成器的信息的准确性和合法性负全部责任。您同意不将本服务用于任何非法目的或违反任何适用法律。',
      },
      {
        title: '知识产权',
        content: '本网站的简历模板、设计和代码均为我们的知识产权。您可以将生成的简历用于个人非商业用途。未经许可，不得复制、分发或修改本网站。',
      },
      {
        title: '免责声明',
        content: '本服务按"现状"提供，不附带任何明示或暗示的保证。我们不保证服务的准确性、可靠性或可用性。我们保留随时修改或停止服务的权利。模板和指南仅供参考，不保证求职成功。',
      },
      {
        title: '责任限制',
        content: '对于您使用本服务所产生的任何损害，我们不承担任何责任。由于所有数据处理均在本地进行，我们对数据丢失或与您的设备/浏览器相关的任何问题概不负责。',
      },
      {
        title: '联系方式',
        content: '如有关于这些条款的问题，请联系 support@resbu.top。',
      },
    ],
  },
  cookiePolicy: {
    title: 'Cookie 政策',
    lastUpdated: '最后更新：2026年5月12日',
    intro: '本 Cookie 政策解释了什么是 Cookie、我们在 resbu.top 上如何使用它们，以及您如何控制它们。',
    whatAreCookies: {
      title: '什么是 Cookie',
      content: 'Cookie 是网站存储在您设备上的小型文本文件。它们帮助网站记住您的偏好、了解您如何使用网站，并提供相关内容和广告。',
    },
    howWeUse: {
      title: '我们如何使用 Cookie',
      content: '我们出于三个目的使用 Cookie：网站功能、广告和分析。',
    },
    cookieTable: {
      title: '本站使用的 Cookie',
      rows: [
        { name: 'locale', purpose: '存储您的语言偏好（英文或中文）', duration: '1年', category: '必要', provider: 'resbu.top' },
        { name: '_ga, _gid, _gat', purpose: 'Google Analytics Cookie——收集匿名使用统计', duration: '2年 / 24小时 / 1分钟', category: '分析', provider: 'Google LLC' },
        { name: 'IDE, DSID, test_cookie', purpose: 'Google AdSense Cookie——用于广告频次控制、测量和个性化', duration: '最长2年', category: '广告', provider: 'Google LLC' },
        { name: 'HMACCOUNT, Hm_lvt_*, Hm_lpvt_*', purpose: '百度统计 Cookie——针对中国市场的匿名流量统计', duration: '会话至1年', category: '分析', provider: 'Baidu Inc.' },
      ],
    },
    thirdParty: {
      title: '第三方 Cookie',
      content: 'Google AdSense 和百度统计在我们的网站上设置各自的 Cookie。我们无法控制这些 Cookie。详情请参阅 Google 的 Cookie 政策（policies.google.com/technologies/cookies）和百度的隐私政策。',
    },
    yourChoices: {
      title: '管理 Cookie',
      content: '您可以通过浏览器设置禁用 Cookie。大多数浏览器允许您阻止所有 Cookie、删除现有 Cookie，或仅阻止第三方 Cookie。您也可以在 adssettings.google.com 选择退出个性化 Google 广告。注意：禁用 Cookie 会影响 Google AdSense 广告的显示方式，但不会影响简历制作的核心功能。',
    },
    contact: {
      title: '问题',
      content: '如果您对本 Cookie 政策有任何疑问，请通过 privacy@resbu.top 联系我们。',
    },
  },
  contact: {
    title: '联系我们',
    intro: '有问题、反馈或发现 bug？我很乐意听取你的意见。',
    email: {
      title: '邮箱',
      content: '用于一般咨询、支持和反馈：',
      address: 'support@resbu.top',
    },
    privacy: {
      title: '隐私相关',
      content: '用于隐私相关事宜：',
      address: 'privacy@resbu.top',
    },
    responseTime: {
      title: '回复时间',
      content: '我通常在 24-48 小时内回复。这是一个人维护的项目，感谢你的耐心。',
    },
    feedback: {
      title: '反馈时请包含',
      bullets: [
        '报告 bug：描述你在做什么、发生了什么、使用的浏览器/设备。',
        '建议功能：描述你想解决的问题，而不仅仅是想要的功能。',
        '请求模板：告诉我目标行业以及它的简历格式有什么独特之处。',
      ],
    },
  },
  disclaimer: {
    title: '免责声明',
    lastUpdated: '最后更新：2026年5月12日',
    sections: [
      {
        title: '非专业建议',
        content: 'resbu.top 上的内容，包括简历模板、写作指南和博客文章，仅供参考。不构成专业职业建议、法律建议或人力资源咨询。对于具体的职业决策，请咨询合格的职业顾问。',
      },
      {
        title: '不保证结果',
        content: '使用我们的简历模板或遵循我们的写作指南不保证获得面试机会、工作 offer 或职业发展。求职市场取决于简历格式之外的许多因素。',
      },
      {
        title: '模板准确性',
        content: '我们尽合理努力确保模板符合行业最佳实践，但招聘惯例因地区、行业和公司规模而异。请始终仔细检查简历的准确性和对特定职位的适用性。',
      },
      {
        title: '外部链接',
        content: '我们的网站可能包含指向外部网站的链接。我们对这些网站的内容或隐私做法不负责。',
      },
    ],
  },
}

export default zh
