import { useState, useCallback } from 'react'
import { Node } from '@tiptap/pm/model'
import { Editor } from '@tiptap/core'
import DragHandle from '@tiptap-pro/extension-drag-handle-react'
import AddButton from './add-button'
import DragButton from './drag-button'

interface ContentMenuProps {
  editor: Editor | null
}

export default function ContentMenu({ editor }: ContentMenuProps) {
  const [currentNode, setCurrentNode] = useState<Node | null>(null)
  const [currentNodePos, setCurrentNodePos] = useState<number>(-1)

  const handleNodeChange = useCallback(
    (data: { node: Node | null; editor: Editor; pos: number }) => {
      if (data.node) {
        setCurrentNode(data.node)
      }

      setCurrentNodePos(data.pos)
    },
    [setCurrentNodePos, setCurrentNode]
  )

  if (editor == null) return

  return (
    <DragHandle
      pluginKey="ContentItemMenu"
      editor={editor}
      onNodeChange={handleNodeChange}
      tippyOptions={{
        offset: [-2, 16],
        zIndex: 99
      }}
    >
      <div className="flex items-center gap-0.5 text-muted-foreground">
        <AddButton editor={editor} currentNode={currentNode} currentNodePos={currentNodePos} />
        <DragButton editor={editor} currentNode={currentNode} currentNodePos={currentNodePos} />
      </div>
    </DragHandle>
  )
}
