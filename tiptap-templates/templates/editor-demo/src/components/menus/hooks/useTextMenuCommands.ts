import { Editor } from '@tiptap/react'
import { useCallback } from 'react'

// 命令管理 Hook
export const useTextMenuCommands = (editor: Editor) => {
  const onBold = useCallback(
    () => editor.chain().focus().toggleBold().run(),
    [editor]
  )
  const onItalic = useCallback(
    () => editor.chain().focus().toggleItalic().run(),
    [editor]
  )
  const onStrike = useCallback(
    () => editor.chain().focus().toggleStrike().run(),
    [editor]
  )
  const onUnderline = useCallback(
    () => editor.chain().focus().toggleUnderline().run(),
    [editor]
  )
  const onCode = useCallback(
    () => editor.chain().focus().toggleCode().run(),
    [editor]
  )
  const onAlignLeft = useCallback(
    () => editor.chain().focus().setTextAlign('left').run(),
    [editor]
  )
  const onAlignCenter = useCallback(
    () => editor.chain().focus().setTextAlign('center').run(),
    [editor]
  )
  const onAlignRight = useCallback(
    () => editor.chain().focus().setTextAlign('right').run(),
    [editor]
  )
  const onHorizontalRule = useCallback(
    () => editor.chain().focus().setHorizontalRule().run(),
    [editor]
  )
  const onHighlightBlock = useCallback(
    () => editor.chain().toggleHighlightBlock().run(),
    [editor]
  )

  return {
    onBold,
    onItalic,
    onStrike,
    onUnderline,
    onCode,
    onAlignLeft,
    onAlignCenter,
    onAlignRight,
    onHorizontalRule,
    onHighlightBlock
  }
}
