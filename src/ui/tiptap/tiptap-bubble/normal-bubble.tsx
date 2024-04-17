import { Editor } from '@tiptap/react'
// import HighLight from './highLight'
import Popover from './popover'
import { Button } from '@/components/ui/button'

const NormalBubble = ({
  editor,
  setOpen,
  bubble
}: {
  editor: Editor
  setOpen: (open: boolean) => void
  bubble: any
}) => {
  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${editor.isActive('bold') ? 'is-active' : ''}`}
      >
        bold
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`editor.isActive('italic') ? 'is-active' : ''`}
      >
        italic
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${editor.isActive('strike') ? 'is-active' : ''}`}
      >
        strike
      </Button>
      {/* <HighLight bubble={bubble} /> */}
      <Popover editor={editor}></Popover>
    </>
  )
}

export default NormalBubble
