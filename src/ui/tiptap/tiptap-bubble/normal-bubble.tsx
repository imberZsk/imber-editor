import { Editor } from '@tiptap/react'

const NormalBubble = ({ editor, setOpen }: { editor: Editor; setOpen: (open: boolean) => void }) => {
  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${editor.isActive('bold') ? 'is-active' : ''} border-r border-[#cccccc] px-[10px]`}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`editor.isActive('italic') ? 'is-active' : '' border-r border-[#cccccc] px-[10px]`}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${editor.isActive('strike') ? 'is-active' : ''} px-[10px]`}
      >
        strike
      </button>
    </>
  )
}

export default NormalBubble
