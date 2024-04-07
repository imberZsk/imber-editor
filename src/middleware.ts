import NextAuth from 'next-auth'

const { auth } = NextAuth({
  providers: []
})

export default auth((req) => {
  const isLoggedIn = !!req.auth?.user

  // 没有登录则重定向到登录页
  if (!isLoggedIn && !req.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', req.nextUrl))
  } else if (isLoggedIn && !req.nextUrl.pathname.startsWith('/dashboard')) {
    // 已经登录并且访问的页面是以auth开头的，则重定向到用户页，不需要重新登录了
    return Response.redirect(new URL('/dashboard', req.nextUrl))
  }
})

// export { auth as middleware } from 'auth'

// 排除掉一些接口和静态资源
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
