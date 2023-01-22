import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import Layout from '@/components/layout'

import Form, { FormValues } from '@/components/form';
import { PageProps, TastingNote } from '@/pages/_app'

interface HomeProps extends PageProps {}

const Home: React.FC<HomeProps> = (props) => {
  const onSubmit = (values: FormValues) => {
    const tastingNote: TastingNote = {
      ...values,
      date: new Date(),
    }

    const records = [
      tastingNote,
      ...props.storage.records || [],
    ]
    props.onSetStorage({ records })
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Dialing notes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className='row'>
          <div className='col-lg-4 py-4'>
            <Form onSubmit={onSubmit} />
          </div>

          <div className='col-12'>
            <ul className='list-group'>
              {props.storage.records?.map((item, i) => (
                <li key={i} className='list-group-item'>
                  {item.grind} / {item.weightIn} / {item.weightOut} / {item.notes}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home
