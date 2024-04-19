import { BubbleMenu } from '@tiptap/react'
import { useCallback } from 'react'
import { sticky } from 'tippy.js'
import { v4 as uuid } from 'uuid'
import { AlignLeft, AlignCenter, AlignRight, ChevronDown } from 'lucide-react'
import Wrapper from '../bubble-menu-wrapper'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { MenuProps } from '../types'

export default function ImageBlockMenu(props: MenuProps) {
  const { editor, appendTo } = props

  // 是否显示菜单
  const shouldShow = useCallback(() => {
    if (editor == null) return false
    const isActive = editor.isActive('imageBlock')
    return isActive
  }, [editor])

  const onAlignImageLeft = useCallback(() => {
    editor && editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('left').run()
  }, [editor])

  const onAlignImageCenter = useCallback(() => {
    editor && editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('center').run()
  }, [editor])

  const onAlignImageRight = useCallback(() => {
    editor && editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('right').run()
  }, [editor])

  const changeWidth = useCallback(
    (value: number) => {
      editor && editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockWidth(value).run()
    },
    [editor]
  )

  if (editor == null) return

  return (
    <BubbleMenu
      editor={editor}
      pluginKey={`imageBlockMenu-${uuid()}`} // 多个菜单，需要不同的 key
      updateDelay={0}
      shouldShow={shouldShow}
      // BubbleMenu 是基于 tippy 开发的，所以它可以传入一些 tippy 的配置 https://atomiks.github.io/tippyjs/v6/all-props/
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }]
        },
        appendTo: () => appendTo?.current,
        plugins: [sticky],
        sticky: 'popper'
      }}
    >
      <Wrapper>
        <Button
          size="sm"
          onClick={onAlignImageLeft}
          variant={editor.isActive('imageBlock', { align: 'left' }) ? 'secondary' : 'ghost'}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={onAlignImageCenter}
          variant={editor.isActive('imageBlock', { align: 'center' }) ? 'secondary' : 'ghost'}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={onAlignImageRight}
          variant={editor.isActive('imageBlock', { align: 'right' }) ? 'secondary' : 'ghost'}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" variant="ghost">
              {editor.getAttributes('imageBlock').width}
              &nbsp;
              <ChevronDown className="h-2 w-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <Button size="sm" variant="ghost" onClick={() => changeWidth(25)}>
              25%
            </Button>
            <Button size="sm" variant="ghost" onClick={() => changeWidth(50)}>
              50%
            </Button>
            <Button size="sm" variant="ghost" onClick={() => changeWidth(75)}>
              75%
            </Button>
            <Button size="sm" variant="ghost" onClick={() => changeWidth(100)}>
              100%
            </Button>
          </PopoverContent>
        </Popover>
      </Wrapper>
    </BubbleMenu>
  )
}
