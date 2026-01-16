import { Editor } from "@tiptap/react";

import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { Link } from "@tiptap/extension-link";
import { CodeBlockLowlight } from "@/tiptap/extensions/CodeBlockLowlight/CodeBlockLowlight";
import { TableOfContentsNode } from "@/tiptap/extensions/TableOfContentsNode/TableOfContentsNode";

export const isTableGripSelected = (node: HTMLElement) => {
  let container = node;

  while (container && !["TD", "TH"].includes(container.tagName)) {
    container = container.parentElement!;
  }

  const gripColumn = container && container.querySelector && container.querySelector("a.grip-column.selected");
  const gripRow = container && container.querySelector && container.querySelector("a.grip-row.selected");

  if (gripColumn || gripRow) {
    return true;
  }

  return false;
};

export const isCustomNodeSelected = (editor: Editor, node: HTMLElement) => {
  const customNodes = [HorizontalRule.name, CodeBlockLowlight.name, Link.name, TableOfContentsNode.name];

  return customNodes.some((type) => editor.isActive(type)) || isTableGripSelected(node);
};

export default isCustomNodeSelected;
