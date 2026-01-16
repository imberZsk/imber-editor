import { Editor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Minus
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { MenuButton, LinkButton } from '../index'
import { useTextMenuStates } from '../hooks/useTextMenuStates'
import { useTextMenuCommands } from '../hooks/useTextMenuCommands'
import { ColorMenu } from '../ColorMenu'
import { TextHighlightMenu } from '../TextHighlightMenu'
import { BlockquoteMenu } from '../BlockquoteMenu'
import { HighlightBlockMenu } from '../HighlightBlockMenu'

export const TextMenu = ({ editor }: { editor: Editor }) => {
  const states = useTextMenuStates(editor)
  const commands = useTextMenuCommands(editor)

  return (
    <>
      {editor && (
        <BubbleMenu
          className={cn(
            'bubble-menu',
            'flex items-center gap-1 p-2 bg-white border border-gray-200 rounded-lg shadow-lg',
            'backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 dark:border-gray-700',
            'animate-in fade-in-0 zoom-in-95 duration-200'
          )}
          editor={editor}
        >
          <MenuButton
            onClick={commands.onBold}
            isActive={states.isBold}
            tooltip="粗体 (Cmd+B)"
          >
            <Bold size={14} />
          </MenuButton>

          <MenuButton
            onClick={commands.onItalic}
            isActive={states.isItalic}
            tooltip="斜体 (Cmd+I)"
          >
            <Italic size={14} />
          </MenuButton>

          <MenuButton
            onClick={commands.onStrike}
            isActive={states.isStrike}
            tooltip="删除线 (Cmd+Shift+X)"
          >
            <Strikethrough size={14} />
          </MenuButton>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

          <MenuButton
            onClick={commands.onUnderline}
            isActive={states.isUnderline}
            tooltip="下划线"
          >
            <Underline size={14} />
          </MenuButton>

          <MenuButton
            onClick={commands.onCode}
            isActive={states.isCode}
            tooltip="行内代码"
          >
            <Code size={14} />
          </MenuButton>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

          <MenuButton
            onClick={commands.onAlignLeft}
            isActive={states.isAlignLeft}
            tooltip="左对齐"
          >
            <AlignLeft size={14} />
          </MenuButton>

          <MenuButton
            onClick={commands.onAlignCenter}
            isActive={states.isAlignCenter}
            tooltip="居中对齐"
          >
            <AlignCenter size={14} />
          </MenuButton>

          <MenuButton
            onClick={commands.onAlignRight}
            isActive={states.isAlignRight}
            tooltip="右对齐"
          >
            <AlignRight size={14} />
          </MenuButton>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

          <MenuButton
            onClick={commands.onHorizontalRule}
            isActive={states.isHorizontalRule}
            tooltip="分割线"
          >
            <Minus size={14} />
          </MenuButton>

          {/* 使用新的链接按钮组件 */}
          <LinkButton editor={editor} isActive={states.isLink} />

          {/* <MenuButton
            onClick={commands.onHighlightBlock}
            isActive={states.isHighlightBlock}
            tooltip="高亮块"
          >
            <Square size={14} />
          </MenuButton> */}

          <HighlightBlockMenu
            editor={editor}
            isActive={states.isHighlightBlock}
          />

          {/* 字体背景高亮 */}
          <TextHighlightMenu editor={editor} isActive={states.isHighlight} />

          {/* 颜色menu */}
          <ColorMenu editor={editor} />

          {/* 引用块颜色menu */}
          <BlockquoteMenu editor={editor} />
        </BubbleMenu>
      )}
    </>
  )
}
