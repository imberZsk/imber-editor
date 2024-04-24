// import { Markdown } from 'tiptap-markdown'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TiptapUnderline from '@tiptap/extension-underline'
// import Image from '@tiptap/extension-image'
import BubbleMenu from '@tiptap/extension-bubble-menu'
// import Ai from './extension-ai/src'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import TextAlign from '@tiptap/extension-text-align'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Highlight from '@tiptap/extension-highlight'
import Slash from './extension-slash-commands/src'
import { Column, Columns } from './extension-column'
import Document from './extension-document'
import Link from '@tiptap/extension-link'
import ImageBlock from './extension-image/image-block'
import { ImageUpload } from './extension-image/image-upload'
import FileHandler from '@tiptap-pro/extension-file-handler'
import { uploadImageAPI } from './utils/api'

export const extensions = [
  Column,
  Columns,
  Document,
  StarterKit.configure({
    document: false,
    heading: {
      levels: [1, 2, 3, 4]
    }
  }),
  // Markdown.configure({
  //   html: false,
  //   transformCopiedText: true
  // }),
  TiptapUnderline,
  // Image,
  BubbleMenu.configure({}),
  // Ai,
  Placeholder.configure({
    placeholder: `Write something, ' / ' for commands…`
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
  Superscript,
  Highlight.configure({
    multicolor: true
  }),
  Link.configure({
    openOnClick: false,
    autolink: true
  }),
  ImageBlock,
  ImageUpload,
  // FileHandler.configure({
  //   allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
  //   onDrop: (currentEditor, files, pos) => {
  //     files.forEach((file) => {
  //       const fileReader = new FileReader()

  //       fileReader.readAsDataURL(file)
  //       fileReader.onload = () => {
  //         currentEditor
  //           .chain()
  //           .insertContentAt(pos, {
  //             type: 'image',
  //             attrs: {
  //               src: fileReader.result
  //             }
  //           })
  //           .focus()
  //           .run()
  //       }
  //     })
  //   },
  FileHandler.configure({
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
    onDrop: (currentEditor, files, pos) => {
      files.forEach(async () => {
        const url = await uploadImageAPI()

        currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run()
      })
    },
    onPaste: (currentEditor, files) => {
      files.forEach(async () => {
        const url = await uploadImageAPI()

        return currentEditor
          .chain()
          .setImageBlockAt({
            pos: currentEditor.state.selection.anchor,
            src: url
          })
          .focus()
          .run()
      })
    }
  })
]
