import { BubbleMenu, Editor } from '@tiptap/react'
import { useCallback, useState } from 'react'
import Wrapper from '../bubble-menu-wrapper'
import { LinkPreviewMenu } from './preview-menu'
import { LinkEditPanel } from './edit-panel'
import { MenuProps } from '../types'

export default function LinkMenu(props: MenuProps) {
  const { editor, appendTo } = props

  const [showEdit, setShowEdit] = useState(false)

  const shouldShow = useCallback(() => {
    if (editor == null) return false
    const isActive = editor.isActive('link')
    if (!isActive) return false

    const { empty } = editor.state.selection
    if (!empty) return false

    return true
  }, [editor])

  const { href, target } = editor?.getAttributes('link') || {}

  const setLink = (url: string, openInNewTab?: boolean) => {
    editor &&
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url, target: openInNewTab ? '_blank' : '' })
        .run()
    setShowEdit(false)
  }

  const unsetLink = () => {
    editor && editor.chain().focus().extendMarkRange('link').unsetLink().run()
    setShowEdit(false)
    return null
  }

  if (editor == null) return

  return (
    <BubbleMenu
      editor={editor}
      updateDelay={0}
      shouldShow={shouldShow}
      tippyOptions={{
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }]
        },
        appendTo: () => {
          return appendTo?.current
        },
        onHidden: () => {
          setShowEdit(false)
        }
      }}
    >
      <Wrapper>
        {showEdit ? (
          <LinkEditPanel initialUrl={href} initialOpenInNewTab={target === '_blank'} onSetLink={setLink} />
        ) : (
          <LinkPreviewMenu url={href} onEdit={() => setShowEdit(true)} onClear={unsetLink} />
        )}
      </Wrapper>
    </BubbleMenu>
  )
}
