import LazyUpload from './lazy-upload'
import { ButtonListProps } from './type'

const TiptapButtons: React.FC<ButtonListProps> = ({ editor }) => {
  return (
    <div className="flex gap-[12px] text-background">
      {/* 图片上传 */}
      <LazyUpload editor={editor}></LazyUpload>
    </div>
  )
}

export default TiptapButtons
