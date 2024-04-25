import { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Ellipsis, Superscript, Subscript, Strikethrough } from 'lucide-react'

interface IProps {
  editor: Editor | null
}

export default function MoreMenu(props: IProps) {
  const { editor } = props
  if (editor == null) return

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          <Ellipsis className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          variant={editor.isActive('strike') ? 'secondary' : 'ghost'}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          variant={editor.isActive('superscript') ? 'secondary' : 'ghost'}
        >
          <Superscript className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          variant={editor.isActive('subscript') ? 'secondary' : 'ghost'}
        >
          <Subscript className="h-4 w-4" />
        </Button>
      </PopoverContent>
    </Popover>
  )
}
