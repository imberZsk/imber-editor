import { useRef } from "react";
import { EditorContent } from "@tiptap/react";
import { HocuspocusProvider } from "@hocuspocus/provider";
import * as Y from "yjs";

import { useBlockEditor } from "./useBlockEditor";
import { DragHandleItemMenu } from "../menus/DragHandleItemMenu/DragHandleItemMenu";
import { LinkMenu } from "../menus/LinkMenu/LinkMenu";
import { ColumnsMenu } from "../menus/ColumnsMenu/ColumnsMenu";
import { ImageBlockMenu } from "../menus/ImageBlockMenu/ImageBlockMenu";
import { TableColumnMenu } from "../menus/Table/TableColumnMenu";
import { TableRowMenu } from "../menus/Table/TableRowMenu";
import { TextMenu } from "../menus/TextMenu/TextMenu";

import "@/tiptap/styles/index.css";

type BlockEditorProps = React.HTMLAttributes<HTMLDivElement> & {
  ydoc: Y.Doc;
  provider?: HocuspocusProvider | null | undefined;
};

export const BlockEditor: React.FC<BlockEditorProps> = ({ ydoc, provider, content, ...props }) => {
  const { editor, users, collabState } = useBlockEditor({ ydoc, provider });
  const menuContainerRef = useRef(null);

  // // 避免出现 flushSync 错误
  // // https://github.com/ueberdosis/tiptap/issues/4355
  // useEffect(() => {
  //   if (editor && content) {
  //     setTimeout(() => {
  //       editor.commands.setContent(content);
  //     }, 100);
  //   }
  // }, [editor, content]);

  if (!editor || !users) return null;

  return (
    <div>
      <EditorContent ref={menuContainerRef} editor={editor} {...props}></EditorContent>
      <DragHandleItemMenu editor={editor} />
      <TextMenu editor={editor} />
      <LinkMenu editor={editor} appendTo={menuContainerRef} />
      <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
      <TableRowMenu editor={editor} appendTo={menuContainerRef} />
      <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
      <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
    </div>
  );
};
