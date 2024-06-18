// import NextAuth from 'next-auth'
// import 'next-auth/jwt'

// import GitHub from 'next-auth/providers/github'

// import type { NextAuthConfig } from 'next-auth'

// const config = {
//   theme: { logo: 'https://authjs.dev/img/logo-sm.png' },
//   providers: [
//     GitHub({
//       clientId: process.env.AUTH_GITHUB_ID,
//       clientSecret: process.env.AUTH_GITHUB_SECRET
//     })
//   ],
//   secret: process.env.AUTH_SECRET,
//   basePath: '/auth',
//   trustHost: true,
//   experimental: {
//     enableWebAuthn: true
//   }
//   // debug: process.env.NODE_ENV !== 'production' ? true : false
// } satisfies NextAuthConfig

// export const { handlers, auth, signIn, signOut } = NextAuth(config)

// declare module 'next-auth' {
//   interface Session {
//     accessToken?: string
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     accessToken?: string
//   }
// }

import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  providers: [GitHub]
})
