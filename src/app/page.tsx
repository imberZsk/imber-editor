import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="">
      <div className="absolute left-[50%] mt-[30vh] translate-x-[-50%] translate-y-[-50%]">
        <div>要登陆了你才能进到dashboard</div>
        <br />
        <div className="flex justify-between">
          <Link href="/login">
            <Button>登陆</Button>
          </Link>
          <Link href="/signUp">
            <Button>注册</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
