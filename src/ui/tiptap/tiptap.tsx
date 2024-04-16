'use client'

import { EditorContent } from '@tiptap/react'
import { useInitEditor } from './hooks'
import ButtonList from './tiptap-buttons'
import Image from 'next/image'
import './index.css'
import { InputProps, transformFields } from '@/utils/editor-transform'
import { create } from '@/lib/api-myplus'
import TiptapBubble from './tiptap-bubble'
import { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

const Tiptap = () => {
  const editor = useInitEditor()
  const [openAI, setOpenAI] = useState(false)

  const [state, setState] = useState('文章标题 / Article Title')

  if (!editor) return

  const submit = () => {
    const target = JSON.stringify(transformFields(editor.getJSON().content as InputProps[]))
    create({ target })
  }

  return (
    <div>
      <div className="flex h-[64px] items-center justify-between border-b border-[rgba(2,20,37,0.1)] px-[32px]">
        <div className="flex items-center font-medium">
          <div className="mr-[28px] h-[24px] w-[24px] dark:invert">
            <Image src={'/editor/2.webp'} width={24} height={24} alt="" className=""></Image>
          </div>
          <div>
            <div className="mb-[4px] text-[15px]">文本编辑器</div>
            <div className="flex items-center text-[13px]">
              <div className="mr-[6px] h-[6px] w-[6px] rounded-[50%] bg-[#00D608]"></div>
              <div className="opacity-50">已自动保存至草稿箱</div>
            </div>
          </div>
        </div>
        <div className="absolute left-[50%] w-[756px] translate-x-[-50%] dark:invert">
          <ButtonList editor={editor}></ButtonList>
        </div>
        <div className="flex items-center">
          <Image src={'/editor/timer.webp'} width={24} height={24} alt="" className="dark:invert"></Image>
          <div className="mx-[16px] h-[18px] w-[1px] bg-[rgba(1,19,36,0.12)]"></div>
          <button className="mr-[12px] h-[34px] w-[72px] rounded-[8px] border border-border text-[15px] font-medium text-[#8E8C99]">
            存草稿
          </button>
          <button
            className="h-[34px] w-[72px] rounded-[8px] bg-[#ff4132] text-[15px] font-medium text-[#ffffff]"
            onClick={submit}
          >
            发布
          </button>
          <div className="mx-[16px] h-[18px] w-[1px] bg-[rgba(1,19,36,0.12)]"></div>
          <div className="h-[32px] w-[32px] rounded-[50%] bg-[#cccccc]"></div>
        </div>
      </div>

      <ScrollArea id="work-content-scroll-container" className="flex-auto">
        <div className="mx-auto w-[756px]">
          <div className="mb-[28px] pt-[52px]">
            <input
              className="mb-[20px] w-full bg-background text-[32px] font-[600] outline-none"
              value={state}
              onChange={(e) => {
                setState(e.target.value)
              }}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center rounded-[100px] bg-[rgba(2,19,36,0.05)] py-[6px] pl-[6px] pr-[12px]">
                  <div className="mr-[8px] h-[20px] w-[20px] rounded-[50%] bg-[#cccccc]"></div>
                  <div className="text-[15px]">Tom Raiden</div>
                </div>
                <div className="mx-[10px] h-[18px] w-[1px] bg-[rgba(1,19,36,0.12)]"></div>
                <div className="flex items-center rounded-[100px] border border-dashed border-[rgba(2,19,36,0.12)] py-[6px] pl-[6px] pr-[12px]">
                  <div className="mr-[8px] h-[20px] w-[20px] rounded-[50%] bg-[#cccccc]"></div>
                  <div className="text-[15px]">添加圈子</div>
                </div>
              </div>
              <div className="flex items-center gap-[12px] text-[15px]">
                <div>{new Date().toLocaleString()}</div>
                <div>广东</div>
                <div>0浏览</div>
              </div>
            </div>
          </div>
          <EditorContent editor={editor} />

          <TiptapBubble editor={editor} open={openAI} onOpenChange={setOpenAI}></TiptapBubble>
        </div>
      </ScrollArea>
    </div>
  )
}

export default Tiptap
