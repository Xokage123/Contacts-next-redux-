import { MyHeader } from "./header/header"
import Head from "next/head"

import styles from "./layout.module.scss"

export const MyLayout = ({
  children
}) => {
  return (
    <>
      <Head>
        <meta charSet="utf 8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Contacts</title>
      </Head>
      <MyHeader />
      <main className={styles.main} >
        {children}
      </main>
      <footer>
        Подвал моего сайта
      </footer>
    </>
  )
}