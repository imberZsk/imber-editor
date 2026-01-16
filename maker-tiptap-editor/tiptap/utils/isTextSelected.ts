import { isTextSelection } from "@tiptap/core";
import { Editor } from "@tiptap/react";

export const isTextSelected = ({ editor }: { editor: Editor }) => {
  const {
    state: {
      doc,
      selection,
      selection: { empty, from, to },
    },
  } = editor;

  // 有时检查‘ empty ’是不够的。
  // 双击空段落返回节点大小为2。
  // 我们也检查空文本的大小。
  const isEmptyTextBlock = !doc.textBetween(from, to).length && isTextSelection(selection);

  if (empty || isEmptyTextBlock || !editor.isEditable) {
    return false;
  }

  return true;
};

export default isTextSelected;
