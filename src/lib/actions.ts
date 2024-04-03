'use server'

import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export const create = async (prevState: any, formData: FormData) => {
  console.log(formData)

  const username = formData.get('username') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password
    }
  })

  redirect('/login')
}
