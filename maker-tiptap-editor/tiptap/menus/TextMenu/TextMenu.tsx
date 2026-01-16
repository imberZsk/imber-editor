import { memo } from "react";
import { BubbleMenu, Editor } from "@tiptap/react";
import * as Popover from "@radix-ui/react-popover";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  FileCode,
  Highlighter,
  Palette,
  EllipsisVertical,
  Subscript,
  Superscript,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

import { useTextmenuTypes } from "./hooks/useTextmenuTypes";
import { useTextmenuCommands } from "./hooks/useTextmenuCommands";
import { useTextmenuStates } from "./hooks/useTextmenuStates";
import { Toolbar } from "@/tiptap/ui/Toolbar";
import { Surface } from "@/tiptap/ui/Surface";
import { EditLinkPopover } from "./EditLinkPopover";
import { ContentTypePicker } from "./ContentTypePicker";
import { ColorPicker } from "./ColorPicker";

// 使用 Memo 缓存按钮，只在编辑器状态变化时才会被重新渲染
const MemoButton = memo(Toolbar.Button);
const MemoColorPicker = memo(ColorPicker);
const MemoContentTypePicker = memo(ContentTypePicker);

export type TextMenuProps = {
  editor: Editor;
};

export const TextMenu = ({ editor }: TextMenuProps) => {
  const commands = useTextmenuCommands(editor);
  const states = useTextmenuStates(editor);
  const blockOptions = useTextmenuTypes(editor);

  return (
    <BubbleMenu editor={editor} pluginKey="textsMenu" shouldShow={states.shouldShow} updateDelay={250}>
      <Toolbar.Wrapper>
        <MemoContentTypePicker options={blockOptions} />
        <Toolbar.Divider />
        <MemoButton tooltip="Bold" tooltipShortcut={["Mod", "B"]} onClick={commands.onBold} active={states.isBold}>
          <Bold className="size-4" strokeWidth={2.5} />
        </MemoButton>
        <MemoButton
          tooltip="Italic"
          tooltipShortcut={["Mod", "I"]}
          onClick={commands.onItalic}
          active={states.isItalic}
        >
          <Italic className="size-4" strokeWidth={2.5} />
        </MemoButton>
        <MemoButton
          tooltip="Underline"
          tooltipShortcut={["Mod", "U"]}
          onClick={commands.onUnderline}
          active={states.isUnderline}
        >
          <Underline className="size-4" strokeWidth={2.5} />
        </MemoButton>
        <MemoButton
          tooltip="Strikehrough"
          tooltipShortcut={["Mod", "Shift", "S"]}
          onClick={commands.onStrike}
          active={states.isStrike}
        >
          <Strikethrough className="size-4" strokeWidth={2.5} />
        </MemoButton>
        <MemoButton tooltip="Code" tooltipShortcut={["Mod", "E"]} onClick={commands.onCode} active={states.isCode}>
          <Code className="size-4" strokeWidth={2.5} />
        </MemoButton>
        <MemoButton tooltip="Code block" onClick={commands.onCodeBlock}>
          <FileCode className="size-4" strokeWidth={2.5} />
        </MemoButton>
        <EditLinkPopover onSetLink={commands.onLink} />
        <Popover.Root>
          <Popover.Trigger asChild>
            <MemoButton active={!!states.currentHighlight} tooltip="Highlight text">
              <Highlighter className="size-4" strokeWidth={2.5} />
            </MemoButton>
          </Popover.Trigger>
          <Popover.Content side="top" sideOffset={8} asChild>
            <Surface className="p-1">
              <MemoColorPicker
                color={states.currentHighlight}
                onChange={commands.onChangeHighlight}
                onClear={commands.onClearHighlight}
              />
            </Surface>
          </Popover.Content>
        </Popover.Root>
        <Popover.Root>
          <Popover.Trigger asChild>
            <MemoButton active={!!states.currentColor} tooltip="Text color">
              <Palette className="size-4" strokeWidth={2.5} />
            </MemoButton>
          </Popover.Trigger>
          <Popover.Content side="top" sideOffset={8} asChild>
            <Surface className="p-1">
              <MemoColorPicker
                color={states.currentColor}
                onChange={commands.onChangeColor}
                onClear={commands.onClearColor}
              />
            </Surface>
          </Popover.Content>
        </Popover.Root>
        <Popover.Root>
          <Popover.Trigger asChild>
            <MemoButton tooltip="More options">
              <EllipsisVertical className="size-4" strokeWidth={2.5} />
            </MemoButton>
          </Popover.Trigger>
          <Popover.Content side="top" asChild>
            <Toolbar.Wrapper>
              <MemoButton
                tooltip="Subscript"
                tooltipShortcut={["Mod", "."]}
                onClick={commands.onSubscript}
                active={states.isSubscript}
              >
                <Subscript className="size-4" strokeWidth={2.5} />
              </MemoButton>
              <MemoButton
                tooltip="Superscript"
                tooltipShortcut={["Mod", ","]}
                onClick={commands.onSuperscript}
                active={states.isSuperscript}
              >
                <Superscript className="size-4" strokeWidth={2.5} />
              </MemoButton>
              <Toolbar.Divider />
              <MemoButton
                tooltip="Align left"
                tooltipShortcut={["Shift", "Mod", "L"]}
                onClick={commands.onAlignLeft}
                active={states.isAlignLeft}
              >
                <AlignLeft className="size-4" strokeWidth={2.5} />
              </MemoButton>
              <MemoButton
                tooltip="Align center"
                tooltipShortcut={["Shift", "Mod", "E"]}
                onClick={commands.onAlignCenter}
                active={states.isAlignCenter}
              >
                <AlignCenter className="size-4" strokeWidth={2.5} />
              </MemoButton>
              <MemoButton
                tooltip="Align right"
                tooltipShortcut={["Shift", "Mod", "R"]}
                onClick={commands.onAlignRight}
                active={states.isAlignRight}
              >
                <AlignRight className="size-4" strokeWidth={2.5} />
              </MemoButton>
              <MemoButton
                tooltip="Justify"
                tooltipShortcut={["Shift", "Mod", "J"]}
                onClick={commands.onAlignJustify}
                active={states.isAlignJustify}
              >
                <AlignJustify className="size-4" strokeWidth={2.5} />
              </MemoButton>
            </Toolbar.Wrapper>
          </Popover.Content>
        </Popover.Root>
      </Toolbar.Wrapper>
    </BubbleMenu>
  );
};
