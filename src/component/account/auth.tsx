import { useState } from 'react'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';
export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [answer, setAnswer] = useState('');
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const data = { email, password };
        console.log(data);
        await Register_User()
    };
    const router = useRouter()
    async function Register_User() {
        const res = await fetch('/api/account/auth', {
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        })
        const result = await res.json()
        setAnswer(result['status'])
        if (Object.keys(result).length > 1) {
            localStorage.removeItem('session')
            localStorage.setItem('session', `${result['token']}`)
            router.push('/view/account')
        }
        console.log(result)
    }
    return (
        <div className={styles.card}>
            <div>{answer}</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label><br/>
                    <input
                        id="email"
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                    /><br/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label><br/>
                    <input
                        id="password"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    /><br/>
                </div>
                <button type="submit">Логин</button>
            </form>
        </div>
    );
}