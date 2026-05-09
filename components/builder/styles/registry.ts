import type { ResumeCategory } from '@/lib/types'
import Minimalist from './01-Minimalist'
import ATSOptimized from './02-ATS-Optimized'
import TwoColumn from './03-TwoColumn'
import Traditional from './04-Traditional'
import OnePageStartup from './05-OnePageStartup'
import TechStack from './06-TechStack'
import EntryLevel from './07-EntryLevel'
import CareerChanger from './08-CareerChanger'
import Web3 from './09-Web3'
import AIML from './10-AIML'
import RemoteWorker from './11-RemoteWorker'
import DataScientist from './12-DataScientist'
import DevOps from './13-DevOps'
import ExecLeadership from './14-ExecutiveLeadership'
import ExecSummary from './15-ExecutiveSummary'
import ProductManager from './16-ProductManager'
import CreativeDesigner from './17-CreativeDesigner'
import Freelancer from './18-Freelancer'
import SalesBD from './19-SalesBD'
import MarketingDigital from './20-MarketingDigital'

export interface StyleTemplate {
  id: string
  name: Record<string, string>
  category: ResumeCategory
  component: React.ComponentType<{ data: import('@/lib/types').ResumeData; lang?: string }>
}

export const categories: { id: ResumeCategory; name: Record<string, string> }[] = [
  { id: 'general', name: { en: 'General', zh: '通用模板' } },
  { id: 'tech', name: { en: 'Technical', zh: '技术岗位' } },
  { id: 'executive', name: { en: 'Executive', zh: '管理高管' } },
  { id: 'creative', name: { en: 'Creative / Marketing', zh: '创意营销' } },
]

export const styles: StyleTemplate[] = [
  { id: 'minimalist', name: { en: 'Minimalist', zh: '极简时序' }, category: 'general', component: Minimalist },
  { id: 'ats-optimized', name: { en: 'ATS-Optimized', zh: 'ATS 优化' }, category: 'general', component: ATSOptimized },
  { id: 'two-column', name: { en: 'Modern Two-Column', zh: '现代双栏' }, category: 'general', component: TwoColumn },
  { id: 'traditional', name: { en: 'Traditional Corporate', zh: '传统商务' }, category: 'general', component: Traditional },
  { id: 'one-page-startup', name: { en: 'One-Page Startup', zh: '创业一页' }, category: 'general', component: OnePageStartup },
  { id: 'tech-stack', name: { en: 'Tech Stack Focus', zh: '技术栈聚焦' }, category: 'general', component: TechStack },
  { id: 'entry-level', name: { en: 'Entry-Level', zh: '应届入门' }, category: 'general', component: EntryLevel },
  { id: 'career-changer', name: { en: 'Career Changer', zh: '转行功能型' }, category: 'general', component: CareerChanger },
  { id: 'web3', name: { en: 'Web3/Blockchain', zh: 'Web3/区块链' }, category: 'tech', component: Web3 },
  { id: 'aiml', name: { en: 'AI/ML Engineer', zh: 'AI/ML 工程师' }, category: 'tech', component: AIML },
  { id: 'remote-worker', name: { en: 'Remote Worker', zh: '远程工作者' }, category: 'tech', component: RemoteWorker },
  { id: 'data-scientist', name: { en: 'Data Scientist', zh: '数据科学家' }, category: 'tech', component: DataScientist },
  { id: 'devops', name: { en: 'DevOps Engineer', zh: 'DevOps 工程师' }, category: 'tech', component: DevOps },
  { id: 'exec-leadership', name: { en: 'Executive Leadership', zh: '高管领导力' }, category: 'executive', component: ExecLeadership },
  { id: 'exec-summary', name: { en: 'Executive Summary', zh: '高管摘要' }, category: 'executive', component: ExecSummary },
  { id: 'product-manager', name: { en: 'Product Manager', zh: '产品经理' }, category: 'executive', component: ProductManager },
  { id: 'creative-designer', name: { en: 'Creative Designer', zh: '创意设计师' }, category: 'creative', component: CreativeDesigner },
  { id: 'freelancer', name: { en: 'Freelancer', zh: '自由职业者' }, category: 'creative', component: Freelancer },
  { id: 'sales-bd', name: { en: 'Sales / BD', zh: '销售/BD' }, category: 'creative', component: SalesBD },
  { id: 'marketing-digital', name: { en: 'Marketing / Digital', zh: '营销/数字' }, category: 'creative', component: MarketingDigital },
]
