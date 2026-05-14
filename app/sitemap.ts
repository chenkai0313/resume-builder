import type { MetadataRoute } from 'next'
import { posts } from '@/lib/blog-data'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://resbu.top'
  const languages = ['en', 'zh']
  const routes = ['', '/builder', '/privacy', '/about', '/terms', '/cookie-policy', '/contact']

  const pages = routes.flatMap(route =>
    languages.map(lang => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  )

  const blogIndexPages = languages.map(lang => ({
    url: `${baseUrl}/${lang}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const blogPostPages = posts.flatMap(post =>
    languages.map(lang => ({
      url: `${baseUrl}/${lang}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))
  )

  return [...pages, ...blogIndexPages, ...blogPostPages]
}
