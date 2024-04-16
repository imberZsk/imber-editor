// import NextAuth from 'next-auth'
// import GitHub from 'next-auth/providers/github'
// import { PrismaAdapter } from '@auth/prisma-adapter'
// import type { NextAuthConfig } from 'next-auth'
// import { prisma } from '@/lib/prisma'
// import Email from 'next-auth/providers/nodemailer'

// export const config = {
//   // pages: {
//   // 自定义的时候使用
//   //   signIn: '/login'
//   // },
//   // basePath: '/auth',
//   adapter: PrismaAdapter(prisma),
//   theme: {
//     logo: 'https://next-auth.js.org/img/logo/logo-sm.png'
//   },
//   providers: [
//     GitHub,
//     Email({
//       server: process.env.EMAIL_SERVER,
//       from: process.env.EMAIL_FROM
//     })
//   ],
//   session: {
//     strategy: 'jwt'
//   },
//   callbacks: {
//     authorized({ request: { nextUrl }, auth }) {
//       console.log('111')
//       const isLoggedIn = !!auth?.user
//       // 如果是这个页面就要鉴权
//       const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
//       if (isOnDashboard) {
//         if (isLoggedIn) return true
//         return false // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/dashboard', nextUrl))
//       }
//       return true
//     }
//     // jwt({ token, trigger, session }) {
//     //   if (trigger === 'update') token.name = session.user.name
//     //   return token
//     // }
//   }
// } satisfies NextAuthConfig

// export const { handlers, auth, signIn, signOut } = NextAuth(config)
