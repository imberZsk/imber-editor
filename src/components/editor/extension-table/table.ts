import TiptapTable from '@tiptap/extension-table'

export const Table = TiptapTable.configure({
  resizable: true, // 拖拽列宽
  lastColumnResizable: false, // 最后一列不可拖拽，保持表格宽度 100%
})
