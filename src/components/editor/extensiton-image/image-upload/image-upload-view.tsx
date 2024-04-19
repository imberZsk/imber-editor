import { Editor, NodeViewWrapper } from '@tiptap/react'
import { useCallback } from 'react'
import ImageUploader from './image-uploader'

interface ImageUploadViewProps {
  getPos: () => number
  editor: Editor
}

export default function ImageUploadView(props: ImageUploadViewProps) {
  const { getPos, editor } = props

  const onUpload = useCallback(
    (url: string) => {
      if (url) {
        editor
          .chain()
          .setImageBlock({ src: url }) // 插图图片 imageBlock 节点
          .deleteRange({ from: getPos(), to: getPos() }) // 删除当前 imageUpload 节点
          .focus()
          .run()
      }
    },
    [getPos, editor]
  )

  return (
    <NodeViewWrapper>
      <div className="p-0 m-0" data-drag-handle>
        <ImageUploader onUpload={onUpload} />
      </div>
    </NodeViewWrapper>
  )
}
