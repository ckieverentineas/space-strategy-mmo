import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Auth from '@/component/account/auth'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Многопользовательская онлайн игра Космические Мишки</title>
        <meta name="description" content="Создано, чтобы вы играли" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Тех поддержка:&nbsp;
            <code className={styles.code}>ckieverentineas@yandex.ru</code>
          </p>
          <div>
            <a href="https://vk.com/dj.federation" target="_blank" rel="noopener noreferrer">
              By{' '}
              <Image src="/vercel.svg" alt="Vercel Logo" className={styles.vercelLogo} width={100} height={24} priority />
            </a>
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className={inter.className}>
              Начни сейчас <span>-&gt;</span>
              <Auth />
            </h2>
          </div>
          <a href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2 className={inter.className}>
              Открытый мир <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Вы не поверите, но конца не видно галактикам пространству и времени!
            </p>
            <div className={styles.thirteen}>
              <Image src="/thirteen.svg" alt="13" width={100} height={100} priority />
            </div>
            <p className={inter.className}>
              Закрытое бета тестирование уже здесь!
            </p>
          </a>
          <a href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2 className={inter.className}>
              Свобода <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Кто вас ограничит в том, чем вы будите заниматься? - Только вы сами!
            </p>
            <div className={styles.thirteen}>
              <Image src="/thirteen.svg" alt="13" width={100} height={100} priority />
            </div>
            <p className={inter.className}>
              Закрытое бета тестирование уже здесь!
            </p>
          </a>
          <a href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2 className={inter.className}>
              Бесконечность <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Неограниченные технологические и личные исследования!
            </p>
            <div className={styles.thirteen}>
              <Image src="/thirteen.svg" alt="13" width={100} height={100} priority />
            </div>
            <p className={inter.className}>
              Закрытое бета тестирование уже здесь!
            </p>
          </a>
          <a href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2 className={inter.className}>
              Кастомизация <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Настройте свою собственную расу и оправдайте свой выбор на равне с другими!
            </p>
            <div className={styles.thirteen}>
              <Image src="/thirteen.svg" alt="13" width={100} height={100} priority />
            </div>
            <p className={inter.className}>
              Закрытое бета тестирование уже здесь!
            </p>
          </a>
          <a href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2 className={inter.className}>
              Донат <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Ваш кошелек бездонный и мы примем неограниченные суммы ваших кошельков!
            </p>
            <div className={styles.thirteen}>
              <Image src="/thirteen.svg" alt="13" width={100} height={100} priority />
            </div>
            <p className={inter.className}>
              Закрытое бета тестирование уже здесь!
            </p>
          </a>
        </div>
      </main>
    </>
  )
}
