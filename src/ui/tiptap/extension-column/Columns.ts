import { Node } from '@tiptap/core'

export enum ColumnLayout {
  SidebarLeft = 'sidebar-left',
  SidebarRight = 'sidebar-right',
  TwoColumn = 'two-column',
}

declare module '@tiptap/core' {
  // 扩展 TS 接口属性
  interface Commands<ReturnType> {
    columns: {
      setColumns: () => ReturnType
      setLayout: (layout: ColumnLayout) => ReturnType
      deleteColumns: () => ReturnType
    }
  }
}

export const Columns = Node.create({
  name: 'columns',

  // https://tiptap.dev/docs/editor/api/schema#group
  // 这样，其他的 Node 就可以在 content 中写 'columns'
  group: 'columns',

  content: 'column column',

  // https://tiptap.dev/docs/editor/api/schema#defining
  // 内容被替换时，继续保留 column
  defining: true,

  isolating: true,

  addAttributes() {
    return {
      layout: {
        default: ColumnLayout.TwoColumn,
      },
    }
  },

  addCommands() {
    return {
      setColumns:
        () =>
        ({ commands }) =>
          commands.insertContent(
            // `data-type="column"` 和 `data-position="left"` 都是在 Column.ts 中定义的
            `<div data-type="columns"><div data-type="column" data-position="left"><p></p></div><div data-type="column" data-position="right"><p></p></div></div>`
          ),
      setLayout:
        (layout: ColumnLayout) =>
        ({ commands }) =>
          commands.updateAttributes('columns', { layout }),
      deleteColumns:
        () =>
        ({ commands }) =>
          commands.deleteNode('columns'),
    }
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      { 'data-type': 'columns', class: `layout-${HTMLAttributes.layout}` },
      0,
    ]
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="columns"]',
      },
    ]
  },
})

export default Columns
