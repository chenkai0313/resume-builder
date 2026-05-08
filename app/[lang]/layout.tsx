import ClientLayout from '@/components/ClientLayout'

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }]
}

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>
}
