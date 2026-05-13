import { NextRequest, NextResponse } from 'next/server'

const SUPPORTED_LOCALES = ['en', 'zh']
const DEFAULT_LOCALE = 'en'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  const cookieLocale = request.cookies.get('locale')?.value
  const locale = cookieLocale || DEFAULT_LOCALE

  const newUrl = request.nextUrl.clone()
  newUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(newUrl)
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|CNAME|.nojekyll).*)'],
}
