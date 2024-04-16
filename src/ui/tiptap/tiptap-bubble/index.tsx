import { Editor, BubbleMenu } from '@tiptap/react'
import NormalBubble from './normal-bubble'
import AISelector from './ai-selector'
import { Fragment, useRef, useState } from 'react'

interface TiptapBubbleProps {
  editor: Editor
  open: boolean
  onOpenChange: (open: boolean) => void
}

const TiptapBubble = ({ editor, open, onOpenChange }: TiptapBubbleProps) => {
  let pos = 'top'
  const instanceRef = useRef<any>(null)

  const [selection, setSelection] = useState('')

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
    <BubbleMenu
      {...bubbleMenuProps}
      className="w-max-[1000px] flex rounded-[4px] bg-[#ffffff] shadow-[rgba(15,15,15,0.05)_0px_0px_0px_1px,rgba(15,15,15,0.1)_0px_3px_6px,rgba(15,15,15,0.2)_0px_9px_24px]"
    >
      {open && <AISelector editor={editor} selection={selection}></AISelector>}

      {!open && (
        <Fragment>
          <button
            onClick={() => {
              onOpenChange(true)
              const slice = editor.state.selection.content()
              const text = editor.storage.markdown.serializer.serialize(slice.content)
              setSelection(text)
              instanceRef.current.setProps({ placement: 'bottom-start' })
            }}
            className={`${editor.isActive('bold') ? 'is-active' : ''} border-r border-[#cccccc] px-[10px]`}
          >
            Ask AI
          </button>
          <NormalBubble editor={editor} setOpen={onOpenChange}></NormalBubble>
        </Fragment>
      )}
    </BubbleMenu>
  )
}

export default TiptapBubble
