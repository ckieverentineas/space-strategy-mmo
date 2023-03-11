import prisma from "./module/prisma"
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    counter_location: number,
    counter_build: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const location_list = [  
            { id: 1, name: "Земля", image: "/art/texture/planet/earth.png" },
            { id: 2, name: "Трава", image: "/art/texture/planet/green.png" }, 
            { id: 3, name: "Снег", image: "/art/texture/planet/snow.png" },
            { id: 4, name: "Камень", image: "/art/texture/planet/stone.png" },
            { id: 5, name: "Вулкан", image: "/art/texture/planet/vulcan.png" },
            { id: 6, name: "Вода", image: "/art/texture/planet/water.png" }
        ]
        const answer = { counter_location: 0, counter_build: 0 }
        for (const i in location_list) {
            const location_check = await prisma.block.findFirst({ where: { name: location_list[i].name, image: location_list[i].image}})
            if (!location_check) {
                const location_create = await prisma.block.create({ data: { name: location_list[i].name, image: location_list[i].image } })
                console.log(`Добавлена новая локация: ${JSON.stringify(location_create)}`)
                if (location_create) { answer.counter_location++ }
            }
        }
        const building_list = [  
            { id: 1, name: "Ратуша", image: "/art/texture/build/central.png"},
            { id: 2, name: "Дом", image: "/art/texture/build/house.png"}, 
            { id: 3, name: "Склад", image: "/art/texture/build/memory.png"},
            { id: 4, name: "Электростанция", image: "/art/texture/build/electric.png"},
            { id: 5, name: "Ферма", image: "/art/texture/build/farm.png"},
            { id: 6, name: "Леспозавод", image: "/art/texture/build/trees.png"}
        ]
        for (const i in building_list) {
            const building_check = await prisma.building.findFirst({ where: { name: building_list[i].name, image: building_list[i].image}})
            if (!building_check) {
                const building_create = await prisma.building.create({ data: { name: building_list[i].name, image: building_list[i].image } })
                console.log(`Добавлено новое здание: ${JSON.stringify(building_create)}`)
                if (building_create) { answer.counter_build++ }
            }
        }
        res.status(200).json(answer)
    }
    if (req.method === 'GET') {
        // Process a POST request
        //const { email, password } = req.body
        const user = await prisma.user.findMany()
        //res.status(200).json(user)
    }
}
