import { wrappingInputRule } from "@tiptap/core";
import TiptapBlockquote from "@tiptap/extension-blockquote";

export const Blockquote = TiptapBlockquote.extend({
  // 必须有一个或多个段落
  content: "(paragraph)+",

  addInputRules() {
    return [
      // 通过快捷键 `>` 或 `》` 将文本封装为 blockquote
      wrappingInputRule({
        find: /^\s*[>》]\s$/,
        type: this.type,
      }),
    ];
  },
});
