"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useEditor, EditorContent, UseEditorOptions } from "@tiptap/react";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { Doc as YDoc } from "yjs";

import { BlockEditor } from "@/tiptap/BlockEditor/BlockEditor";
import "@/tiptap/styles/index.css";

const EditorPage = ({ params }: { params: { room: string } }) => {
  const { room } = params;
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null);
  const ydoc = useMemo(() => new YDoc(), []);

  useLayoutEffect(() => {
    new HocuspocusProvider({
      url: "ws://127.0.0.1:1234",
      name: "doc-" + room,
      document: ydoc,
    });
  }, [setProvider, ydoc, room]);

  return (
    <>
      <BlockEditor ydoc={ydoc} provider={provider} />
    </>
  );
};

export default EditorPage;
