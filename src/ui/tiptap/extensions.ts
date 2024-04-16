import StarterKit from '@tiptap/starter-kit'
import Card from './extension-card/src'
import Placeholder from '@tiptap/extension-placeholder'
import TiptapUnderline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import BubbleMenu from '@tiptap/extension-bubble-menu'
import Ai from './extension-ai/src'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import TextAlign from '@tiptap/extension-text-align'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import { Markdown } from 'tiptap-markdown'

import Slash from './extension-slash-commands/src'

export const extensions = [
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
      levels: [1, 2, 3, 4]
    },
    horizontalRule: {
      HTMLAttributes: {
        class: 'my-[20px]'
      }
    },
    paragraph: {
      HTMLAttributes: {
        // class: 'py-[3px] px-[2px]'
      }
    }
  }),
  Markdown.configure({
    html: false,
    transformCopiedText: true
  }),
  TiptapUnderline,
  Image,
  BubbleMenu.configure({}),
  Ai,
  Card.configure({
    HTMLAttributes: {
      class: 'w-[708px] h-[40px] border border-[#ff4132]'
    }
  }),
  Placeholder.configure({
    placeholder: 'Write something …'
  }),
  Slash,
  TaskList,
  TaskItem.configure({
    // nested: true
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph']
  }),
  Subscript,
  Superscript
]
