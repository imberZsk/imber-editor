import { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { Bold, Italic, Underline, Code } from 'lucide-react'

const BaseMenu = ({ editor, setOpen, bubble }: { editor: Editor; setOpen: (open: boolean) => void; bubble: any }) => {
  return (
    <>
      <Button
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
      >
        <Bold className="h-4 w-4" />
      </Button>

      <Button
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Button
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        variant={editor.isActive('underline') ? 'secondary' : 'ghost'}
      >
        <Underline className="h-4 w-4" />
      </Button>

      <Button
        size="sm"
        onClick={() => editor.chain().focus().toggleCode().run()}
        variant={editor.isActive('code') ? 'secondary' : 'ghost'}
      >
        <Code className="h-4 w-4" />
      </Button>
    </>
  )
}

export default BaseMenu
