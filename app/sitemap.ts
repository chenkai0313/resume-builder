import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://resbu.top'
  const languages = ['en', 'zh']
  const routes = ['', '/builder', '/privacy', '/about', '/terms']
  const blogRoutes = ['/blog', '/blog/backend-system-design-interview-guide']

  const pages = routes.flatMap(route =>
    languages.map(lang => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  )

  const blogPages = blogRoutes.flatMap(route =>
    languages.map(lang => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))
  )

  return [...pages, ...blogPages]
}
