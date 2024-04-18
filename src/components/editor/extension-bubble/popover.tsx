import { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Brush, ChevronDown } from 'lucide-react'

interface IProps {
  editor: Editor | null
}

export default function HighlightMenu(props: IProps) {
  const { editor } = props
  if (editor == null) return

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          <Brush className="h-4 w-4" />
          &nbsp;
          <ChevronDown className="h-2 w-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <ColorPanel editor={editor} />
      </PopoverContent>
    </Popover>
  )
}

function ColorPanel(props: IProps) {
  const { editor } = props
  if (editor == null) return

  const colors = [
    { name: '橙色', color: '#ffc078' },
    { name: '绿色', color: '#8ce99a' },
    { name: '蓝色', color: '#74c0fc' },
    { name: '紫色', color: '#b197fc' },
    { name: '红色', color: 'red' }
  ]
  const ItemClassName = 'block px-3 py-1 m-1'

  return (
    <>
      {colors.map((item) => (
        <Button
          key={item.color}
          className={ItemClassName}
          size="sm"
          style={{ background: item.color }}
          onClick={() => editor.chain().focus().setHighlight({ color: item.color }).run()}
        >
          {item.name}
        </Button>
      ))}
      <Button
        className={ItemClassName}
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().unsetHighlight().run()}
      >
        清空
      </Button>
    </>
  )
}
