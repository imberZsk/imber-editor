import { getAiGcDocumentFriend, getAiGcPolish } from '@/lib/api-myplus'
import { Editor } from '@tiptap/react'
import { useRef, useState } from 'react'
import Typed from 'typed.js'
import '@/styles/loading.css'
import { Button } from '@/components/ui/button'

const AISelector = ({ editor, selection }: { editor: Editor; selection: string }) => {
  const el1 = useRef(null)
  const typed = useRef<Typed | null>(null)
  const [aiData, setAiData] = useState('')
  const [loading, serLoading] = useState(false)
  const [typedStatus, setTypedStatus] = useState(true)

  const handleAiGcDocumentFriend = async () => {
    serLoading(true)
    const tar = await getAiGcDocumentFriend(selection)
    if (typed.current) {
      typed.current?.destroy()
    }
    serLoading(false)
    typed.current = new Typed(el1.current, {
      strings: [tar],
      typeSpeed: 50,
      onComplete: () => {
        setTypedStatus(false)
      }
    })
    setAiData(tar)
    typed.current.start()
  }

  const handleAiGcPolish = async () => {
    serLoading(true)
    const tar = await getAiGcPolish(selection)
    if (typed.current) {
      typed.current?.destroy()
    }
    serLoading(false)
    typed.current = new Typed(el1.current, {
      strings: [tar],
      typeSpeed: 50,
      onComplete: () => {
        setTypedStatus(false)
      }
    })
    setAiData(tar)
    typed.current.start()
  }

  return (
    <div className="bg-card-background border border-border p-[10px]">
      <div className="mb-[6px] border-b border-[#cccccc] pb-[6px]">
        <button onClick={handleAiGcDocumentFriend} className={`border-r border-[#cccccc] px-[10px]`}>
          AI - 根据关键词生成朋友圈文案
        </button>
        <button onClick={handleAiGcPolish} className={`px-[10px]`}>
          AI - 润色
        </button>
      </div>
      <div className="type-wrap w-full">
        <span style={{ whiteSpace: 'wrap' }} ref={el1}></span>
      </div>
      {loading && (
        <div
          className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.1)]"
          style={{ backdropFilter: 'blur(5px)' }}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div className="loader-ui"></div>
        </div>
      )}
      <div className="mt-[10px] pt-[10px]">
        {!typedStatus && (
          <Button
            variant={'default'}
            className="h-[34px] rounded-[8px] px-[10px] text-[15px] font-medium"
            onClick={() => {
              if (typedStatus) return
              editor.commands.insertContent(aiData)
            }}
          >
            插入到编辑器
          </Button>
        )}
      </div>
    </div>
  )
}

export default AISelector
