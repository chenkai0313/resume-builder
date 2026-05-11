export type BlogCategory = 'ai-tools' | 'tech' | 'interview'

export interface BlogPostMeta {
  slug: string
  category: BlogCategory
  date: string
  title: { en: string; zh: string }
  excerpt: { en: string; zh: string }
  content?: { en: string[]; zh: string[] }
  readTime: number
}

export function getPost(slug: string): BlogPostMeta | undefined {
  return posts.find((p) => p.slug === slug)
}

export const categories: { id: BlogCategory; name: { en: string; zh: string }; color: string }[] = [
  { id: 'ai-tools', name: { en: 'AI Tools News', zh: 'AI工具新闻' }, color: '#00E676' },
  { id: 'tech', name: { en: 'Tech Articles', zh: '技术文章分享' }, color: '#00BFA5' },
  { id: 'interview', name: { en: 'Interview Prep', zh: '面试题分享' }, color: '#69F0AE' },
]

export const posts: BlogPostMeta[] = [
  {
    slug: 'claude-code-best-practices',
    category: 'ai-tools',
    date: '2026-05-10',
    title: { en: 'Claude Code Best Practices: 10 Tips to Supercharge Your Workflow', zh: 'Claude Code 最佳实践：10个技巧提升开发效率' },
    excerpt: { en: 'Discover how top developers use Claude Code to ship faster, write better tests, and navigate complex codebases with ease.', zh: '了解顶级开发者如何利用 Claude Code 更快交付、编写更优质的测试，轻松驾驭复杂代码库。' },
    readTime: 8,
  },
  {
    slug: 'cursor-vs-copilot-2026',
    category: 'ai-tools',
    date: '2026-05-08',
    title: { en: 'Cursor vs GitHub Copilot in 2026: Which AI Coding Assistant Wins?', zh: '2026年 Cursor vs GitHub Copilot：谁才是 AI 编程助手之王？' },
    excerpt: { en: 'A detailed comparison of the two leading AI coding assistants. We compare context handling, code generation accuracy, and overall developer experience.', zh: '深入对比两大主流 AI 编程助手的上下文理解、代码生成准确率和开发者体验。' },
    readTime: 6,
  },
  {
    slug: 'gpt5-developer-impact',
    category: 'ai-tools',
    date: '2026-05-05',
    title: { en: 'How GPT-5 is Changing Software Development in 2026', zh: 'GPT-5 如何改变 2026 年的软件开发' },
    excerpt: { en: 'From autonomous debugging to architecture design, GPT-5 is reshaping every stage of the development lifecycle.', zh: '从自主调试到架构设计，GPT-5 正在重塑开发生命周期的每个阶段。' },
    readTime: 7,
  },
  {
    slug: 'nextjs-server-components-guide',
    category: 'tech',
    date: '2026-05-07',
    title: { en: 'A Complete Guide to Next.js Server Components in 2026', zh: '2026 年 Next.js 服务端组件完全指南' },
    excerpt: { en: 'Understand the mental model behind React Server Components, streaming SSR, and how to avoid the most common pitfalls.', zh: '理解 React 服务端组件的思维模型、流式 SSR 以及如何避开最常见的坑。' },
    readTime: 10,
  },
  {
    slug: 'rust-vs-go-backend-2026',
    category: 'tech',
    date: '2026-05-03',
    title: { en: 'Rust vs Go for Backend in 2026: Making the Right Choice', zh: '2026 年后端选型：Rust vs Go 如何抉择' },
    excerpt: { en: 'Performance benchmarks, ecosystem maturity, hiring considerations — everything you need to pick the right backend language.', zh: '性能基准测试、生态成熟度、招聘考量——选择正确后端语言的全方位分析。' },
    readTime: 9,
  },
  {
    slug: 'react-performance-optimization',
    category: 'tech',
    date: '2026-04-28',
    title: { en: 'React Performance: 7 Optimization Techniques That Actually Work', zh: 'React 性能优化：7个真正有效的技巧' },
    excerpt: { en: 'Move beyond useMemo and useCallback. Learn advanced patterns like selector-based state, virtualization, and render path optimization.', zh: '超越 useMemo 和 useCallback，学习基于选择器的状态管理、虚拟化和渲染路径优化等高级模式。' },
    readTime: 7,
  },
  {
    slug: 'javascript-closure-interview',
    category: 'interview',
    date: '2026-05-09',
    title: { en: 'JavaScript Closure Interview Questions Explained', zh: 'JavaScript 闭包面试题详解' },
    excerpt: { en: 'Master one of the most frequently asked JavaScript interview topics. From basic concepts to tricky real-world scenarios.', zh: '攻克 JavaScript 面试中最高频的考点。从基础概念到棘手的实战场景，一网打尽。' },
    readTime: 6,
  },
  {
    slug: 'system-design-url-shortener',
    category: 'interview',
    date: '2026-05-06',
    title: { en: 'System Design Interview: Build a URL Shortener Like TinyURL', zh: '系统设计面试：构建一个 TinyURL 短链接服务' },
    excerpt: { en: 'A step-by-step system design walkthrough covering database schema, API design, rate limiting, and scaling to 100M users.', zh: '逐步拆解系统设计面试题，涵盖数据库设计、API 设计、限流和扩展到1亿用户。' },
    readTime: 12,
  },
  {
    slug: 'react-hooks-deep-dive',
    category: 'interview',
    date: '2026-05-01',
    title: { en: 'React Hooks Deep Dive: Questions Asked at FAANG Interviews', zh: 'React Hooks 深度解析：FAANG 级别面试真题' },
    excerpt: { en: 'From useState internals to custom hooks and useEffect timing — the hooks knowledge that sets senior candidates apart.', zh: '从 useState 内部原理到自定义 Hooks 和 useEffect 时序——区分高级候选人的 Hooks 知识。' },
    readTime: 8,
  },
]
