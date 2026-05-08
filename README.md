# Resume Builder - 在线简历生成器

A free, bilingual (English/Chinese) online resume builder built with Next.js. Create professional resumes with multiple templates, real-time preview, and one-click PDF download.

**Live site: [resbu.top](https://resbu.top)**

## Features

- **10 Professional Templates** — Modern, Classic, Minimal, Professional, Creative, Compact, Executive, Sidebar, Timeline, Simple
- **Real-time Preview** — See changes instantly, switch styles freely
- **PDF Export** — Download high-quality PDF via server-side rendering
- **Bilingual Support** — English and Chinese, one-click switch
- **Rich Text Editing** — Bold and italic formatting for descriptions
- **Tag-style Input** — Skills and tech stack with Enter-to-add
- **No Registration Required** — All data processed locally in your browser
- **100% Free** — Unlimited downloads, all features free

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Font**: Geist (via `next/font`)
- **PDF Service**: Go backend with chromedp (headless Chrome)
- **Analytics**: Baidu Analytics
- **Monetization**: Google AdSense

## Getting Started

```bash
npm install
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Production build + deploy to docs/
npm run lint       # Run linter
```

## Project Structure

```
├── app/
│   ├── [lang]/              # Locale-based routing (en/zh)
│   │   ├── page.tsx         # Homepage
│   │   ├── about/           # About Us
│   │   ├── builder/         # Resume builder tool
│   │   ├── privacy/         # Privacy Policy
│   │   └── terms/           # Terms of Service
│   ├── layout.tsx           # Root layout
│   ├── sitemap.ts           # Dynamic sitemap
│   └── globals.css          # Tailwind + theme
├── components/
│   ├── builder/             # Resume builder components
│   │   ├── forms/           # Form sections
│   │   └── styles/          # Resume templates
│   ├── ui/                  # shadcn/ui components
│   ├── Header.tsx
│   └── Footer.tsx
├── i18n/                    # Translation dictionaries
│   ├── en.ts
│   └── zh.ts
├── lib/                     # Utilities
├── context/                 # React context (ResumeProvider)
├── public/                  # Static assets
└── docs/                    # Static export (GitHub Pages)
```

## Deployment

The site is deployed on **GitHub Pages** from the `docs/` folder:

```bash
npm run build  # next build -> out/ -> docs/
```

A custom domain is configured via `public/CNAME`.

## SEO

- Bilingual `hreflang` tags for en/zh
- Open Graph and Twitter Card metadata
- JSON-LD structured data (WebSite + WebApplication)
- Dynamic XML sitemap
- `robots.txt`

## License

MIT
