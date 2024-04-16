import { Editor, Extension } from '@tiptap/core'
import tippy from 'tippy.js'
import Suggestion from '@tiptap/suggestion'
import { PluginKey } from '@tiptap/pm/state'
import render from './sug-render'
import { GROUPS } from './groups'

export const extensionName = 'slashCommand'

export let popup: any

export const Card = Extension.create({
  name: 'slashCommand',
  onCreate() {
    popup = tippy('body', {
      interactive: true,
      trigger: 'manual',
      placement: 'bottom-start',
      theme: 'slash-command',
      maxWidth: '16rem',
      offset: [16, 8],
      popperOptions: {
        strategy: 'fixed',
        modifiers: [
          {
            name: 'flip',
            enabled: false
          }
        ]
      }
    })
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        // Suggestion 配置参考 https://tiptap.dev/docs/editor/api/utilities/suggestion
        editor: this.editor,
        // 触发自动完成弹出窗口的字符
        char: '/',
        // 允许或禁止建议项目中的空格
        allowSpaces: true,
        // 仅在行的开头触发自动完成弹出窗口
        startOfLine: true,
        pluginKey: new PluginKey('slashCommand'),

        // 通过该函数触发 item 的 action，在 menu-list.tsx 中调用
        command: ({ editor, props }: { editor: Editor; props: any }) => {
          const { view, state } = editor
          const { $head, $from } = view.state.selection

          const end = $from.pos
          const from = $head?.nodeBefore
            ? end - ($head.nodeBefore.text?.substring($head.nodeBefore.text?.indexOf('/')).length ?? 0)
            : $from.start()

          const tr = state.tr.deleteRange(from, end)
          view.dispatch(tr)

          props.action(editor)
          view.focus()
        },

        // 判断在什么情况下可以触发 suggestion
        allow: (tr) => {
          console.log(tr.range, 'tr')
          const { state, range } = tr
          // { state, range }
          const $from = state.doc.resolve(range.from)

          // console.log($from, '$from')
          const isRootDepth = $from.depth === 1 // 当前在第一层级
          const isParagraph = $from.parent.type.name === 'paragraph' // 在 paragraph 中
          const isStartOfNode = $from.parent.textContent?.charAt(0) === '/' // 在节点的开头

          // 判断是否在 column 中
          const isInColumn = this.editor.isActive('column')

          // 判断 `/` 后续内容，不是两个空格
          const afterContent = $from.parent.textContent?.substring($from.parent.textContent?.indexOf('/'))
          const isValidAfterContent = !afterContent?.endsWith('  ')

          // 综合判断
          return (
            ((isRootDepth && isParagraph && isStartOfNode) || (isInColumn && isParagraph && isStartOfNode)) &&
            isValidAfterContent
          )
        },

        // 获取 suggestion 的 items ，包括搜索功能
        items: ({ query }: { query: string }) => {
          const withFilteredCommands = GROUPS.map((group) => ({
            ...group, // name, title, commands
            commands: group.commands
              // 根据 query 过滤
              .filter((item) => {
                const labelNormalized = item.label.toLowerCase().trim()
                const queryNormalized = query.toLowerCase().trim()
                if (item.aliases) {
                  const aliases = item.aliases.map((alias) => alias.toLowerCase().trim())
                  return labelNormalized.includes(queryNormalized) || aliases.includes(queryNormalized)
                }
                return labelNormalized.includes(queryNormalized)
              })
              // 判断 shouldBeHidden
              .filter((command) => (command.shouldBeHidden ? !command.shouldBeHidden(this.editor) : true))
          }))
          const withoutEmptyGroups = withFilteredCommands.filter((group) => {
            // 必须有 commands
            if (group.commands.length > 0) {
              return true
            }
            return false
          })
          const withEnabledSettings = withoutEmptyGroups.map((group) => ({
            ...group,
            commands: group.commands.map((command) => ({
              ...command,
              isEnabled: true // 增加 isEnabled 属性
            }))
          }))
          return withEnabledSettings
        },
        render
      })
    ]
  }
})
