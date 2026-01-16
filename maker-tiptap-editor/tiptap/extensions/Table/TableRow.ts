import TiptapTableRow from "@tiptap/extension-table-row";

// 行
export const TableRow = TiptapTableRow.extend({
  allowGapCursor: false, // 是否允许间隙游标
  content: "(tableCell | tableHeader)*", // 原 "(tableCell | tableHeader)*"
});

export default TableRow;
