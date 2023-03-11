import { useEffect, useState } from 'react'
import styles from '@/styles/Home.module.css'
export default function Account() {
    const [lvl, setLvl] = useState(0);
    const [gold, setGold] = useState(0);
    const [xp, setXp] = useState(0);
    const [status, setStatus] = useState('');
    async function Get_Account() {
        const res = await fetch('/api/account/account', {
            body: JSON.stringify({
                token: localStorage['session']
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        const result = await res.json()
        setLvl(result['lvl'])
        setXp(result['xp'])
        setGold(result['gold'])
        if (Object.keys(result).length > 1444) {
            localStorage.removeItem('session')
            localStorage.setItem('session', `${result['token']}`)
            document.location.href = await "/profile"
        }
        console.log(result)
    }
    useEffect (() =>{Get_Account() }, [])
    async function Game_Init() {
        const res = await fetch('/api/init', {
            body: JSON.stringify({
                token: localStorage['session']
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        const result = await res.json()
        setStatus(JSON.stringify(result))
        console.log(result)
    }
    return (
        <div>
            <label className={styles.card}> LVL: {lvl}</label> 
            <label className={styles.card}> XP: {xp}</label> 
            <label className={styles.card}> Gold: {gold}</label>
            {status ? ( <label className={styles.card} > Status: {status}</label> ) : ( <label></label> )}
            <button onClick={Game_Init}>Инициализировать игру</button>
        </div>
    );
}