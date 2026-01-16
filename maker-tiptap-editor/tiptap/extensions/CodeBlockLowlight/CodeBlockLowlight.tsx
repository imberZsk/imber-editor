import { ReactNodeViewRenderer } from "@tiptap/react";
import { CodeBlockLowlight as TiptapCodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { CodeBlockLowlightView } from "./CodeBlockLowlightView";
import { all, createLowlight } from "lowlight";

const lowlight = createLowlight(all);

export const CodeBlockLowlight = TiptapCodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockLowlightView);
  },
}).configure({ lowlight });
