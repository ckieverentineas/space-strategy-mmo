import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import styles from '@/styles/Home.module.css'
import Account from '@/component/account/account'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Profile() {
    const [session, setSession] = useState<null | string>(null)
    useEffect (() =>{setSession(localStorage.getItem('session'))}, [])
    async function Profile_Exit() {
        localStorage.clear()
        document.location.href= "/"
    }
    return (
      <>
        <Head>
          <title>{`Личный кабинет повелителя ${session}`}</title>
          <meta name="description" content="Создано, чтобы вы настраивали" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <div className={styles.center}>
            <h2 className={inter.className}>
              <span>↓</span> {`Приветствуем повелителя ${session}`} <span>↓</span>
            </h2>
          </div>
          <div className={styles.card}> <Account /> </div>
          <div className={styles.grid}>
            <a href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
              <h2 className={inter.className}>
                Карта мира <span>-&gt;</span>
              </h2>
            </a>
            <Link href="/view/planet" className={styles.card} rel="noopener noreferrer">
              <h2 className={inter.className}>
                Планеты <span>-&gt;</span>
              </h2>
            </Link> 
            <a href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
              <h2 className={inter.className}>
                Корабли <span>-&gt;</span>
              </h2>
            </a> 
            <a href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
              <h2 className={inter.className}>
                Исследования <span>-&gt;</span>
              </h2>
            </a> 
            <a href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
              <h2 className={inter.className}>
                Технологии <span>-&gt;</span>
              </h2>
            </a>
            <div className={styles.card} onClick={Profile_Exit}>
              <h2 className={inter.className}>
                Выйти из игры <span>-&gt;</span>
              </h2>
            </div>
          </div>
        </main>
      </>
    )
}
