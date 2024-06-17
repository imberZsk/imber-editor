import { auth, signIn, signOut } from 'auth'

function SignIn() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('github')
      }}
    >
      <p>You are not logged in 试试官网的dockerfile 2</p>
      <button type="submit">Sign in with GitHub</button>
      <div>{process.env.AUTH_URL}</div>
      <div>{process.env.AUTH_GITHUB_ID}</div>
      <div>{process.env.AUTH_GITHUB_SECRET}</div>
      <div>{process.env.AUTH_SECRET}</div>
      <div>{process.env.NEXTAUTH_URL}</div>
    </form>
  )
}

function SignOut({ children }: { children: React.ReactNode }) {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <p>{children}</p>
      <button type="submit">Sign out</button>
    </form>
  )
}

export default async function Page() {
  let session = await auth()
  let user = session?.user?.email

  return (
    <section>
      <h1>Home</h1>
      <div>{user ? <SignOut>{`Welcome ${user}`}</SignOut> : <SignIn />}</div>
    </section>
  )
}
