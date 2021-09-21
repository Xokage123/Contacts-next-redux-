import Head from "next/head"
import Script from "next/script"
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
      <Script
        id="r_modal"
        strategy="beforeInteractive"
        src="https://cdnjs.cloudflare.com/ajax/libs/react-modal/3.14.3/react-modal.min.js"
        integrity="sha512-MY2jfK3DBnVzdS2V8MXo5lRtr0mNRroUI9hoLVv2/yL3vrJTam3VzASuKQ96fLEpyYIT4a8o7YgtUs5lPjiLVQ=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      ></Script>
      <main className={styles.main} >
        {children}
      </main>
    </>
  )
}