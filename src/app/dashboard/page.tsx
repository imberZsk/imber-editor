import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="">
      <div className="absolute left-[50%] mt-[30vh] translate-x-[-50%] translate-y-[-50%]">
        <div>你已经登陆，你现在在dashboard</div>
        <br />
        <div>
          <div>用户名：</div>
          <br />
          <Link href={'/login'}>
            <Button>退出登陆</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
