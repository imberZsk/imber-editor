import { useEffect, useState } from "react";
import { Editor } from "@tiptap/react";
import DragHandle from "@tiptap-pro/extension-drag-handle-react";
import * as Popover from "@radix-ui/react-popover";
import { Plus, GripVertical, RemoveFormatting, Clipboard, Copy, Trash2 } from "lucide-react";

import { useData } from "./useData";
import { useActions } from "./useActions";
import { Toolbar } from "@/tiptap/ui/Toolbar";
import { Surface } from "@/tiptap/ui/Surface";
import { DropdownButton } from "@/tiptap/ui/Dropdown";

export type DragHandleItemMenuProps = {
  editor: Editor;
  isShowPlus?: boolean;
};

export const DragHandleItemMenu = ({ editor, isShowPlus = false }: DragHandleItemMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useData();
  const actions = useActions(editor, data.currentNode, data.currentNodePos);

  useEffect(() => {
    if (menuOpen) {
      editor.commands.setMeta("lockDragHandle", true);
    } else {
      editor.commands.setMeta("lockDragHandle", false);
    }
  }, [editor, menuOpen]);

  return (
    <DragHandle
      pluginKey="DragHandleItemMenu"
      editor={editor}
      onNodeChange={data.handleNodeChange}
      tippyOptions={{
        offset: [-2, 16],
        zIndex: 99,
      }}
    >
      <div className="flex items-center gap-0.5">
        {isShowPlus && (
          <Toolbar.Button onClick={actions.handleAdd}>
            <Plus className="size-4" strokeWidth={2.5} />
          </Toolbar.Button>
        )}
        <Popover.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Popover.Trigger asChild>
            <Toolbar.Button>
              <GripVertical className="size-4" strokeWidth={2.5} />
            </Toolbar.Button>
          </Popover.Trigger>
          <Popover.Content side="bottom" align="start" sideOffset={8}>
            <Surface className="flex min-w-[16rem] flex-col p-2">
              <Popover.Close asChild>
                <DropdownButton onClick={actions.resetTextFormatting}>
                  <RemoveFormatting className="size-4" strokeWidth={2.5} />
                  清除格式
                </DropdownButton>
              </Popover.Close>
              <Popover.Close asChild>
                <DropdownButton onClick={actions.copyNodeToClipboard}>
                  <Clipboard className="size-4" strokeWidth={2.5} />
                  复制到剪贴板
                </DropdownButton>
              </Popover.Close>
              <Popover.Close asChild>
                <DropdownButton onClick={actions.duplicateNode}>
                  <Copy className="size-4" strokeWidth={2.5} />
                  复制
                </DropdownButton>
              </Popover.Close>
              <Toolbar.Divider horizontal />
              <Popover.Close asChild>
                <DropdownButton
                  onClick={actions.deleteNode}
                  className="bg-red-500 bg-opacity-10 text-red-500 hover:bg-red-500 hover:bg-opacity-20 dark:text-red-500 dark:hover:bg-red-500 dark:hover:bg-opacity-20 dark:hover:text-red-500"
                >
                  <Trash2 className="size-4" strokeWidth={2.5} />
                  删除
                </DropdownButton>
              </Popover.Close>
            </Surface>
          </Popover.Content>
        </Popover.Root>
      </div>
    </DragHandle>
  );
};
