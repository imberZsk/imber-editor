import { useState, useCallback } from 'react'
import { uploadImageAPI } from '@/components/editor/utils/api'
import { useToast } from '@/components/ui/use-toast'

const useUploader = ({ onUpload }: { onUpload: (url: string) => void }) => {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const uploadFile = useCallback(
    async (file: File) => {
      setLoading(true)
      try {
        const url = await uploadImageAPI() // 上传图片
        onUpload(url) // 上传成功后，调用 onUpload 方法
      } catch (errPayload: any) {
        console.error(errPayload)
        const error = errPayload?.response?.data?.error || '上传失败'
        toast({
          variant: 'destructive',
          description: error,
        })
      }
      setLoading(false)
    },
    [onUpload, toast]
  )

  return { loading, uploadFile }
}

export default useUploader
