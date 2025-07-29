import { cn } from '@/lib/utils'
import { ReactNodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { useCallback } from 'react'

export const ImageBlockView = (props: ReactNodeViewProps) => {
  const { editor, getPos, node } = props
  const { src, width, align } = node.attrs

  // 对齐方式
  const wrapperClassName = cn(
    align === 'left' ? 'ml-0' : 'ml-auto',
    align === 'right' ? 'mr-0' : 'mr-auto',
    align === 'center' && 'mx-auto'
  )

  const onClick = useCallback(() => {
    editor.commands.setNodeSelection(getPos()) // 选中图片
  }, [getPos, editor.commands])

  return (
    <NodeViewWrapper>
      <div className={wrapperClassName} style={{ width }}>
        {/* eslint-disable-next-line  */}
        <img className="block" src={src} alt="" onClick={onClick} />
      </div>
    </NodeViewWrapper>
  )
}

export default ImageBlockView
