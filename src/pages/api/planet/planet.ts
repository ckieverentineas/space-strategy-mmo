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
        id_account: number,
        crdate: Date
    }> | null
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const { token, name } = req.body
        const answer = { data: null, status: "", block: 0 }
        const planet_create_check: Planet_Owner | null = await prisma.planet_Owner.findFirst({ where: { name: name } })
        if (!planet_create_check) {
            const planet_list = await prisma.planet.findMany({})
            const planer_create = await prisma.planet_Owner.create({ data: { name: name, id_planet: planet_list[Random_Integer(0, planet_list.length)].id, id_account: Number(token) } })
            if (!planer_create) {
                answer.status = "Невозможно создать планету"
            } else {
                const block = await prisma.block.findMany({})
                for (let i=0; i < 128; i++) {
                    const temp = block[Random_Integer(0, block.length-1)]
                    const planer_block_create: Planet_Block | null = await prisma.planet_Block.create({ data: { id_planet_owner: planer_create.id, id_block:  temp.id}})
                    if (planer_block_create) { answer.block++ }
                }
                answer.status += `Создана планета ${name} c количеством площадок: ${answer.block}`
            }
        } else {
            answer.status = "Такая планета уже сформирована!"
        }
        res.status(200).json(answer)
    }
    if (req.method === 'GET') {
        const { token } = req.body
        const planet_check: Planet_Owner[] | null = await prisma.planet_Owner.findMany({ where: { id_account: token }, include: { planet: true, account: true } })
        if (!planet_check) {
            res.status(200).json({ data: null, status: "У вас нет планет, надо создать лол...", block: 0 })
        } else {
            res.status(200).json({ data: planet_check, status: "Давайте посмотрим...", block: 0 })
        }
        
    }
}
