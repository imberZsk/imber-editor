export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const selection = searchParams.get('selection')
  // const lat = searchParams.get('lat')

  // try {
  //   const res = await fetch(
  //     // 搜索POI接口
  //     // https://lbs.amap.com/api/webservice/guide/api-advanced/search
  //     `https://restapi.amap.com/v3/place/around?key=${apiKey}&location=${lng},${lat}&radius=10000&offset=8`
  //   )

  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //   const data = await res.json()

  //   return Response.json(data)
  // } catch (err) {
  //   console.log(err)
  // }

  const res = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer sk-ac2cb7c03f714651b729fdc3b640354b'
    },
    body: JSON.stringify({
      // model: 'qwen-vl-chat-v1',
      model: 'qwen-vl-plus',
      input: {
        messages: [
          {
            role: 'user',
            content: [
              // {
              //   image:
              // 本次输入的图像内容的 url 链接；图像格式目前支持：bmp, jpg, jpeg, png 和 tiff。
              //     'https://ssm.res.meizu.com/admin/2023/12/08/1780834568/RhqIigHob9.jpg?x-oss-process=image/resize,w_378/format,webp'
              // },
              {
                // 本次输入的文本内容；支持 utf-8 编码的中文、英文输入。
                // text: '能不能帮我想个产品名字:最近在做一个Ai工具类的学习产品，主要是提供学习氛围，指明学习路径，规划学习计划，以及打卡的一系列机制'
                text: selection
              }
            ]
          }
        ]
      }
    })
  })

  const data = await res.json()
  return Response.json(data)
}
