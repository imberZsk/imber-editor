import { getOssConfig, uploadOss } from '@/lib/api-myplus'
import { Editor } from '@tiptap/react'

// 上传图片
export const uploadImage = async (editor: Editor) => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async () => {
    // 图片上传到阿里云，并且editor里插入图片链接和宽度高度
    if (input.files?.length) {
      const data = getOssConfig()
      // await import('https://gosspublic.alicdn.com/aliyun-oss-sdk-6.18.0.min.js')
      // const ComponentC = dynamic(() => import('https://gosspublic.alicdn.com/aliyun-oss-sdk-6.18.0.min.js'), {
      //   ssr: false
      // })
      // await import('https://gosspublic.alicdn.com/aliyun-oss-sdk-6.18.0.min.js')

      // console.log(OSS)

      await uploadOss()

      console.log(data)
      const reader = new FileReader()
      reader.readAsDataURL(input.files[0])
      reader.onloadend = function (e) {
        editor
          ?.chain()
          .focus()
          .setImage({
            src: e.target?.result as string
          })
          .run()
      }
    }
  }
  input.click()
}
