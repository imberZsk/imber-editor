import { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Link } from 'lucide-react'
import { LinkEditPanel } from '../link-menu/edit-panel'

interface IProps {
  editor: Editor | null
}

export default function SetLinkMenu(props: IProps) {
  const { editor } = props
  if (editor == null) return

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          <Link className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-1">
        <LinkEditPanel
          onSetLink={(url: string, inNewTab?: boolean) =>
            editor
              .chain()
              .focus()
              .setLink({ href: url, target: inNewTab ? '_blank' : '' })
              .run()
          }
        />
      </PopoverContent>
    </Popover>
  )
}
