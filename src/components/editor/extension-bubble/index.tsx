import { Editor, BubbleMenu } from '@tiptap/react'
import BaseMenu from './base-menu'
import AISelector from './ai-selector'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { isTextSelected } from '@/components/editor/utils/isTextSelected'
import ContentTypeMenu from './content-type'
import SetLinkMenu from './menus/text-menu/set-link-menu'
import Wrapper from './bubble-menu-wrapper'
import Popover from './popover'

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
    const customTypes = ['codeBlock', 'imageBlock', 'imageUpload', 'horizontalRule', 'link', 'table']
    if (customTypes.some((type) => editor.isActive(type))) return false

    // 其他，看是否选中了文本
    return isTextSelected({ editor })
  }

  const bubbleMenuProps = {
    editor: editor,
    tippyOptions: {
      maxWidth: '756px',
      placement: pos as 'top',
      onHidden: () => {
        instanceRef.current.setProps({ placement: 'top' })
        onOpenChange(false)
      },
      onCreate: (val: any) => {
        instanceRef.current = val
      },
      moveTransition: 'transform 0.2s ease-out'
    }
  }

  return (
    <BubbleMenu {...bubbleMenuProps} className="inline-flex" shouldShow={() => shouldShow(editor)}>
      {open && <AISelector editor={editor} selection={selection}></AISelector>}

      {!open && (
        <Wrapper>
          <Button
            onClick={() => {
              onOpenChange(true)
              const state = editor.state
              const { selection } = state
              const text = state.doc.textBetween(selection.from, selection.to, '')
              setSelection(text)
              instanceRef.current.setProps({ placement: 'bottom-start' })
            }}
            variant="ghost"
            size="sm"
          >
            Ask AI
          </Button>

          <ContentTypeMenu editor={editor} />

          <SetLinkMenu editor={editor} />

          <BaseMenu editor={editor} setOpen={onOpenChange} bubble={instanceRef.current}></BaseMenu>

          <Popover editor={editor}></Popover>
        </Wrapper>
      )}
    </BubbleMenu>
  )
}

export default TiptapBubble
