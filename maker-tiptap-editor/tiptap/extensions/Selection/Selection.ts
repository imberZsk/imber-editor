import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

/* 
主要用途
	•	自定义选区外观：通过给特定的 class 名（这里为 selection），用户可以通过 CSS 自定义选区样式，例如设置背景色或文字颜色，使其在编辑器未聚焦时仍显示选区。
	•	聚焦检测：当编辑器未聚焦且有选区时，这个装饰会触发，使用户在聚焦外也能看到选区效果。
*/

// 有 bug，当一行中只有两个 Emoji 时，无法同时选中。

export const Selection = Extension.create({
  name: "selection",

  addProseMirrorPlugins() {
    const { editor } = this;

    return [
      new Plugin({
        key: new PluginKey("selection"),
        props: {
          decorations(state) {
            if (state.selection.empty) {
              return null;
            }

            if (editor.isFocused === true) {
              return null;
            }

            return DecorationSet.create(state.doc, [
              Decoration.inline(state.selection.from, state.selection.to, {
                class: "selection",
              }),
            ]);
          },
        },
      }),
    ];
  },
});

export default Selection;
