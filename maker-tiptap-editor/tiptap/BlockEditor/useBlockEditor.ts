"use client";

import { useEffect, useState } from "react";
import { useEditor, useEditorState } from "@tiptap/react";
import type { AnyExtension, Editor } from "@tiptap/core";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { HocuspocusProvider, WebSocketStatus } from "@hocuspocus/provider";
import type { Doc as YDoc } from "yjs";

import { initialContent } from "@/tiptap/data/initialContent";
import { userColors, userNames } from "@/tiptap/data/constants";
import { extensionKit } from "@/tiptap/extensions/extensionKit";
import { randomElement } from "@/tiptap/utils";
import { EditorUser } from "./types";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

type useBlockEditorProps = {
  ydoc: YDoc;
  provider?: HocuspocusProvider | null | undefined;
  userId?: string;
  userName?: string;
};

export const useBlockEditor = ({ ydoc, provider, userId, userName = "Maxi" }: useBlockEditorProps) => {
  const [collabState, setCollabState] = useState<WebSocketStatus>(
    provider ? WebSocketStatus.Connecting : WebSocketStatus.Disconnected,
  );

  // 编辑器配置
  const editor = useEditor(
    {
      autofocus: true, // 将焦点设置到文档的开头
      editable: true, // 是否可编辑
      enableInputRules: true, // 是否启用输入规则，可以只允许特定的规则 [Link, 'horizontalRule']
      enablePasteRules: true, // 是否启用粘贴规则，可以只允许特定的规则[Link, 'horizontalRule']
      injectCSS: false, // 默认情况下，Tiptap 会注入少量 CSS，自行引用 css 文件
      immediatelyRender: typeof window !== "undefined", // 更好地控制渲染 https://tiptap.dev/docs/guides/performance
      shouldRerenderOnTransaction: false, // 不要主动渲染
      // 初始化编辑器内容
      onCreate: (ctx) => {
        // 如果协同提供器存在，就等待同步完成并设置内容
        if (provider && !provider.isSynced) {
          provider.on("synced", () => {
            setTimeout(() => {
              if (ctx.editor.isEmpty) {
                ctx.editor.commands.setContent(initialContent);
              }
            }, 0);
          });
        } else if (ctx.editor.isEmpty) {
          ctx.editor.commands.setContent(initialContent);
          ctx.editor.commands.focus("start", { scrollIntoView: true });
        }
      },
      extensions: [
        ...extensionKit,
        provider
          ? Collaboration.configure({
              document: ydoc,
            })
          : undefined,
        provider
          ? CollaborationCursor.configure({
              provider,
              user: {
                name: randomElement(userNames),
                color: randomElement(userColors),
              },
            })
          : undefined,
      ].filter((e): e is AnyExtension => e !== undefined),
      editorProps: {
        attributes: {
          class: "chief-editor min-h-full w-3xl px-[calc((100vw-768px)/2)]",
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
        },
      },
    },
    [ydoc, provider],
  );

  const users = useEditorState({
    editor,
    selector: (ctx): (EditorUser & { initials: string })[] => {
      if (!ctx.editor?.storage.collaborationCursor?.users) {
        return [];
      }

      return ctx.editor.storage.collaborationCursor.users.map((user: EditorUser) => {
        const names = user.name?.split(" ");
        const firstName = names?.[0];
        const lastName = names?.[names.length - 1];
        const initials = `${firstName?.[0] || "?"}${lastName?.[0] || "?"}`;

        return { ...user, initials: initials.length ? initials : "?" };
      });
    },
  });

  useEffect(() => {
    provider?.on("status", (event: { status: WebSocketStatus }) => {
      setCollabState(event.status);
    });
  }, [provider]);

  // window.editor = editor;

  return { editor, users, collabState };
};
