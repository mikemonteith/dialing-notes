import Head from 'next/head'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid';
import styles from '@/styles/Home.module.css'

import Layout from '@/components/layout'

import Form, { FormValues } from '@/components/form';
import { PageProps } from '@/pages/_app'
import { TastingNote } from "@/data/index"
import Link from 'next/link';

interface HomeProps extends PageProps {}

const Home: React.FC<HomeProps> = (props) => {
  const onSubmit = (values: FormValues) => {
    if (!props.storage.currentBagId) {
      throw Error("No coffee bag currently in use")
    }
    const id = uuidv4()
    const tastingNote = new TastingNote({
      id,
      ...values,
      date: new Date().toISOString(),
      coffeeBagId: props.storage.currentBagId,
    }, props.storage.coffeeBags)

    props.onSetStorage({
      tastingNotes: {
        ...props.storage.tastingNotes,
        [id]: tastingNote,
      }
    })
  }

  const currentBag = props.storage.currentBagId ? props.storage.coffeeBags[props.storage.currentBagId] : undefined

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
            {currentBag && (
              <p>
                Using coffee bag: {currentBag.coffeeBeans.name}&nbsp;
                | (<Link href="/bags">Change</Link>)
              </p>
            )}
            <Form onSubmit={onSubmit} />
          </div>

          <div className='col-12'>
            <ul className='list-group'>
              {Object.entries(props.storage.tastingNotes).map(([id, item]) => (
                <li key={id} className='list-group-item'>
                  <>
                    {item.grind} / {item.weightIn} / {item.weightOut} / {item.notes} / {item.coffeeBag?.coffeeBeans?.name}
                  </>
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
