import { uploadImage } from './utils'
import { Editor } from '@tiptap/react'
import { Image as LucideImage } from 'lucide-react'

const LazyUpload = ({ editor }: { editor: Editor }) => {
  return (
    <button onClick={() => uploadImage(editor)}>
      <LucideImage size={20} className="cursor-pointer"></LucideImage>
    </button>
  )
}

export default LazyUpload
