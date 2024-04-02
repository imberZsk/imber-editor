'use server'
import { db } from '@/lib/db'

export const create = async () => {
  await new Promise((r) => setTimeout(r, 2000))
  const newDoc = await db.doc.create({
    data: {
      title: '新建文档 ' + Date.now().toString().slice(-4),
      content: '文章内容'
    }
  })
  return newDoc
}
