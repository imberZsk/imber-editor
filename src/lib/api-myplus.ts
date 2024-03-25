const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

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

// 获取阿里云的配置stsToken
export const getOssConfig = async () => {
  const res = await fetch(`${baseUrl}/myplus-qing/u/attachment/auth/ossSign`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  return data
}

export const uploadOss = async () => {
  const region = 'oss-cn-shenzhen'
  const bucket = 'mz-micro-bbs'
  const OSS = (await import('ali-oss')).default
  const client = new OSS({
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
    region,
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: 'yourAccessKeyId',
    accessKeySecret: 'yourAccessKeySecret',
    // 从STS服务获取的安全令牌（SecurityToken）。
    stsToken: 'yourSecurityToken',
    // 填写Bucket名称。
    bucket
  })
  console.log(client)
}
