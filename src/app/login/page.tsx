import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from 'auth'

function LoginWithGitHub() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn()
      }}
    >
      <Button variant="outline" className="w-full">
        Login with Github
      </Button>
    </form>
  )
}

// function SignOut() {
//   return (
//     <form
//       action={async () => {
//         'use server'
//         await signOut()
//       }}
//     >
//       <button>Sign Out</button>
//     </form>
//   )
// }

export default function LoginForm() {
  return (
    <Card className="mx-auto mt-[20vh] max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            sign In
          </Button>
          <LoginWithGitHub></LoginWithGitHub>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/signUp" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
