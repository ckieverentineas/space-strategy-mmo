// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../module/prisma'

type Data = {
  status: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    // Process a POST request
    const { email, password } = req.body
    console.log(`Входные данные: ${JSON.stringify(req.body)}`)
    const user_email_check = await prisma.user.findMany({
      where: {
        email
      }
    })
    console.log(`Email адрес в базе данных: ${JSON.stringify(user_email_check)}`)
    if (!Object.keys(user_email_check).length) {
      const user_create = await prisma.user.create({
        data: {
          password,
          email
        }
      })
      console.log(`Создан новый пользователь: ${JSON.stringify(user_create)}`)
      const user_create_account = await prisma.account.create({
        data: {
          lvl: 80,
          xp: 100500,
          gold: 9999,
          id_user: user_create['id']
        }
      })
      console.log(`Подготовлена таблица аккаунта для зарегестрированного пользователя: ${JSON.stringify(user_create_account)}`)
      const answer = {
        status: 'User created'
      }
      res.status(200).json(answer)
      
    } else {
      const user_password_check = await prisma.user.findFirst({
        where: {
          email,
          password
        }
      })
      console.log(`Пользователь: ${JSON.stringify(user_password_check)} авторизовался`)
      if (user_password_check != null) {
        if (!Object.keys(user_password_check).length) {
          const answer = {
            status: 'User login incorrect'
          }
          res.status(200).json(answer)
        } else {
          const token = user_password_check['id']
          const answer = {
            status: 'User login success',
            token
          }
          res.status(200).json(answer)
        }
      } else {
        const answer = {
          status: 'User login failed'
        }
        res.status(200).json(answer)
      }
    }
    
  }
  if (req.method === 'GET') {
    // Process a POST request
    //const { email, password } = req.body
    const user = await prisma.user.findMany()
    const answer = {
      status: JSON.stringify(user)
    }
    res.status(200).json(answer)
  }
}
