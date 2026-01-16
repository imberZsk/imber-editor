import { Mention as TiptapMention } from "@tiptap/extension-mention";
import { mentionSuggestion } from "./mentionSuggestion";

export const Mention = TiptapMention.configure({
  HTMLAttributes: {
    class: "mention",
  },
  suggestion: mentionSuggestion,
});
