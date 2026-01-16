import { Editor, useEditorState } from '@tiptap/react'
// 状态管理 Hook
export const useTextMenuStates = (editor: Editor) => {
  const states = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive('bold'),
      isItalic: ctx.editor.isActive('italic'),
      isStrike: ctx.editor.isActive('strike'),
      isUnderline: ctx.editor.isActive('underline'),
      isCode: ctx.editor.isActive('code'),
      isAlignLeft: ctx.editor.isActive({ textAlign: 'left' }),
      isAlignCenter: ctx.editor.isActive({ textAlign: 'center' }),
      isAlignRight: ctx.editor.isActive({ textAlign: 'right' }),
      isHorizontalRule: ctx.editor.isActive('horizontalRule'),
      isLink: ctx.editor.isActive('link'),
      isHighlightBlock: ctx.editor.isActive('highlightBlock'),
      isHighlight: ctx.editor.isActive('highlight')
    })
  })

  return states
}
