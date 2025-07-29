// export { auth as default } from 'auth'

// // Optionally, don't invoke Middleware on some paths
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
// }

import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/editor', request.url))
}

export const config = {
  matcher: '/'
}
