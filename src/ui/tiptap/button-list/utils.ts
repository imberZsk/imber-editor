import { getOssConfig, uploadOss } from '@/lib/api-myplus'
import { Editor } from '@tiptap/react'

// 上传图片
export const uploadImage = async (editor: Editor) => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async () => {
    if (input.files?.length) {
      const file = input.files[0]
      // 先获取阿里云配置
      const data = await getOssConfig()
      // 再上传到OSS
      const url = await uploadOss({
        accessKeyId: data.key,
        accessKeySecret: data.secret,
        stsToken: data.token,
        path: data.path,
        file
      })

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = function (e) {
        editor
          ?.chain()
          .focus()
          .setImage({
            // src: e.target?.result as string
            src: url
          })
          .run()
      }
    }
  }
  input.click()
}
