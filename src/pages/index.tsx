import type { NextPage } from "next"
import Head from "next/head"
// import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Reddit</title>
        <meta
          name='description'
          content='Reddit Clone using Nextjs Chakra-Ui Firebase Typescript'
        />
        <link rel='icon' href='/images/redditFace.svg' />
      </Head>
      Main Content
    </div>
  )
}

export default Home
