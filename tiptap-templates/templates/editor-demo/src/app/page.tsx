import Tiptap from '@/components/Tiptap'
import { TipTapTheme } from '@/components/Tiptap-theme'
import TipTapTitle from '@/components/Tiptap-title'

export default function Home() {
  return (
    <div className="max-w-180 mx-auto min-h-40 w-full pt-14 px-4">
      <TipTapTheme />
      <TipTapTitle />
      <Tiptap />
    </div>
  )
}
