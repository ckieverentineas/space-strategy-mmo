import { useState, useEffect, forwardRef } from 'react'
import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import Build from './building';
function Random_Integer(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default function City() {
    const [name, setName] = useState('');
    const [city, setCity] = useState([])
    const [planets, setPlanets] = useState([])
    const [status, setStatus] = useState('');
    async function Load_Planet(id: number) {
        const res = await fetch('/api/planet/planet_one', {
            body: JSON.stringify({
                type: 'planet',
                id,
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
        setCity(result['data']['Planet_Block'])
    }
    async function Load_Planets() {
        const res = await fetch('/api/planet/planet', {
            body: JSON.stringify({
                type: 'planets',
                token: localStorage['session']
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        const result = await res.json()
        console.log("🚀 ~ file: planet.tsx:34 ~ Load_Planets ~ result:", result['data'])
        setStatus(result['status'])
        setPlanets(result['data'])
        console.log(result) 
    }
    useEffect (() =>{Load_Planets()}, [])
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const data = {
            name
        };
        console.log(data);
        Planet_Creator()
    }
    async function Planet_Creator() {
        const res = await fetch('/api/planet/planet', {
            body: JSON.stringify({
                type: 'planet_creator',
                name,
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
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Название планеты:</label>
                </div>
                <div>
                    <input
                        id="name"
                        type="name"
                        onChange={e => setName(e.target.value)}
                    /><br></br>
                </div>
                <button type="submit">Создать</button>
            </form>
            <div className={styles.city}>
                {planets?.map((planet: any) => (
                    <Tippy key={`tippy_planet_info${planet.id}`}
                        className={styles.cityline} 
                        content={<div className={styles.card}><pre>{planet.id}-{planet.name} <br/>{planet.planet.name}</pre></div> } 
                        duration={[750, 1000]} 
                        delay={[300, null]} 
                        interactive={true} 
                        interactiveBorder={20} 
                    >
                        <Tippy key={`tippy_planet_open${planet.id}`}
                            className={styles.cityline} 
                            content={<div onClick={() => Load_Planet(planet.id)}>Вход</div>} 
                            placement="auto-end"
                            duration={[2000, 1000]} 
                            delay={[1000, null]} 
                            interactive={true} 
                            interactiveBorder={20}
                        >
                            <div key={`planet${planet.id}`} className={styles.cityline}>
                                <Image key={planet.planet.id}
                                    className={styles.card} 
                                    src = {planet.planet.image} 
                                    width="100"
                                    height="100"
                                    alt = {planet.planet.image}
                                    onClick = {() => { console.log(`Вы нажали на планету ${planet.id}`); }}
                                />
                            </div>
                        </Tippy>
                    </Tippy>
                ))}
            </div>
            <div className={styles.city}>
                {city?.map((cit: any) => (
                    <Tippy key={`tippy_block${cit.id}`}
                        className={styles.cityline} 
                        content={<div className={styles.card}><pre>Площадка: {cit.id}<br/>Местность: {cit.block.name}<br/>Зданий: {0}<br/>Юнитов: {0}</pre></div> } 
                        duration={[750, 1000]} 
                        delay={[300, null]} 
                        interactive={true} 
                        interactiveBorder={20} 
                    >
                        <Tippy key={`tippy_block_build${cit.id}`}
                            className={styles.cityline} 
                            content={<Build location_map={cit}/>} 
                            placement="auto-end"
                            duration={[2000, 1000]} 
                            delay={[1000, null]} 
                            interactive={true} 
                            interactiveBorder={20}
                        >
                            <div key={`block${cit.id}`}className={styles.cityline}>
                                <Image  className={styles.card} key={cit.id}
                                    src = {cit.Planet_Building[0]?.building?.image || cit.block.image} 
                                    width="100"
                                    height="100"
                                    alt = {cit.Planet_Building[0]?.building?.image || cit.block.image}
                                    onClick = {() => { console.log(`Вы нажали на площадку ${cit.id} тип местности ${cit.block.image}`); }}
                                />
                            </div>
                        </Tippy>
                    </Tippy>
                ))}
            </div>
        </div>
    );
}