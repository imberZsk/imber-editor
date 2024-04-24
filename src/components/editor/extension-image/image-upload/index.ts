import { Node, ReactNodeViewRenderer } from '@tiptap/react'
import ImageUploadView from './image-upload-view'

declare module '@tiptap/core' {
  // 扩展 ts 接口
  interface Commands<ReturnType> {
    imageUpload: {
      setImageUpload: () => ReturnType
    }
  }
}

export const ImageUpload = Node.create({
  name: 'imageUpload',
  isolating: true,
  defining: true,
  group: 'block',
  draggable: true, // 可拖拽
  selectable: true, // 可选中节点
  inline: false,

  parseHTML() {
    return [
      {
        tag: `div[data-type="${this.name}"]`
      }
    ]
  },

  renderHTML() {
    return ['div', { 'data-type': this.name }]
  },

  addCommands() {
    return {
      setImageUpload:
        () =>
        ({ commands }) => {
          console.log('!11')
          return commands.insertContent(`<div data-type="${this.name}"></div>`)
        }
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageUploadView)
  }
})
