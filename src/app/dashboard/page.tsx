import { Button } from '@/components/ui/button'
import { auth, signOut } from 'auth'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { ProfileForm } from '@/components/form-demo'

interface User {
  name: string
  email: string
  image: string
}

function LoginOut() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <Button>退出登陆</Button>
    </form>
  )
}

export default async function Home() {
  const session = (await auth()) as { user: User }
  const { user } = session

  return (
    <main className="">
      <div className="absolute left-[50%] mt-[30vh] translate-x-[-50%] translate-y-[-50%]">
        <div>你已经登陆，你现在在dashboard</div>
        <br />
        <div>
          <div>用户名：{user.name}</div>
          <br />
          <LoginOut></LoginOut>
        </div>
        <br />
        <Dialog>
          <DialogTrigger asChild>
            {/* <Button variant="outline">Edit Profile</Button> */}
            <Button>弹框</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>Make changes to your profile here. Click save when you re done.</DialogDescription>
            </DialogHeader>
            {/* 封装Form */}
            <ProfileForm></ProfileForm>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  )
}
