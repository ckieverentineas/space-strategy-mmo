
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../module/prisma'

type Data = {
    id: number,
    lvl: number,
    xp: number,
    gold: number,
    id_user: number,
    crdate: Date
} | null

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        // Process a POST request
        const { token } = await req.body
        console.log(`Входные данные: ${JSON.stringify(req.body)}`)
        const account = await prisma.account.findFirst({
            where: {
                id_user: Number(token)
            }
        })
        console.log(`Полученые данные аккаунта: ${JSON.stringify(account)}`)
        res.status(200).json(account)
    }
}
