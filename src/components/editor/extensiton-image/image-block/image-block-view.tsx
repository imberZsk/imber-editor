import { cn } from '@/lib/utils'
import { Node } from '@tiptap/pm/model'
import { Editor, NodeViewWrapper } from '@tiptap/react'
import { useCallback } from 'react'

interface ImageBlockViewProps {
  editor: Editor
  getPos: () => number
  node: Node & {
    attrs: {
      src: string
    }
  }
  updateAttributes: (attrs: Record<string, string>) => void
}

export const ImageBlockView = (props: ImageBlockViewProps) => {
  const { editor, getPos, node } = props
  const { src } = node.attrs

  // 对齐方式
  const wrapperClassName = cn(
    node.attrs.align === 'left' ? 'ml-0' : 'ml-auto',
    node.attrs.align === 'right' ? 'mr-0' : 'mr-auto',
    node.attrs.align === 'center' && 'mx-auto'
  )

  const onClick = useCallback(() => {
    editor.commands.setNodeSelection(getPos()) // 选中图片
  }, [getPos, editor.commands])

  return (
    <NodeViewWrapper>
      <div className={wrapperClassName} style={{ width: node.attrs.width }}>
        {/* eslint-disable-next-line  */}
        <img className="block" src={src} alt="" onClick={onClick} />
      </div>
    </NodeViewWrapper>
  )
}

export default ImageBlockView
