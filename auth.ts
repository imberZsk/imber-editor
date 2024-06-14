import NextAuth from 'next-auth'
import 'next-auth/jwt'

import GitHub from 'next-auth/providers/github'

import type { NextAuthConfig } from 'next-auth'

const config = {
  theme: { logo: 'https://authjs.dev/img/logo-sm.png' },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    })
  ],
  secret: process.env.AUTH_SECRET,
  basePath: '/auth',
  trustHost: true,
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === '/middleware-example') return !!auth
      return true
    },
    jwt({ token, trigger, session, account }) {
      if (trigger === 'update') token.name = session.user.name
      if (account?.provider === 'keycloak') {
        return { ...token, accessToken: account.access_token }
      }
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      return session
    }
  },
  experimental: {
    enableWebAuthn: true
  },
  debug: process.env.NODE_ENV !== 'production' ? true : false
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

declare module 'next-auth' {
  interface Session {
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
  }
}
