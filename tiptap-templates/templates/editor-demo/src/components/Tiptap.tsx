'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import { useDebouncedCallback } from 'use-debounce'
import { cn } from '@/lib/utils'
import { TextMenu } from './menus'
import TextAlign from '@tiptap/extension-text-align'
import { HighLightBlock } from '../extensions/HighlightBlock'
import { TextStyle, Color } from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import CustomBlockquote from '@/extensions/CustomBlockquote/CustomBlockquote'

const classNames = 'h-full focus:outline-none min-h-40'

// 正文：16 1.6 2%，组件间距 16px
const TextClassNames =
  '[&_p]:text-base [&_p]:leading-[1.6] [&_p]:tracking-[2%] [&_p]:my-4'

// 标题组件
const HeadingClassNames = cn(
  '[&_h1]:text-[22px] [&_h1]:leading-[1.5] [&_h1]:tracking-[2%] [&_h1]:my-4 [&_h1]:font-semibold',
  '[&_h2]:text-[19px] [&_h2]:leading-[1.5] [&_h2]:tracking-[2%] [&_h2]:my-4 [&_h2]:font-semibold',
  '[&_h3]:text-[17px] [&_h3]:leading-[1.6] [&_h3]:tracking-[2%] [&_h3]:my-4 [&_h3]:font-semibold'
)

// 分割线
const HorizontalRuleClassNames = '[&_hr]:my-4'

// 超链接
const LinkClassNames =
  '[&_a]:text-blue-500 [&_a]:underline [&_a]:cursor-pointer'

// 粗体
const BoldClassNames = '[&_strong]:font-bold'

// 代码块
const CodeBlockClassNames =
  '[&_code]:bg-gray-100 [&_code]:dark:bg-gray-800 [&_code]:p-4 [&_code]:my-4 [&_code]:block [&_code]:rounded-md'

// 引用 - 支持多种颜色
const BlockquoteClassNames = cn(
  '[&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:my-4',
  // 不同颜色的 blockquote
  '[&_blockquote.blockquote-gray]:border-gray-300 [&_blockquote.blockquote-gray]:dark:border-gray-600',
  '[&_blockquote.blockquote-blue]:border-blue-500',
  '[&_blockquote.blockquote-green]:border-green-500',
  '[&_blockquote.blockquote-purple]:border-purple-500',
  '[&_blockquote.blockquote-orange]:border-orange-500'
)

// 高亮块
const HighlightBlockClassNames = cn(
  // '[&_[data-type="highlightBlock"]]:p-4',
  "[&_[data-type='highlightBlock']]:p-4 [&_[data-type='highlightBlock']]:my-4",
  // 不同颜色的高亮块
  '[&_.highlightBlock-gray]:bg-gray-100',
  '[&_.highlightBlock-blue]:bg-blue-500',
  '[&_.highlightBlock-green]:bg-green-500',
  '[&_.highlightBlock-purple]:bg-purple-500',
  '[&_.highlightBlock-orange]:bg-orange-500'
)

const Tiptap = () => {
  const updateContent = useDebouncedCallback(() => {
    if (typeof window === 'undefined') return
    const data = editor?.getJSON()
    localStorage.setItem('editor-content', JSON.stringify(data))
  }, 1000)

  const editor = useEditor({
    onUpdate() {
      updateContent()
    },
    // onSelectionUpdate() {
    //   console.log(editor?.isActive('color'))
    // },
    content:
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('editor-content') || '{}')
        : '',
    extensions: [
      StarterKit.configure({
        blockquote: false
      }),
      Placeholder.configure({
        placeholder: `Write something, ' / ' for commands…`
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      HighLightBlock,
      TextStyle,
      Color,
      Highlight,
      CustomBlockquote
    ],
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: classNames
      }
    }
  })

  if (!editor) return null

  return (
    <>
      <EditorContent
        editor={editor}
        className={cn(
          'editor-content',
          TextClassNames,
          HeadingClassNames,
          HorizontalRuleClassNames,
          LinkClassNames,
          BoldClassNames,
          CodeBlockClassNames,
          BlockquoteClassNames,
          HighlightBlockClassNames
        )}
      />
      <TextMenu editor={editor} />
    </>
  )
}

export default Tiptap
