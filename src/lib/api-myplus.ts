const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
import { fetchEventSource } from '@microsoft/fetch-event-source'
import CryptoJS from 'crypto-js'

// 发布文章
export const create = async ({ target }: { target: string }) => {
  const res = await fetch(`${baseUrl}/myplus-qing/u/content/auth/create/v4`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: '文章标题 / Article Title',
      ats: [],
      format: 2,
      forumId: 238,
      topicIds: '',
      content: target
    })
  })
  const data = await res.json()
  window.open(`https://www.meizu.cn/thread/${data.data.id}`)
}

export interface OssConfigData {
  expiration: string
  path: string
  secret: string
  key: string
  token: string
}

// 获取阿里云的配置stsToken
export const getOssConfig = async () => {
  const res = await fetch(`${baseUrl}/myplus-qing/u/attachment/auth/ossSign`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  return data.data as OssConfigData
}

interface UploadProps {
  accessKeyId: string
  accessKeySecret: string
  stsToken: string
  path: string
  file: File
}

// 上传到OSS
export const uploadOss = async ({ accessKeyId, accessKeySecret, stsToken, path, file }: UploadProps) => {
  const region = 'oss-cn-shenzhen'
  const bucket = 'mz-micro-bbs'
  // 用到才使用这个库
  const OSS = (await import('ali-oss')).default
  const client = new OSS({
    region,
    accessKeyId,
    accessKeySecret,
    stsToken,
    bucket
  })

  const options = {}

  const ossRes = await client.multipartUpload(path + file.name, file, options)

  const url = `https://ssm.res.meizu.com/${ossRes.name}`

  return url
}

// AI - 根据关键词生成朋友圈文案
export const getAiGcDocumentFriend = async (selection: string) => {
  const url = `/api-myplus/myplus-qing/ug/ai/gc/document/friend?text=${encodeURIComponent(selection)}`
  let tar = ''
  await fetchEventSource(url, {
    method: 'POST',
    onmessage(ev) {
      const encodedData = ev.data // Base64 编码的字符串
      // 解密 Base64 数据
      const decodedData = CryptoJS.enc.Base64.parse(encodedData).toString(CryptoJS.enc.Utf8)
      // setStr(str => (str += decodedData))
      tar += decodedData
    }
  })
  return tar
}
