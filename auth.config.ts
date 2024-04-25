import GitHub from 'next-auth/providers/github'
import type { NextAuthConfig } from 'next-auth'

export default {
  providers: [GitHub],
  trustHost: true,
  callbacks: {
    authorized({ request, auth }) {
      if (!auth) return false
      return true
    }
  }
} satisfies NextAuthConfig
