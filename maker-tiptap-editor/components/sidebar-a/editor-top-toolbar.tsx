import {
  CirclePlus,
  Undo2,
  Redo2,
  PaintRoller,
  ChevronDown,
  Eraser,
  Pilcrow,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  AlignJustify,
  Link,
  Baseline,
  FileCode,
  SquareCode,
  Minus,
  Quote,
  MessageSquareText,
  Columns2,
  List,
  ListOrdered,
  ListTodo,
  Sigma,
  Ellipsis,
  Lightbulb,
  TextQuote,
  MessageCircleMore,
  FileCode2,
  Smile,
  LayoutGrid,
  ListCollapse,
  CircleAlert,
  SquareChartGantt,
} from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";

export const EditorTopToolbar = () => {
  return (
    <ToggleGroup size={"sm"} type="multiple" className="flex border-b py-2">
      {/* 加号 */}
      <ToggleGroupItem value="CirclePlus" className="h-7 px-0">
        <CirclePlus className="text-sidebar-primary size-4" />
      </ToggleGroupItem>

      <Separator orientation="vertical" className="mx-1.5 h-5" />

      {/* 撤消、重做 */}
      <ToggleGroupItem value="Undo2" disabled className="h-7 px-1.5">
        <Undo2 className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="Redo2" className="h-7 px-1.5">
        <Redo2 className="size-4" />
      </ToggleGroupItem>

      {/* 清除节点、清除文本样式 */}
      {/* <ToggleGroupItem value="PaintRoller" className="h-7 px-1.5">
        <PaintRoller className="size-4" />
      </ToggleGroupItem> */}
      <ToggleGroupItem value="Eraser" className="h-7 px-1.5">
        <Eraser className="size-4" />
      </ToggleGroupItem>

      <Separator orientation="vertical" className="mx-1.5 h-5" />

      <ToggleGroupItem value="Pilcrow" className="h-7 px-1.5">
        <Pilcrow className="size-4" />
        <ChevronDown className="size-3" />
      </ToggleGroupItem>

      {/* 文本对齐 */}
      {/* <ToggleGroupItem value="AlignJustify" className="h-7 px-1.5">
        <AlignJustify className="size-4" />
        <ChevronDown className="size-3" />
      </ToggleGroupItem> */}

      <Separator orientation="vertical" className="mx-1.5 h-5" />

      {/* 粗、斜、下划线、删除线、内联代码 */}
      <ToggleGroupItem value="Bold" className="h-7 px-1.5">
        <Bold className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" className="h-7 px-1.5">
        <Italic className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" className="h-7 px-1.5">
        <Underline className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="Strikethrough" className="h-7 px-1.5">
        <Strikethrough className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="Code" className="h-7 px-1.5">
        <Code className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="Link" className="h-7 px-1.5">
        <Link className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="Sigma" className="h-7 px-1.5">
        <Sigma className="size-4" />
      </ToggleGroupItem>

      {/* 字体颜色 */}
      <ToggleGroupItem value="Baseline" className="h-7 px-1.5">
        <Baseline className="size-4" />
        <ChevronDown className="size-3" />
      </ToggleGroupItem>

      <Separator orientation="vertical" className="mx-1.5 h-5" />

      {/* 项目符号列表 */}
      <ToggleGroupItem value="List" className="h-7 px-1.5">
        <List className="size-4" />
      </ToggleGroupItem>

      {/* 有序列表 */}
      {/* <ToggleGroupItem value="ListOrdered" className="h-7 px-1.5">
        <ListOrdered className="size-4" />
      </ToggleGroupItem> */}

      {/* 任务列表 */}
      {/* <ToggleGroupItem value="ListTodo" className="h-7 px-1.5">
        <ListTodo className="size-4" />
      </ToggleGroupItem> */}

      {/* <Separator orientation="vertical" className="mx-1.5 h-5" /> */}

      {/* 引用块 */}
      <ToggleGroupItem value="TextQuote" className="h-7 px-1.5">
        <TextQuote className="size-4" />
      </ToggleGroupItem>

      {/* 可折叠块 */}
      <ToggleGroupItem value="ListCollapse" className="h-7 px-1.5">
        <ListCollapse className="size-4" />
      </ToggleGroupItem>

      {/* 高亮块 */}
      <ToggleGroupItem value="CircleAlert" className="h-7 px-1.5">
        <SquareChartGantt className="size-4" />
      </ToggleGroupItem>

      {/* 代码块 */}
      <ToggleGroupItem value="FileCode2" className="h-7 px-1.5">
        <FileCode2 className="size-4" />
      </ToggleGroupItem>

      {/* 分隔线 */}
      <ToggleGroupItem value="Minus" className="h-7 px-1.5">
        <Minus className="size-4" />
      </ToggleGroupItem>

      <Separator orientation="vertical" className="mx-1.5 h-5" />

      <ToggleGroupItem value="Smile" className="h-7 px-1.5">
        <Smile className="size-4" />
      </ToggleGroupItem>

      {/* 评论 */}
      <ToggleGroupItem value="MessageSquareText" className="h-7 px-1.5">
        <MessageSquareText className="size-4" />
      </ToggleGroupItem>

      {/* 更多 */}
      <ToggleGroupItem value="LayoutGrid" className="h-7 px-1.5">
        <LayoutGrid className="size-4" />
      </ToggleGroupItem>

      {/* 多列 */}
      {/* <ToggleGroupItem value="Columns2" className="h-7 px-1.5">
        <Columns2 className="size-4" />
      </ToggleGroupItem> */}
    </ToggleGroup>
  );
};
