import { BubbleMenu } from '@tiptap/react'
import React, { useCallback } from 'react'
import { ArrowUpToLine, ArrowDownToLine, Trash2 } from 'lucide-react'
import { MenuProps, ShouldShowProps } from '../types'
import { isRowGripSelected } from './utils'
import Wrapper from '../bubble-menu-wrapper'
import { Button } from '@/components/ui/button'

export const TableRowMenu = (props: MenuProps) => {
  const { editor, appendTo } = props

  const shouldShow = useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (editor == null) return false
      if (!state || !from) {
        return false
      }
      return isRowGripSelected({ editor, view, state, from })
    },
    [editor]
  )

  // 前面插入行
  const onAddRowBefore = useCallback(() => {
    editor && editor.chain().focus().addRowBefore().run()
  }, [editor])

  // 后面插入行
  const onAddRowAfter = useCallback(() => {
    editor && editor.chain().focus().addRowAfter().run()
  }, [editor])

  // 删除行
  const onDeleteRow = useCallback(() => {
    editor && editor.chain().focus().deleteRow().run()
  }, [editor])

  if (editor == null) return

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="tableRowMenu"
      updateDelay={0}
      shouldShow={shouldShow}
      tippyOptions={{
        placement: 'left',
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        appendTo: () => {
          return appendTo?.current
        },
      }}
    >
      <Wrapper className="flex-col items-start">
        <Button onClick={onAddRowBefore} size="sm" variant="ghost">
          <ArrowUpToLine className="w-4 h-4 mr-1" />
          前面插入一行
        </Button>
        <Button onClick={onAddRowAfter} size="sm" variant="ghost">
          <ArrowDownToLine className="w-4 h-4 mr-1" />
          后面插入一行
        </Button>
        <Button onClick={onDeleteRow} size="sm" variant="ghost">
          <Trash2 className="w-4 h-4 mr-1" />
          删除行
        </Button>
      </Wrapper>
    </BubbleMenu>
  )
}
