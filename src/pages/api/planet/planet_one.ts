// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../module/prisma';
import { Planet, Planet_Block, Planet_Owner } from '@prisma/client';

function Random_Integer(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
type Data = { status: string, block: number, 
    data: Array<{
        id: number,
        name: string,
        id_planet: number,
        id_account: number,
        crdate: Date,
        Planet_Block: Planet_Block[]
    }> | null
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const { token, id } = req.body
        const planet_create_check: any = await prisma.planet_Owner.findFirst({ where: { id: id, id_account: Number(token) }, include: { Planet_Block: { include: { block: true, Planet_Building: { include: {building: true}} } } } })
        const answer = { data: planet_create_check, status: "", block: 0 }
        if (!planet_create_check) {
            answer.status = "Произошла ошибка просмотра планеты!"
        } else {
            answer.status = "Смотрим планету!"
        }
        res.status(200).json(answer)
    }
}
