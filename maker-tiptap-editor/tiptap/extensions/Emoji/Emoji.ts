import { Emoji as TipTapEmoji, gitHubEmojis } from "@tiptap-pro/extension-emoji";
import { emojiSuggestion } from "./emojiSuggestion";

export const Emoji = TipTapEmoji.configure({
  // 默认emojis列表，包含版本 14.1 的所有 Unicode 表情符号
  // 扩展gitHubEmojis列表，其中还包含自定义表情符号，如 :octocat:
  emojis: gitHubEmojis,
  enableEmoticons: false, // 是否应将文本转换为表情符号（例如<3❤️）。默认为 false。
  forceFallbackImages: false, // 指定是否应始终渲染后备图像。默认为 false。
  suggestion: emojiSuggestion,
});
