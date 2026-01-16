import React, { useCallback } from "react";
import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";
import { ArrowUpToLine, ArrowDownToLine, Trash } from "lucide-react";

import * as PopoverMenu from "@/tiptap/ui/PopoverMenu";
import { Toolbar } from "@/tiptap/ui/Toolbar";
import { MenuProps, ShouldShowProps } from "@/tiptap/menus/types";
import { isRowGripSelected } from "./utils";

export const TableRowMenu = React.memo(({ editor, appendTo }: MenuProps): JSX.Element => {
  const shouldShow = useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!state || !from) {
        return false;
      }

      return isRowGripSelected({ editor, view, state, from });
    },
    [editor],
  );

  const onAddRowBefore = useCallback(() => {
    editor.chain().focus().addRowBefore().run();
  }, [editor]);

  const onAddRowAfter = useCallback(() => {
    editor.chain().focus().addRowAfter().run();
  }, [editor]);

  const onDeleteRow = useCallback(() => {
    editor.chain().focus().deleteRow().run();
  }, [editor]);

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="tableRowMenu"
      updateDelay={0}
      tippyOptions={{
        appendTo: () => {
          return appendTo?.current;
        },
        placement: "left",
        offset: [0, 15],
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
      }}
      shouldShow={shouldShow}
    >
      <div>d</div>
      <Toolbar.Wrapper isVertical>
        <PopoverMenu.Item
          iconComponent={<ArrowUpToLine className="size-4" strokeWidth={2.5} />}
          close={false}
          label="Add row before"
          onClick={onAddRowBefore}
        />
        <PopoverMenu.Item
          iconComponent={<ArrowDownToLine className="size-4" strokeWidth={2.5} />}
          close={false}
          label="Add row after"
          onClick={onAddRowAfter}
        />
        <PopoverMenu.Item
          iconComponent={<Trash className="size-4" strokeWidth={2.5} />}
          close={false}
          label="Delete row"
          onClick={onDeleteRow}
        />
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  );
});

TableRowMenu.displayName = "TableRowMenu";

export default TableRowMenu;
