import { Node } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    highlightBlock: {
      setHighlightBlock: (attributes?: { background?: string }) => ReturnType
      toggleHighlightBlock: (attributes?: { background?: string }) => ReturnType
      unsetHighlightBlock: () => ReturnType
    }
  }
}

// const classNames = 'bg-black/20 px-4 py-2 dark:bg-white/30'

export const HighLightBlock = Node.create({
  name: 'highlightBlock',

  // 用于配置选项，也就是HighLightBlock.configure({})
  addOptions() {
    return {
      HTMLAttributes: {
        data: 'type="highlightBlock"'
      }
    }
  },

  // 内容为 1 个或多个 block
  content: 'block+',

  // 该节点为 block 节点
  group: 'block',

  // definingAsContext⁠?: boolean
  // 确定在替换作（如粘贴）期间是否将此节点视为重要的父节点。当非定义（默认）节点的整个内容被替换时，它们会被删除，而定义节点会保留并包装插入的内容。
  // definingForContent⁠?: boolean
  // 在插入的内容中，尽可能保留内容的定义父项。通常，非默认段落文本块类型以及可能的列表项都标记为定义。
  defining: true,

  // 定义节点属性
  addAttributes() {
    return {
      background: {
        default: 'gray',
        renderHTML: (attributes) => {
          return {
            class: `highlightBlock-${attributes.background}`
          }
        }
      }
    }
  },

  // 定义节点渲染HTML
  renderHTML({ HTMLAttributes }) {
    return ['div', { ...HTMLAttributes, 'data-type': 'highlightBlock' }, 0]
  },

  // 定义如何从 HTML 解析节点
  parseHTML() {
    return [
      {
        tag: 'div[data-type="highlightBlock"]'
      }
    ]
  },

  // 定义节点命令
  addCommands() {
    return {
      toggleHighlightBlock: () => {
        return ({ commands }) => {
          return commands.toggleWrap(this.name)
        }
      },
      unsetHighlightBlock:
        () =>
        ({ commands }) => {
          return commands.lift(this.name)
        }
    }
  }
})
