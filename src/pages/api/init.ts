import prisma from "./module/prisma"
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    planet_block_counter: number, 
    planet_building_counter: number, 
    planet_counter: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const location_list = [  
            { id: 1, name: "Земля", image: "/art/texture/planet_block/earth.png" },
            { id: 2, name: "Трава", image: "/art/texture/planet_block/green.png" }, 
            { id: 3, name: "Снег", image: "/art/texture/planet_block/snow.png" },
            { id: 4, name: "Камень", image: "/art/texture/planet_block/stone.png" },
            { id: 5, name: "Вулкан", image: "/art/texture/planet_block/vulcan.png" },
            { id: 6, name: "Вода", image: "/art/texture/planet_block/water.png" }
        ]
        const answer = { planet_block_counter: 0, planet_building_counter: 0, planet_counter: 0 }
        for (const i in location_list) {
            const location_check = await prisma.block.findFirst({ where: { name: location_list[i].name, image: location_list[i].image}})
            if (!location_check) {
                const location_create = await prisma.block.create({ data: { name: location_list[i].name, image: location_list[i].image } })
                console.log(`Добавлена новая локация: ${JSON.stringify(location_create)}`)
                if (location_create) { answer.planet_block_counter++ }
            }
        }
        const building_list = [  
            { id: 1, name: "Ратуша", image: "/art/texture/planet_building/central.png"},
            { id: 2, name: "Дом", image: "/art/texture/planet_building/house.png"}, 
            { id: 3, name: "Склад", image: "/art/texture/planet_building/memory.png"},
            { id: 4, name: "Электростанция", image: "/art/texture/planet_building/electric.png"},
            { id: 5, name: "Ферма", image: "/art/texture/planet_building/farm.png"},
            { id: 6, name: "Леспозавод", image: "/art/texture/planet_building/trees.png"}
        ]
        for (const i in building_list) {
            const building_check = await prisma.building.findFirst({ where: { name: building_list[i].name, image: building_list[i].image}})
            if (!building_check) {
                const building_create = await prisma.building.create({ data: { name: building_list[i].name, image: building_list[i].image } })
                console.log(`Добавлено новое здание: ${JSON.stringify(building_create)}`)
                if (building_create) { answer.planet_building_counter++ }
            }
        }
        const planet_list = [  
            { id: 1, name: "Вольфрамовая планета", image: "/art/texture/planet/planet1.png"},
            { id: 2, name: "Золотая планета", image: "/art/texture/planet/planet2.png"}, 
            { id: 3, name: "Серебрянная планета", image: "/art/texture/planet/planet3.png"},
            { id: 4, name: "Бронзовая планета", image: "/art/texture/planet/planet4.png"},
            { id: 5, name: "Чугунная планета", image: "/art/texture/planet/planet5.png"},
            { id: 6, name: "Звездная планета", image: "/art/texture/planet/star1.png"}
        ]
        for (const i in planet_list) {
            const building_check = await prisma.planet.findFirst({ where: { name: planet_list[i].name, image: planet_list[i].image}})
            if (!building_check) {
                const building_create = await prisma.planet.create({ data: { name: planet_list[i].name, image: planet_list[i].image } })
                console.log(`Добавлено новое здание: ${JSON.stringify(building_create)}`)
                if (building_create) { answer.planet_counter++ }
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
