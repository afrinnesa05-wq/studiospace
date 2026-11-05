
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  const user = session?.user

  if (!user) {
    const loginUrl = new URL('/login', request.url)

    loginUrl.searchParams.set(
      'callbackURL',
      request.nextUrl.pathname
    )

    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/my-listings/:path*',
    '/my-bookings/:path*',
    '/add-studio/:path*',
    '/studios/edit/:path*',
    '/profile/:path*',
  ],
}
