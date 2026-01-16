import { BubbleMenu as BaseBubbleMenu, useEditorState } from "@tiptap/react";
import { useCallback } from "react";
import { sticky } from "tippy.js";
import { v4 as uuid } from "uuid";
import { PanelLeft, Columns2, PanelRight } from "lucide-react";

import { MenuProps } from "../types";
import { getRenderContainer } from "@/tiptap/utils";
import { Toolbar } from "@/tiptap/ui/Toolbar";
import { ColumnLayout } from "../../../../src/components/tiptap-node/columns-node/columns-node-extension";

export const ColumnsMenu = ({ editor, appendTo }: MenuProps) => {
  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, "columns");
    const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0);

    return rect;
  }, [editor]);

  const shouldShow = useCallback(() => {
    const isColumns = editor.isActive("columns");
    return isColumns;
  }, [editor]);

  const onColumnLeft = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarLeft).run();
  }, [editor]);

  const onColumnRight = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarRight).run();
  }, [editor]);

  const onColumnTwo = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.TwoColumn).run();
  }, [editor]);
  const { isColumnLeft, isColumnRight, isColumnTwo } = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isColumnLeft: ctx.editor.isActive("columns", { layout: ColumnLayout.SidebarLeft }),
        isColumnRight: ctx.editor.isActive("columns", { layout: ColumnLayout.SidebarRight }),
        isColumnTwo: ctx.editor.isActive("columns", { layout: ColumnLayout.TwoColumn }),
      };
    },
  });

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="columnsMenu"
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        getReferenceClientRect,
        appendTo: () => appendTo?.current,
        plugins: [sticky],
        sticky: "popper",
      }}
    >
      <Toolbar.Wrapper>
        <Toolbar.Button tooltip="Sidebar left" active={isColumnLeft} onClick={onColumnLeft}>
          <PanelLeft className="size-4" strokeWidth={2.5} />
        </Toolbar.Button>
        <Toolbar.Button tooltip="Two columns" active={isColumnTwo} onClick={onColumnTwo}>
          <Columns2 className="size-4" strokeWidth={2.5} />
        </Toolbar.Button>
        <Toolbar.Button tooltip="Sidebar right" active={isColumnRight} onClick={onColumnRight}>
          <PanelRight className="size-4" strokeWidth={2.5} />
        </Toolbar.Button>
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  );
};

export default ColumnsMenu;
