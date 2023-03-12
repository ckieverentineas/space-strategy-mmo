// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../module/prisma';
import { Building, Planet, Planet_Block, Planet_Building, Planet_Owner } from '@prisma/client';

function Random_Integer(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
type Data = { status: string, data: Building[] } | { status: string, data: Planet_Building }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'GET') {
        const planet_create_check: Building[] = await prisma.building.findMany({})
        const answer = { data: planet_create_check, status: "" }
        if (!planet_create_check) {
            answer.status = "Произошла ошибка выбора зданий"
        } else {
            answer.status = "Че построим?!"
        }
        res.status(200).json(answer)
    }
    if (req.method === 'POST') {
        const { token, id_block, id_build } = req.body
        const planet_create_check: Planet_Building | null = await prisma.planet_Building.create({ data: { id_planet_block: Number(id_block), id_building: Number(id_build)}})
        const answer = { data: planet_create_check, status: "", block: 0 }
        if (!planet_create_check) {
            answer.status = "Произошла ошибка строительства здания!"
        } else {
            answer.status = "Успешно построено!"
        }
        res.status(200).json(answer)
    }
}
