import { Node, mergeAttributes } from "@tiptap/core";

export interface CalloutOptions {
  defaultIcon: string; // 默认图标
  HTMLAttributes: Record<string, any>;
}

// 声明此扩展提供的命令
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    callout: {
      setCallout: () => ReturnType;
      toggleCallout: () => ReturnType;
      unsetCallout: () => ReturnType;
      setIcon: (icon: string) => ReturnType;
    };
  }
}

export const Callout = Node.create<CalloutOptions>({
  name: "callout",
  group: "block",
  content: "(paragraph)+",
  defining: false, // 复制时是否保留节点本身

  // 选项
  addOptions() {
    return {
      defaultIcon: "💡", // 默认图标
      HTMLAttributes: { class: "callout", "data-type": "callout" },
    };
  },

  // 属性
  addAttributes() {
    return {
      icon: {
        default: this.options.defaultIcon,
        parseHTML: (element) => element.getAttribute("data-icon"),
        renderHTML: (attributes) => ({
          "data-icon": attributes.icon,
        }),
      },
    };
  },

  // 解析 html
  parseHTML() {
    return [
      {
        tag: 'div[data-type="callout"]',
      },
    ];
  },

  // 渲染 html
  renderHTML({ node, HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      ["div", ["span", node.attrs.icon]],
      ["div", 0],
    ];
  },

  // 命令
  addCommands() {
    return {
      setIcon:
        (icon: string) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { icon });
        },
      setCallout:
        () =>
        ({ commands }) => {
          return commands.wrapIn(this.name);
        },
      toggleCallout:
        () =>
        ({ commands }) => {
          return commands.toggleWrap(this.name);
        },
      unsetCallout:
        () =>
        ({ commands }) => {
          return commands.lift(this.name);
        },
    };
  },
});
