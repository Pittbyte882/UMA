import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If trying to access admin pages without being logged in
  if (req.nextUrl.pathname.startsWith('/admin') &&
      !req.nextUrl.pathname.startsWith('/admin/login')) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  // If already logged in and trying to access login page
  if (req.nextUrl.pathname.startsWith('/admin/login') && session) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*']
}