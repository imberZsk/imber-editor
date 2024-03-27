// import dynamic from 'next/dynamic'
// const LazyUpload = dynamic(() => import('./lazy-upload'), { loading: () => <p>Loading...</p> })
import LazyUpload from './lazy-upload'
import { ButtonListProps } from './type'
import Image from 'next/image'

const TiptapButtons: React.FC<ButtonListProps> = ({ editor }) => {
  return (
    <div className="flex gap-[12px]">
      {/* <Image src={'/editor/tt.webp'} width={24} height={24} alt=""></Image> */}
      {/* <Image src={'/editor/turn.webp'} width={24} height={24} alt=""></Image> */}

      {/* 加粗 */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <Image src={'/editor/b.webp'} width={24} height={24} alt="" className="cursor-pointer"></Image>
      </button>

      {/* 斜体 */}
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <Image src={'/editor/i.webp'} width={24} height={24} alt="" className="cursor-pointer"></Image>
      </button>

      {/* 删除线 */}
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <Image src={'/editor/s.webp'} width={24} height={24} alt="" className="cursor-pointer"></Image>
      </button>

      {/* 下划线，老社区没有下滑线 */}
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
      >
        <Image src={'/editor/u.webp'} width={24} height={24} alt="" className="cursor-pointer"></Image>
      </button>

      {/* 图片上传 */}
      <LazyUpload editor={editor}></LazyUpload>

      {/* <Image src={'/editor/a.webp'} width={24} height={24} alt="" className="cursor-pointer"></Image>
      <Image src={'/editor/turn.webp'} width={24} height={24} alt=""></Image>
      <Image src={'/editor/left.webp'} width={24} height={24} alt=""></Image>
      <Image src={'/editor/center.webp'} width={24} height={24} alt=""></Image>
      <Image src={'/editor/right.webp'} width={24} height={24} alt=""></Image>
      <Image src={'/editor/ul.webp'} width={24} height={24} alt=""></Image>
      <Image src={'/editor/ol.webp'} width={24} height={24} alt=""></Image>
      <Image src={'/editor/ol2.webp'} width={24} height={24} alt=""></Image>

      <Image src={'/editor/99.webp'} width={24} height={24} alt=""></Image>
      <Image src={'/editor/link.webp'} width={24} height={24} alt=""></Image>
      <Image src={'/editor/emoji.webp'} width={24} height={24} alt=""></Image>

      <Image src={'/editor/y.webp'} width={24} height={24} alt=""></Image> */}

      {/* <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic(⌘ + I)
      </button>
      <button
        onClick={() =>
          editor.chain().focus().setCard({ title: 'title', subTitle: 'subTitle', price: '价格', img: '图片' }).run()
        }
        className="outline-none"
      >
        商品卡片(新Nodes - card)
      </button>
      <button onClick={() => console.log(editor.getJSON())} className="outline-none">
        获取编辑器数据
      </button> */}
    </div>
  )
}

export default TiptapButtons
