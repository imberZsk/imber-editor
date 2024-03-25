import StarterKit from '@tiptap/starter-kit'
import Card from './extension-card/src'
import Placeholder from '@tiptap/extension-placeholder'

export const extensionsConfig = [
  StarterKit.configure({
    blockquote: {
      HTMLAttributes: {
        class: 'border-l-4 border-stone-700'
      }
    },
    bold: {
      HTMLAttributes: {
        class: 'font-bold'
      }
    },
    heading: {
      levels: [1, 2, 3]
    },
    horizontalRule: {
      HTMLAttributes: {
        class: 'my-[20px]'
      }
    }
  }),
  Card.configure({
    HTMLAttributes: {
      class: 'w-[708px] h-[40px] border border-[#ff4132]'
    }
  }),
  Placeholder.configure({
    placeholder: 'Write something …'
  })
]
