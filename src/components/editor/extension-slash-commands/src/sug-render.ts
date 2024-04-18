import { ReactRenderer } from '@tiptap/react'
import { SuggestionProps, SuggestionKeyDownProps } from '@tiptap/suggestion'
import MenuList from './menu-list'
import { extensionName, popup } from '.'

const render = () => {
  let component: any
  let scrollElem: HTMLElement
  let scrollYValue: string

  return {
    onStart: (props: SuggestionProps) => {
      // 渲染 MenuList 组件
      component = new ReactRenderer(MenuList, {
        props,
        editor: props.editor
      })

      // 计算位置和尺寸，以便定位弹层
      const getReferenceClientRect = () => {
        if (!props.clientRect) {
          return props.editor.storage[extensionName].rect
        }
        const rect = props.clientRect()
        if (!rect) {
          return props.editor.storage[extensionName].rect
        }

        let yPos = rect.y
        if (rect.top + component.element.offsetHeight + 40 > window.innerHeight) {
          const diff = rect.top + component.element.offsetHeight - window.innerHeight + 40
          yPos = rect.y - diff
        }

        return new DOMRect(rect.x, yPos, rect.width, rect.height)
      }

      // 设置弹层位置和内容，并显示
      popup?.[0].setProps({
        getReferenceClientRect,
        appendTo: () => document.body,
        content: component.element
      })
      popup?.[0].show()

      // console.log(popup, 'popup')

      // 获取编辑器滚动的元素，和 overflowY 的值
      if (!scrollElem) {
        scrollElem = document.getElementById('work-content-scroll-container')?.lastElementChild as HTMLElement
        scrollYValue = scrollElem.style.overflowY
      }
      // 暂时禁止编辑器滚动
      scrollElem.style.overflowY = 'hidden'
    },

    onUpdate(props: SuggestionProps) {
      // 更新组件
      component.updateProps(props)

      // 更新弹层位置
      const getReferenceClientRect = () => {
        if (!props.clientRect) {
          return props.editor.storage[extensionName].rect
        }

        const rect = props.clientRect()

        if (!rect) {
          return props.editor.storage[extensionName].rect
        }

        // Account for when the editor is bound inside a container that doesn't go all the way to the edge of the screen
        return new DOMRect(rect.x, rect.y, rect.width, rect.height)
      }

      props.editor.storage[extensionName].rect = props.clientRect
        ? getReferenceClientRect()
        : {
            width: 0,
            height: 0,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          }
      popup?.[0].setProps({
        getReferenceClientRect
      })
    },

    onKeyDown(props: SuggestionKeyDownProps) {
      // ESC 键，隐藏弹层
      if (props.event.key === 'Escape') {
        popup?.[0].hide()

        return true
      }

      if (!popup?.[0].state.isShown) {
        popup?.[0].show()
      }

      return component.ref?.onKeyDown(props)
    },

    onExit(props: SuggestionProps) {
      popup?.[0].hide()
      component.destroy()

      // 恢复编辑器滚动
      scrollElem.style.overflowY = scrollYValue
    }
  }
}

export default render
