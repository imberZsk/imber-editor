import TipTap from '@/ui/tiptap'
import ClientComponent from './ClientComponent'
import ServerComponent from './ServerComponent'
import Button from './button'

export default function Home() {
  return (
    <main className="h-full">
      {/* <TipTap></TipTap> */}
      {/* eslint-disable-next-line react/no-children-prop */}
      {/* children*/}
      <ClientComponent>
        <ServerComponent></ServerComponent>
      </ClientComponent>
      <Button></Button>
    </main>
  )
}
