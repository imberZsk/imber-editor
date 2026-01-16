import { Extensions } from "@tiptap/core";

// 参考文档 https://tiptap.dev/docs/editor/extensions/nodes/document

/* nodes */

// 基本节点扩展
import { Document } from "./Document/Document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import HardBreak from "@tiptap/extension-hard-break";
import { HorizontalRule } from "./HorizontalRule/HorizontalRule";
import { ImageBlock } from "./ImageBlock/ImageBlock";
const nodes = [Document, Heading, Paragraph, Text, HardBreak, HorizontalRule, ImageBlock];

// 列表节点扩展
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
const lists = [ListItem, OrderedList, BulletList, TaskItem, TaskList];

// 可折叠内容
import Details from "@tiptap-pro/extension-details";
import DetailsContent from "@tiptap-pro/extension-details-content";
import DetailsSummary from "@tiptap-pro/extension-details-summary";
const details = [
  Details.configure({
    persist: true,
    HTMLAttributes: {
      class: "details",
    },
  }),
  DetailsContent,
  DetailsSummary,
];

// 块节点扩展
import { Blockquote } from "./Blockquote/Blockquote";
import { Callout } from "./Callout/Callout";
import { Column } from "../../../src/components/tiptap-node/columns-node/column-node-extension";
import { Columns } from "../../../src/components/tiptap-node/columns-node/columns-node-extension";
import { CodeBlockLowlight } from "./CodeBlockLowlight/CodeBlockLowlight";
const blocks = [Blockquote, Callout, Column, Columns, CodeBlockLowlight];

// 表格节点扩展
import { Table } from "./Table/Table";
import { TableHeader } from "./Table/TableHeader";
import { TableCell } from "./Table/TableCell";
import { TableRow } from "./Table/TableRow";
const tables = [Table, TableHeader, TableCell, TableRow];

/* marks */

import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import { Highlight } from "./Highlight/Highlight";
import Italic from "@tiptap/extension-italic";
import { Link } from "./Link/Link";
import Strike from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
const marks = [
  Bold,
  Code,
  Highlight,
  Italic,
  Link.configure({
    openOnClick: false,
  }),
  Strike,
  Subscript,
  Superscript,
  TextStyle,
  Underline,
];

/* functionality */

import Selection from "./Selection/Selection"; // 当编辑器未聚焦且有选区时，这个装饰会触发，使用户在聚焦外也能看到选区效果。
import ListKeymap from "@tiptap/extension-list-keymap";
import TextAlign from "@tiptap/extension-text-align"; // 文本对齐 text-align: justify
import Color from "@tiptap/extension-color"; // 设置字体颜色 <span style="color: #958DF1">
import Focus from "@tiptap/extension-focus"; // 焦点扩展 .has-focus
import Gapcursor from "@tiptap/extension-gapcursor"; // 用于通常无法到达的位置的光标插件 .ProseMirror-selectednode
import History from "@tiptap/extension-history";
import Placeholder from "@tiptap/extension-placeholder";
import Dropcursor from "@tiptap/extension-dropcursor"; // 当将某些内容拖入编辑器时，该插件会在放置位置显示光标。
import CharacterCount from "@tiptap/extension-character-count"; // 字符数限制为特定长度，并能够返回字符和单词的数量
const functionalitys = [
  // Selection,
  ListKeymap,
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {};
    },
  }).configure({
    types: ["heading", "paragraph"],
  }),
  Color,
  Focus,
  Gapcursor,
  History,
  Placeholder.configure({
    includeChildren: true, // 显示嵌套节点的装饰
    showOnlyCurrent: false, // 仅在当前选定的节点中显示装饰。
    placeholder: () => "",
  }),
  Dropcursor.configure({
    width: 4,
  }),
  CharacterCount,
];

// toc
import { TableOfContents } from "@tiptap-pro/extension-table-of-contents";
import { TableOfContentsNode } from "./TableOfContentsNode/TableOfContentsNode";
const tableOfContents = [TableOfContents, TableOfContentsNode];

// emoji
import { Emoji } from "./Emoji/Emoji";

// 提及
import { Mention } from "./Mention/Mention";

// 斜杠命令
// import slashCommand from "./SlashCommand/SlashCommand";

// fileHandler
import { FileHandler } from "./FileHandler/FileHandler";

export const extensionKit: Extensions = [
  ...nodes,
  ...lists,
  ...details,
  ...blocks,
  ...tables,
  ...marks,
  ...functionalitys,
  ...tableOfContents,
  Emoji,
  // Mention,
  FileHandler,
  // 添加 slashCommand 后编译时间从 2.2s 变为 8.7s，原因不明
  // slashCommand,
];
