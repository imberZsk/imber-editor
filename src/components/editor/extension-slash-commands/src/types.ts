import { Editor } from '@tiptap/core'
import { LucideIcon } from 'lucide-react'

export interface Group {
  name: string
  title: string
  commands: Command[]
}

export interface Command {
  name: string
  label: string
  description: string
  aliases?: string[]
  Icon: LucideIcon
  action: (editor: Editor) => void
  shouldBeHidden?: (editor: Editor) => boolean
}

export interface MenuListProps {
  editor: Editor
  items: Group[]
  command: (command: Command) => void
}
