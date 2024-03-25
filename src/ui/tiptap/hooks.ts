import { useEditor } from '@tiptap/react'
import { extensionsConfig } from './extensions-config'

export const useInitEditor = () => {
  const editor = useEditor({
    editable: true,
    extensions: [...extensionsConfig],
    // content: '<p data-placeholder="Write something, or press space for AI, /  for commands…"></p>',
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none'
      }
    }
  })

  return editor
}
