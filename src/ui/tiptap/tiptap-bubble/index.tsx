import { Editor, BubbleMenu } from '@tiptap/react'
import NormalBubble from './normal-bubble'
import AISelector from './ai-selector'
import { Fragment, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { isTextSelected } from '@/components/editor/utils/isTextSelected'
import ContentTypeMenu from './content-type'

interface TiptapBubbleProps {
  editor: Editor
  open: boolean
  onOpenChange: (open: boolean) => void
}

const TiptapBubble = ({ editor, open, onOpenChange }: TiptapBubbleProps) => {
  let pos = 'top'
  const instanceRef = useRef<any>(null)

  const [selection, setSelection] = useState('')

  function shouldShow(editor: Editor) {
    // 某些类型，不显示文本菜单
    if (editor?.isActive('codeBlock')) return false

    // 其他，看是否选中了文本
    return isTextSelected({ editor })
  }

  const bubbleMenuProps = {
    editor: editor,
    tippyOptions: {
      placement: pos as 'top',
      onHidden: () => {
        instanceRef.current.setProps({ placement: 'top' })
        onOpenChange(false)
      },
      onCreate: (val: any) => {
        instanceRef.current = val
      },
      moveTransition: 'transform 0.15s ease-out'
    }
  }

  return (
    <BubbleMenu {...bubbleMenuProps} className="inline-flex" shouldShow={() => shouldShow(editor)}>
      {open && <AISelector editor={editor} selection={selection}></AISelector>}

      <div
        className="dark:bg-background-dark inline-flex space-x-1 rounded
    border bg-background p-1 shadow 
    dark:border-gray-800 dark:shadow-lg"
      >
        {!open && (
          <Fragment>
            <ContentTypeMenu editor={editor} />
            <Button
              onClick={() => {
                onOpenChange(true)
                const slice = editor.state.selection.content()
                const text = editor.storage.markdown.serializer.serialize(slice.content)
                setSelection(text)
                instanceRef.current.setProps({ placement: 'bottom-start' })
              }}
              className={`${editor.isActive('bold') ? 'is-active' : ''}`}
              variant="ghost"
              size="sm"
            >
              Ask AI
            </Button>
            <NormalBubble editor={editor} setOpen={onOpenChange} bubble={instanceRef.current}></NormalBubble>
          </Fragment>
        )}
      </div>
    </BubbleMenu>
  )
}

export default TiptapBubble
