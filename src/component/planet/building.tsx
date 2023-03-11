import { useState } from 'react'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
export default function Build(location_map: { location_map: { id: any; name: any; image: any; } }) {
    const [building, setBuilding] = useState<null | Array<{ id: any; name: any; image: any; }>>([])
    function Init_Building() {
        const build: Array<{ id: any; name: any; image: any; }> = []
        const list = [  
            { id: 1, name: "Ратуша", image: "/art/texture/build/central.png"},
            { id: 2, name: "Дом", image: "/art/texture/build/house.png"}, 
            { id: 3, name: "Склад", image: "/art/texture/build/memory.png"},
            { id: 4, name: "Электростанция", image: "/art/texture/build/electric.png"},
            { id: 5, name: "Ферма", image: "/art/texture/build/farm.png"},
            { id: 6, name: "Леспозавод", image: "/art/texture/build/trees.png"}
        ]
        for (const i in list) {
            const temp = list[i]
            build.push({id: i, name: temp.name, image: temp.image})
        }
        setBuilding(build)
    }
    async function Building_Build(building_sel: { id: any; name: any; image: any; }) {
        console.log("Выбранная локация", location_map.location_map)
        console.log("Выбранное здание", building_sel)
        let location_build = {
            location: {
                id: location_map.location_map.id, 
                name: location_map.location_map.name, 
                image: location_map.location_map.image 
            }, 
            build: {
                id: building_sel.id, 
                name: building_sel.name, 
                image: building_sel.image
            },
            unit: []
        }
        console.log("Результат", location_build)
    }
    return (
        <div className={styles.card}>
            <p className={styles.card} onClick={Init_Building}>Выбор постройки</p>
            <div className={styles.city}>
                {building?.map((cit) => (
                    <Tippy className={styles.cityline} content={<div className={styles.card}><pre>Номер: {cit.id}<br/>Название: {cit.name}</pre></div>} duration={[750, 1000]} interactive={true} interactiveBorder={20}>
                        <Tippy className={styles.cityline} 
                            content={
                                <div className={styles.card}><button onDoubleClick={() => {Building_Build(cit)}}>Построить</button></div>
                            } 
                            placement="auto-end"
                            duration={[2000, 1000]} 
                            delay={[1000, null]}  
                            interactive={true} 
                            interactiveBorder={20}
                            allowHTML={false}
                        >
                            <div className={styles.cityline}>
                                <Image className={styles.card} key={cit.id}
                                    src = {cit.image}
                                    width="100"
                                    height="100"
                                    alt = {cit.image}
                                    onClick = {() => { console.log(`Вы нажали на здание ${cit.name}`); }}
                                />
                            </div>
                        </Tippy>
                    </Tippy>    
                ))}
            </div>
        </div>
    );
}