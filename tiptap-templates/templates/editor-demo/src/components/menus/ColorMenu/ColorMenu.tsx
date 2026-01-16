import { Editor } from '@tiptap/react'
import { Palette, RotateCcw } from 'lucide-react'
import { useCallback, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

// 预设颜色
const themeColors = ['#fb7185', '#fdba74', '#d9f99d', '#a7f3d0', '#a5f3fc']

// 颜色按钮组件
const ColorButton = ({
  color,
  active,
  onColorChange,
  onClose
}: {
  color: string
  active: boolean
  onColorChange: (color: string) => void
  onClose: () => void
}) => {
  const handleClick = useCallback(() => {
    onColorChange(color)
    onClose()
  }, [onColorChange, color, onClose])

  return (
    <button
      onClick={handleClick}
      className={`w-6 h-6 rounded border-2 transition-all hover:scale-110 ${
        active
          ? 'border-gray-800 dark:border-gray-200 ring-2 ring-blue-500'
          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
      }`}
      style={{ backgroundColor: color }}
      title={color}
    />
  )
}

export const ColorMenu = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false)

  // 颜色变化命令
  const onChangeColor = useCallback(
    (color: string) => {
      editor.chain().setColor(color).run()
    },
    [editor]
  )

  // 清除颜色命令
  const onClearColor = useCallback(() => {
    editor.chain().focus().unsetColor().run()
  }, [editor])

  // 获取当前文本颜色
  const currentColor = editor.getAttributes('textStyle')?.color || ''

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
            'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          )}
        >
          <Palette size={14} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                文字颜色
              </span>
              <button
                onClick={onClearColor}
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                title="清除颜色"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            <div className="grid grid-cols-8 gap-1">
              {themeColors.map((color) => (
                <ColorButton
                  key={color}
                  color={color}
                  active={color === currentColor}
                  onColorChange={onChangeColor}
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
