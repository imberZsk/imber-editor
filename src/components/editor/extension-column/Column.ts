import { Node, mergeAttributes } from '@tiptap/core'

export const Column = Node.create({
  name: 'column',

  content: 'block+',

  // 回车的时候不会新建一个节点，如 H1 回车就会新建一个 H1 节点
  isolating: true,

  addAttributes() {
    return {
      position: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-position'), // 'left' | 'right' ，Columns.ts 中有写
        renderHTML: (attributes) => ({ 'data-position': attributes.position }),
      },
    }
  },

  // 定义如何输出 HTML
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-type': 'column' }),
      0,
    ]
  },

  // 定义如何解析传入的 HTML
  parseHTML() {
    return [
      {
        tag: 'div[data-type="column"]',
      },
    ]
  },
})

export default Column
