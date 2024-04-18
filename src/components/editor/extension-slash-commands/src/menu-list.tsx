import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Command, MenuListProps } from './types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'

const MenuList = React.forwardRef((props: MenuListProps, ref) => {
  // console.log(props, 'props')

  const scrollContainer = useRef<HTMLDivElement>(null)
  const activeItem = useRef<HTMLButtonElement>(null)
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0)
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0)

  // items（index.ts 中定义） 变化时，重置选中状态
  useEffect(() => {
    setSelectedGroupIndex(0)
    setSelectedCommandIndex(0)
  }, [props.items])

  // 选中某个 item ，并执行命令
  const selectItem = useCallback(
    (groupIndex: number, commandIndex: number) => {
      const command = props.items[groupIndex].commands[commandIndex]
      props.command(command) // 执行命令，具体在 index.ts 中定义
    },
    [props]
  )

  React.useImperativeHandle(ref, () => ({
    // 选择下一个 item
    onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
      if (event.key === 'ArrowDown') {
        if (!props.items.length) {
          return false
        }
        const commands = props.items[selectedGroupIndex].commands

        let newCommandIndex = selectedCommandIndex + 1
        let newGroupIndex = selectedGroupIndex

        if (commands.length - 1 < newCommandIndex) {
          newCommandIndex = 0
          newGroupIndex = selectedGroupIndex + 1 // 下一个 group
        }
        if (props.items.length - 1 < newGroupIndex) {
          newGroupIndex = 0 // 重制到第一个 group
        }

        setSelectedCommandIndex(newCommandIndex)
        setSelectedGroupIndex(newGroupIndex)

        return true
      }

      // 选择上一个 item
      if (event.key === 'ArrowUp') {
        if (!props.items.length) {
          return false
        }

        let newCommandIndex = selectedCommandIndex - 1
        let newGroupIndex = selectedGroupIndex

        if (newCommandIndex < 0) {
          newGroupIndex = selectedGroupIndex - 1
          newCommandIndex = props.items[newGroupIndex]?.commands.length - 1 || 0
        }

        if (newGroupIndex < 0) {
          newGroupIndex = props.items.length - 1
          newCommandIndex = props.items[newGroupIndex].commands.length - 1
        }

        setSelectedCommandIndex(newCommandIndex)
        setSelectedGroupIndex(newGroupIndex)

        return true
      }

      // 选择当前 item
      if (event.key === 'Enter') {
        if (!props.items.length || selectedGroupIndex === -1 || selectedCommandIndex === -1) {
          return false
        }

        // 选择，并执行命令
        selectItem(selectedGroupIndex, selectedCommandIndex)

        return true
      }

      return false
    }
  }))

  useEffect(() => {
    if (activeItem.current && scrollContainer.current) {
      const offsetTop = activeItem.current.offsetTop
      const offsetHeight = activeItem.current.offsetHeight

      scrollContainer.current.scrollTop = offsetTop - offsetHeight // 计算 container scrollTop
    }
  }, [selectedCommandIndex, selectedGroupIndex])

  // 点击某个 item ，执行命令
  const createCommandClickHandler = useCallback(
    (groupIndex: number, commandIndex: number) => {
      return () => {
        selectItem(groupIndex, commandIndex)
      }
    },
    [selectItem]
  )

  if (!props.items.length) {
    return null
  }

  return (
    <ScrollArea
      ref={scrollContainer}
      className="mb-8 max-h-[min(80vh,24rem)] flex-wrap overflow-auto rounded border bg-background p-3 shadow-lg"
    >
      <div className="grid grid-cols-1 gap-0.5">
        {props.items.map((group, groupIndex: number) => (
          <React.Fragment key={`${group.title}-wrapper`}>
            {/* 渲染 group title */}
            <div
              className="col-[1/-1] mx-2 my-2 select-none text-[0.65rem] font-semibold uppercase tracking-wider text-neutral-500 first:mt-0.5"
              key={`${group.title}`}
            >
              {group.title}
            </div>

            {/* 渲染 commands 列表 */}
            {group.commands.map((command: Command, commandIndex: number) => {
              const isActive = selectedGroupIndex === groupIndex && selectedCommandIndex === commandIndex

              return (
                <Button
                  key={command.name}
                  onClick={createCommandClickHandler(groupIndex, commandIndex)}
                  variant={isActive ? 'secondary' : 'ghost'}
                  className="h-auto justify-start px-2"
                >
                  <command.Icon className="mr-2 h-4 w-4" />
                  {command.label}
                </Button>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
})

MenuList.displayName = 'MenuList'

export default MenuList
