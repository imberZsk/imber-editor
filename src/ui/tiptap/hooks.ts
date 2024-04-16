import { useEditor } from '@tiptap/react'
import { extensions } from './extensions'

export const useInitEditor = () => {
  const editor = useEditor({
    editable: true,
    onUpdate(self) {
      // console.log(self.editor.getJSON())
    },
    extensions: [...extensions],
    // content: '<p data-placeholder="Write something, or press space for AI, /  for commands…"></p>',
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert w-full min-h-96 max-w-none focus:outline-none'
      }
    }
  })

  return editor
}
