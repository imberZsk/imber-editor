import { Editor } from '@tiptap/react'
import { Quote, RotateCcw } from 'lucide-react'
import { useCallback, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

// 预设的 blockquote 颜色
const blockquoteColors = [
  {
    name: 'gray',
    value: 'gray',
    class: 'border-gray-300 dark:border-gray-600'
  },
  { name: 'blue', value: 'blue', class: 'border-blue-500' },
  { name: 'green', value: 'green', class: 'border-green-500' },
  { name: 'purple', value: 'purple', class: 'border-purple-500' },
  { name: 'orange', value: 'orange', class: 'border-orange-500' }
]

// 颜色按钮组件
const ColorButton = ({
  color,
  active,
  onColorChange,
  onClose
}: {
  color: { name: string; value: string; class: string }
  active: boolean
  onColorChange: (color: string) => void
  onClose: () => void
}) => {
  const handleClick = useCallback(() => {
    onColorChange(color.value)
    onClose()
  }, [onColorChange, color.value, onClose])

  return (
    <button
      onClick={handleClick}
      className={cn(
        'w-8 h-8 rounded border-2 transition-all hover:scale-110 flex items-center justify-center',
        active
          ? 'border-gray-800 dark:border-gray-200 ring-2 ring-blue-500'
          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400',
        color.class
      )}
      title={color.name}
    >
      <div className="w-2 h-2 rounded-full bg-current" />
    </button>
  )
}

export const BlockquoteMenu = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false)
  const [currentColor, setCurrentColor] = useState('gray')

  // 设置 blockquote 颜色
  const onSetBlockquoteColor = useCallback(
    (color: string) => {
      setCurrentColor(color)

      if (editor.isActive('blockquote')) {
        // 如果当前已经是 blockquote，更新颜色
        editor.chain().focus().updateAttributes('blockquote', { color }).run()
      } else {
        // 创建新的 blockquote
        editor.chain().focus().toggleBlockquote().run()

        // 设置颜色
        editor.chain().focus().updateAttributes('blockquote', { color }).run()
      }
    },
    [editor]
  )

  // 清除 blockquote
  const onClearBlockquote = useCallback(() => {
    if (editor.isActive('blockquote')) {
      editor.chain().focus().lift('blockquote').run()
    }
  }, [editor])

  const isActive = editor.isActive('blockquote')

  const closePopover = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className={cn(
            'flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200',
            'active:scale-95',
            isActive
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          )}
        >
          <Quote size={14} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                引用块颜色
              </span>
              <button
                onClick={onClearBlockquote}
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                title="清除引用块"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {blockquoteColors.map((color) => (
                <ColorButton
                  key={color.value}
                  color={color}
                  active={color.value === currentColor}
                  onColorChange={onSetBlockquoteColor}
                  onClose={closePopover}
                />
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
