import { useCallback } from 'react'
import { Editor } from '@tiptap/core'
import { Node } from '@tiptap/pm/model'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface AddButtonProps {
  editor: Editor | null
  currentNode: Node | null
  currentNodePos: number
}

export default function AddButton(props: AddButtonProps) {
  const { editor, currentNode, currentNodePos } = props

  const handleAdd = useCallback(() => {
    if (currentNodePos !== -1) {
      const currentNodeSize = currentNode?.nodeSize || 0
      const insertPos = currentNodePos + currentNodeSize
      const currentNodeIsEmptyParagraph =
        currentNode?.type.name === 'paragraph' &&
        currentNode?.content?.size === 0
      const focusPos = currentNodeIsEmptyParagraph
        ? currentNodePos + 2
        : insertPos + 2

      editor &&
        editor
          .chain()
          .command(({ dispatch, tr, state }) => {
            if (dispatch) {
              if (currentNodeIsEmptyParagraph) {
                tr.insertText('/', currentNodePos, currentNodePos + 1)
              } else {
                tr.insert(
                  insertPos,
                  state.schema.nodes.paragraph.create(null, [
                    state.schema.text('/'),
                  ])
                )
              }
              return dispatch(tr)
            }
            return true
          })
          .focus(focusPos)
          .run()
    }
  }, [currentNode, currentNodePos, editor])

  if (editor == null) return

  return (
    <Button size="sm" variant="ghost" onClick={handleAdd}>
      <Plus className="h-4 w-4" />
    </Button>
  )
}
