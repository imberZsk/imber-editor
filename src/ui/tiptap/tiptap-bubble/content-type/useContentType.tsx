import { Editor } from '@tiptap/react'
import { useMemo } from 'react'
import {
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  List,
  ListOrdered,
  ListTodo,
} from 'lucide-react'

export const useContentType = (editor: Editor | null) => {
  const options = useMemo(() => {
    if (editor == null) return []
    return [
      {
        id: 'heading1',
        Icon: () => <Heading1 className="mr-2 h-4 w-4" />,
        label: '标题1',
        disabled: () => !editor.can().setHeading({ level: 1 }),
        isActive: () => editor.isActive('heading', { level: 1 }),
        onClick: () =>
          editor
            .chain()
            .focus()
            .lift('taskItem')
            .liftListItem('listItem')
            .setHeading({ level: 1 })
            .run(),
      },
      {
        id: 'heading2',
        Icon: () => <Heading2 className="mr-2 h-4 w-4" />,
        label: '标题2',
        disabled: () => !editor.can().setHeading({ level: 2 }),
        isActive: () => editor.isActive('heading', { level: 2 }),
        onClick: () =>
          editor
            .chain()
            .focus()
            .lift('taskItem')
            .liftListItem('listItem')
            .setHeading({ level: 2 })
            .run(),
      },
      {
        id: 'heading3',
        Icon: () => <Heading3 className="mr-2 h-4 w-4" />,
        label: '标题3',
        disabled: () => !editor.can().setHeading({ level: 3 }),
        isActive: () => editor.isActive('heading', { level: 3 }),
        onClick: () =>
          editor
            .chain()
            .focus()
            .lift('taskItem')
            .liftListItem('listItem')
            .setHeading({ level: 3 })
            .run(),
      },
      {
        id: 'paragraph',
        Icon: () => <Pilcrow className="mr-2 h-4 w-4" />,
        label: '段落',
        disabled: () => !editor.can().setParagraph(),
        isActive: () =>
          editor.isActive('paragraph') &&
          !editor.isActive('orderedList') &&
          !editor.isActive('bulletList') &&
          !editor.isActive('taskList'),
        onClick: () =>
          editor
            .chain()
            .focus()
            .lift('taskItem')
            .liftListItem('listItem')
            .setParagraph()
            .run(),
      },
      {
        id: 'list',
        Icon: () => <List className="mr-2 h-4 w-4" />,
        label: '无序列表',
        disabled: () => !editor.can().toggleBulletList(),
        isActive: () => editor.isActive('bulletList'),
        onClick: () => editor.chain().focus().toggleBulletList().run(),
      },
      {
        id: 'listOrdered',
        Icon: () => <ListOrdered className="mr-2 h-4 w-4" />,
        label: '有序列表',
        disabled: () => !editor.can().toggleOrderedList(),
        isActive: () => editor.isActive('orderedList'),
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
      },
      {
        id: 'listTodo',
        Icon: () => <ListTodo className="mr-2 h-4 w-4" />,
        label: '任务列表',
        disabled: () => !editor.can().toggleTaskList(),
        isActive: () => editor.isActive('taskList'),
        onClick: () => editor.chain().focus().toggleTaskList().run(),
      },
    ]
  }, [editor])

  return options
}
