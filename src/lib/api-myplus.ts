const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

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
