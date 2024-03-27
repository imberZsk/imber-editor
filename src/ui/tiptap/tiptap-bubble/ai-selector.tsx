import { getAiGcDocumentFriend } from '@/lib/api-myplus'
import { Editor } from '@tiptap/react'
import { useRef, useState } from 'react'
import Typed from 'typed.js'

const AISelector = ({ editor }: { editor: Editor }) => {
  const el1 = useRef(null)
  const typed = useRef<Typed | null>(null)
  const [aiData, setAiData] = useState('')

  const handleAI1 = async () => {
    const tar = await getAiGcDocumentFriend()
    if (typed.current) {
      typed.current?.destroy()
    }
    typed.current = new Typed(el1.current, {
      strings: [tar],
      typeSpeed: 50
    })
    setAiData(tar)
    typed.current.start()
  }

  return (
    <div className="p-[10px]">
      <div className="mb-[6px] border-b border-[#cccccc] pb-[6px]">
        <button onClick={handleAI1} className={`border-r border-[#cccccc] px-[10px]`}>
          AI - 根据关键词生成朋友圈文案
        </button>
        <button onClick={() => {}} className={`px-[10px]`}>
          AI - 润色
        </button>
      </div>
      <div className="type-wrap w-full">
        <span style={{ whiteSpace: 'wrap' }} ref={el1}></span>
      </div>
      <div className="mt-[10px] border-t border-[#cccccc] pt-[10px]">
        <button
          className="h-[34px] rounded-[8px] bg-[#ff4132] px-[10px] text-[15px] font-medium text-[#ffffff]"
          onClick={() => {
            editor.commands.insertContent(aiData)
          }}
        >
          插入到编辑器
        </button>
      </div>
    </div>
  )
}

export default AISelector
