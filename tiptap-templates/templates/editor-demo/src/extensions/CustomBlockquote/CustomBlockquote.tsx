import Blockquote from '@tiptap/extension-blockquote'

const CustomBlockquote = Blockquote.extend({
  addAttributes() {
    return {
      ...this.parent?.(), // 继承父扩展的所有属性
      color: {
        // 因为解析的时候也要用到
        default: 'gray',
        // parseHTML: (element) => element.getAttribute('data-color') || 'gray',
        renderHTML: (attributes) => {
          return {
            class: `blockquote-${attributes.color}`
          }
        }
      }
    }
  },

  addCommands() {
    return {
      toggleBlockquote:
        () =>
        ({ commands }) => {
          return commands.toggleWrap(this.name)
        },
      unsetBlockquote:
        () =>
        ({ commands }) => {
          return commands.lift(this.name)
        }
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['blockquote', HTMLAttributes, 0]
  }
})

export default CustomBlockquote
