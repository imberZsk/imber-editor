import { useCallback, useState, useEffect } from 'react'
import { Editor, useEditorState } from '@tiptap/react'
import { Link } from 'lucide-react'
import { LinkEditor } from './LinkEditor'
import { MenuButton } from '../MenuButton'

interface LinkButtonProps {
  editor: Editor
  isActive: boolean
}

export const LinkButton = ({ editor, isActive }: LinkButtonProps) => {
  const [showLinkEditor, setShowLinkEditor] = useState(false)
  const [wasManuallyOpened, setWasManuallyOpened] = useState(false)

  // 获取当前链接信息
  const currentLink = useEditorState({
    editor,
    selector: (ctx) => {
      const attrs = ctx.editor.getAttributes('link')
      return attrs.href || ''
    }
  })

  const handleSetLink = useCallback(
    (url: string, openInNewTab?: boolean) => {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url, target: openInNewTab ? '_blank' : '' })
        .run()
    },
    [editor]
  )

  const handleUnsetLink = useCallback(() => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    setShowLinkEditor(false)
  }, [editor])

  const handleToggleLink = useCallback(() => {
    if (isActive) {
      // 如果已经是链接，则移除链接
      handleUnsetLink()
    } else {
      // 如果不是链接，则显示编辑器
      setShowLinkEditor(true)
      setWasManuallyOpened(true)
    }
  }, [isActive, handleUnsetLink])

  const handleCloseEditor = useCallback(() => {
    setShowLinkEditor(false)
    setWasManuallyOpened(false)
  }, [])

  // 监听编辑器事件，重置状态
  useEffect(() => {
    const handleUpdate = () => {
      // 当编辑器内容或选择发生变化时关闭编辑器（除非用户正在手动操作）
      if (showLinkEditor && !wasManuallyOpened) {
        setShowLinkEditor(false)
      }
    }

    const handleFocus = () => {
      // 当编辑器获得焦点时关闭弹层（用户点击了编辑器区域）
      if (showLinkEditor) {
        setShowLinkEditor(false)
        setWasManuallyOpened(false)
      }
    }

    editor.on('update', handleUpdate)
    editor.on('focus', handleFocus)

    return () => {
      editor.off('update', handleUpdate)
      editor.off('focus', handleFocus)
    }
  }, [editor, showLinkEditor, wasManuallyOpened])

  if (showLinkEditor) {
    return (
      <div className="relative">
        {/* 遮罩层 */}
        <div
          className="fixed inset-0 bg-transparent z-30"
          onClick={handleCloseEditor}
        />
        <MenuButton
          onClick={handleToggleLink}
          isActive={isActive}
          tooltip={isActive ? '移除链接' : '添加链接'}
        >
          <Link size={14} />
        </MenuButton>
        <LinkEditor
          initialUrl={currentLink}
          onSetLink={handleSetLink}
          onClose={handleCloseEditor}
        />
      </div>
    )
  }

  return (
    <MenuButton
      onClick={handleToggleLink}
      isActive={isActive}
      tooltip={isActive ? '移除链接' : '添加链接'}
    >
      <Link size={14} />
    </MenuButton>
  )
}
