import { useEditor } from '@tiptap/react'
import { extensions } from './extensions'
import { useDebouncedCallback } from 'use-debounce'

export const useInitEditor = () => {
  const updateContent = useDebouncedCallback(() => {
    if (typeof window === 'undefined') return
    const data = editor?.getJSON()
    localStorage.setItem('editor-content', JSON.stringify(data))
  }, 1000)

  const editor = useEditor({
    editable: true,
    onUpdate() {
      updateContent()
    },
    extensions: [...extensions],
    content: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('editor-content') || '{}') : '',
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert w-full min-h-96 max-w-none focus:outline-none'
      }
    }
  })

  return editor
}
