import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import Layout from '@/components/layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Dialing notes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <button type="button" className="btn btn-primary">New</button>
      </Layout>
    </>
  )
}
