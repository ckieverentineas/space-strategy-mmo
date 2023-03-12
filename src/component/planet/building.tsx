import { useState } from 'react'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
export default function Build(location_map: { location_map: { id: any; name: any; image: any; } }) {
    const [building, setBuilding] = useState<null | Array<{ id: any; name: any; image: any; }>>([])
    const [status, setStatus] = useState('');
    async function Init_Building() {
        const res = await fetch('/api/planet/building')
        const result = await res.json()
        setBuilding(result.data)
        setStatus(result.status)
    }
    async function Building_Build(building_sel: { id: any; name: any; image: any; }) {
        const res = await fetch('/api/planet/building', {
            body: JSON.stringify({
                id_block: location_map.location_map.id,
                id_build: building_sel.id,
                token: localStorage['session']
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        const result = await res.json()
        setStatus(result['status'])
        console.log(result)    
    }
    return (
        <div className={styles.card}>
            <div>{status}</div>
            <p className={styles.card} onClick={Init_Building}>Выбор постройки</p>
            <div className={styles.city}>
                {building?.map((cit) => (
                    <Tippy key={`tippy_building_info${cit.id}`}
                        className={styles.cityline} 
                        content={<div className={styles.card}><pre>Номер: {cit.id}<br/>Название: {cit.name}</pre></div>} 
                        duration={[750, 1000]} 
                        interactive={true} 
                        interactiveBorder={20}
                    >
                        <Tippy key={`tippy_building_build${cit.id}`}
                            className={styles.cityline} 
                            content={<div className={styles.card}onDoubleClick={() => {Building_Build(cit)}}>Построить</div>} 
                            placement="auto-end"
                            duration={[2000, 1000]} 
                            delay={[1000, null]}  
                            interactive={true} 
                            interactiveBorder={20}
                            allowHTML={false}
                        >
                            <div key={`building${cit.id}`} className={styles.cityline}>
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