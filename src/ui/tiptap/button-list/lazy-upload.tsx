import Image from 'next/image'
import { uploadImage } from './utils'
import { Editor } from '@tiptap/react'

const LazyUpload = ({ editor }: { editor: Editor }) => {
  return (
    <button onClick={() => uploadImage(editor)}>
      <Image src={'/editor/image.svg'} width={20} height={20} alt="" className="cursor-pointer"></Image>
    </button>
  )
}

export default LazyUpload
