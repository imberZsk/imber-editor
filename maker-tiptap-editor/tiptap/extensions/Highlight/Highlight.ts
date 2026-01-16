import { Mark, markInputRule, markPasteRule, mergeAttributes } from "@tiptap/core";

export interface HighlightOptions {
  defaultColor: string; // 默认的高亮色
  colors: string[]; // 可用的高亮颜色
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    highlight: {
      /**
       * 设置高亮标记
       * @param color The highlight attribute
       * @example editor.commands.setHighlight('red')
       */
      setHighlight: (color: string) => ReturnType;
      /**
       * 切换高亮标记
       * @param color The highlight attribute
       * @example editor.commands.toggleHighlight('red')
       */
      toggleHighlight: (color: string) => ReturnType;
      /**
       * 取消高亮标记
       * @example editor.commands.unsetHighlight()
       */
      unsetHighlight: () => ReturnType;
    };
  }
}

/**
 * 这个扩展允许您使用文本高亮
 * @see https://www.tiptap.dev/api/marks/highlight
 */
export const Highlight = Mark.create<HighlightOptions>({
  name: "highlight",

  // 设置默认参数
  addOptions() {
    return {
      colors: [
        "red",
        "yellow",
        "orange",
        "green",
        "blue",
        "purple",
        "pink",
        "brown",
        "grey",
        "red1",
        "orange1",
        "yellow1",
        "green1",
        "blue1",
        "purple1",
        "pink1",
        "brown1",
        "grey1",
      ],
      defaultColor: "yellow",
      HTMLAttributes: {},
    };
  },

  // 添加属性
  addAttributes() {
    return {
      color: {
        default: this.options.defaultColor,
        // 解析时，从 html 中获取属性值
        parseHTML: (element) => {
          const color =
            (element.style.backgroundColor?.match(/var\(--hg-(.+?)\)/) || [])[1] || this.options.defaultColor;
          return this.options.colors.includes(color) ? color : this.options.defaultColor;
        },
        renderHTML: (attributes) => {
          // 渲染时，把属性值写入 html 属性中
          const color = attributes.color || this.options.defaultColor;
          return {
            style: `background-color: var(--hg-${color}); color: inherit`,
          };
        },
      },
    };
  },

  // 解析 HTML 的规则
  parseHTML() {
    return [
      {
        tag: "mark",
      },
    ];
  },

  // 渲染 HTML
  renderHTML({ HTMLAttributes }) {
    return ["mark", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setHighlight:
        (color: string) =>
        ({ commands }) => {
          const validColor = this.options.colors.includes(color) ? color : this.options.defaultColor;
          this.options.defaultColor = validColor;
          return commands.setMark(this.name, { color });
        },
      toggleHighlight:
        (color: string) =>
        ({ commands }) => {
          const validColor = this.options.colors.includes(color) ? color : this.options.defaultColor;
          this.options.defaultColor = validColor;
          return commands.toggleMark(this.name, { color });
        },
      unsetHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },

  // 快捷键
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-h": () => this.editor.commands.toggleHighlight(this.options.defaultColor),
    };
  },

  // 输入规则
  // 支持 markdown 输入方式：输入 ==two equal signs== 后它会神奇地变成突出显示键入的文本。
  addInputRules() {
    return [
      markInputRule({
        find: /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))$/,
        type: this.type,
      }),
    ];
  },

  // 粘贴规则
  addPasteRules() {
    return [
      markPasteRule({
        find: /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))/g,
        type: this.type,
      }),
    ];
  },
});
