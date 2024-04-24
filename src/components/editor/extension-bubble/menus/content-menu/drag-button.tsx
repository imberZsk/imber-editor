import { useCallback, useState, useEffect } from 'react'
import { Editor } from '@tiptap/core'
import { Node } from '@tiptap/pm/model'
import { NodeSelection } from '@tiptap/pm/state'
import { Button } from '@/components/ui/button'
import {
  GripVertical,
  RemoveFormatting,
  Clipboard,
  Copy,
  Trash2,
} from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'

interface DragButtonProps {
  editor: Editor | null
  currentNode: Node | null
  currentNodePos: number
}

export default function DragButton(props: DragButtonProps) {
  const { editor, currentNode, currentNodePos } = props
  const { toast } = useToast()

  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    if (menuOpen) {
      editor && editor.commands.setMeta('lockDragHandle', true) // 锁定拖动按钮
    } else {
      editor && editor.commands.setMeta('lockDragHandle', false)
    }
  }, [editor, menuOpen])

  // 清空格式
  const resetTextFormatting = useCallback(() => {
    if (editor == null) return
    const chain = editor.chain()
    chain.setNodeSelection(currentNodePos).unsetAllMarks()
    if (currentNode?.type.name !== 'paragraph') {
      chain.setParagraph()
    }
    chain.focus(currentNodePos).run()
  }, [editor, currentNodePos, currentNode?.type.name])

  // 复制
  const duplicateNode = useCallback(() => {
    if (editor == null) return
    editor.commands.setNodeSelection(currentNodePos)

    const { $anchor } = editor.state.selection
    const selectedNode =
      $anchor.node(1) || (editor.state.selection as NodeSelection).node
    const nextPos = currentNodePos + (currentNode?.nodeSize || 0)
    editor
      .chain()
      .insertContentAt(nextPos, selectedNode.toJSON())
      .focus(nextPos)
      .run()
  }, [editor, currentNodePos, currentNode?.nodeSize])

  // 拷贝到剪贴板
  const copyNodeToClipboard = useCallback(() => {
    if (editor == null) return
    editor.chain().setNodeSelection(currentNodePos).run()
    document.execCommand('copy')
    editor.commands.focus(currentNodePos)
    toast({ title: '成功', description: '已拷贝到剪贴板' })
  }, [editor, currentNodePos, toast])

  // 删除节点
  const deleteNode = useCallback(() => {
    if (editor == null) return
    editor
      .chain()
      .setNodeSelection(currentNodePos)
      .deleteSelection()
      .focus(currentNodePos)
      .run()
  }, [editor, currentNodePos])

  if (editor == null) return

  return (
    <Popover open={menuOpen} onOpenChange={setMenuOpen}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          <GripVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 flex flex-col w-auto">
        <Button
          size="sm"
          variant="ghost"
          className="justify-start w-full mx-0 px-1"
          onClick={resetTextFormatting}
        >
          <RemoveFormatting className="h-4 w-4 mr-1" />
          清空格式
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="justify-start w-full mx-0 px-1"
          onClick={copyNodeToClipboard}
        >
          <Clipboard className="h-4 w-4 mr-1" />
          拷贝到剪贴板
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="justify-start w-full mx-0 px-1"
          onClick={duplicateNode}
        >
          <Copy className="h-4 w-4 mr-1" />
          复制
        </Button>
        <Separator className="mb-2" />
        <Button
          size="sm"
          variant="destructive"
          className="justify-start w-full mx-0 px-1"
          onClick={deleteNode}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          删除
        </Button>
      </PopoverContent>
    </Popover>
  )
}
