import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'Free Online Resume Builder',
  description: 'Create professional resumes online for free. Build, preview, and download your resume in minutes.',
  icons: { icon: '/favicon.svg' },
  keywords: ['free resume builder', 'online resume maker', 'CV builder', 'resume template', 'professional resume', 'resume generator', 'create resume online'],
  openGraph: {
    title: 'Free Online Resume Builder',
    description: 'Create professional resumes online for free. Build, preview, and download your resume in minutes.',
    url: 'https://resbu.top',
    siteName: 'Resume Builder',
    locale: 'en_US',
    alternateLocale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Resume Builder',
    description: 'Create professional resumes online for free. Build, preview, and download your resume in minutes.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(GeistSans.className, "font-sans", geist.variable, "dark")}>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2997084266989115" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{
          __html: `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?9b959e198583587f1266dfee59545ea4";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
`
        }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
