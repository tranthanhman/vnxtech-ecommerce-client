import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  if ((pathname === '/login' || pathname === '/register') && request.cookies.has('accessToken')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (pathname === '/account' && !request.cookies.has('accessToken')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/register', '/account']
} 