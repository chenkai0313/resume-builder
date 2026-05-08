import type { ResumeStyle } from '@/lib/types'
import Modern from './Modern'
import Classic from './Classic'
import Minimal from './Minimal'
import Professional from './Professional'
import Creative from './Creative'
import Compact from './Compact'
import Executive from './Executive'
import Sidebar from './Sidebar'
import Timeline from './Timeline'
import Simple from './Simple'

export interface StyleTemplate {
  id: ResumeStyle
  name: Record<string, string>
  component: React.ComponentType<{ data: import('@/lib/types').ResumeData; lang?: string }>
}

export const styles: StyleTemplate[] = [
  { id: 'modern', name: { en: 'Modern', zh: '现代' }, component: Modern },
  { id: 'classic', name: { en: 'Classic', zh: '经典' }, component: Classic },
  { id: 'minimal', name: { en: 'Minimal', zh: '简约' }, component: Minimal },
  { id: 'professional', name: { en: 'Professional', zh: '专业' }, component: Professional },
  { id: 'creative', name: { en: 'Creative', zh: '创意' }, component: Creative },
  { id: 'compact', name: { en: 'Compact', zh: '紧凑' }, component: Compact },
  { id: 'executive', name: { en: 'Executive', zh: '商务' }, component: Executive },
  { id: 'sidebar', name: { en: 'Sidebar', zh: '侧栏' }, component: Sidebar },
  { id: 'timeline', name: { en: 'Timeline', zh: '时间线' }, component: Timeline },
  { id: 'simple', name: { en: 'Simple', zh: '简洁' }, component: Simple },
]
