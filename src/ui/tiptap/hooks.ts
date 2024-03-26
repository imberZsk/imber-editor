import { useEditor } from '@tiptap/react'
import { extensions } from './extensions'

export const useInitEditor = () => {
  const editor = useEditor({
    editable: true,
    extensions: [...extensions],
    // content: '<p data-placeholder="Write something, or press space for AI, /  for commands…"></p>',
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl px-[2px] py-[3px] focus:outline-none'
      }
    }
  })

  return editor
}
