import Layout from "@/components/layout";
import { v4 as uuidv4 } from 'uuid';
import Head from "next/head";
import { ChangeEvent, FormEvent, useState } from "react";
import { PageProps } from "./_app";
import { CoffeeBeans, CoffeeBag } from "@/data/index"


interface BagProps extends PageProps {}

const Bag: React.FC<BagProps> = (props) => {
  const beans = props.storage.coffeeBeans || {}
  const [beansName, setBeansName] = useState<string>("")
  const onSubmitBeans = (e: FormEvent) => {
    e.preventDefault()
    props.onSetStorage({
      coffeeBeans: {
        ...beans,
        [beansName]: new CoffeeBeans({
           id: beansName,
           name: beansName,
        }),
      }
    })
    setBeansName("")
  }

  const bags = props.storage.coffeeBags || {}
  const [beansId, setBeansId] = useState<string>("")
  const [roastDate, setRoastDate] = useState<string>("")

  const onSubmitBag = (e: FormEvent) => {
    e.preventDefault()

    if (!roastDate) {
      throw Error("roast date must be defined")
    }
    if (!beansId) {
      throw Error("Beans must be selected")
    }

    const bagId = uuidv4();
    const newbag = new CoffeeBag({
      id: bagId,
      coffeeBeansId: beansId,
      roastDate: roastDate,
    }, props.storage.coffeeBeans)

    props.onSetStorage({
      coffeeBags: {
        ...props.storage.coffeeBags,
        [bagId]: newbag,
      },
      // When we add a new bag, make it the current bag by default
      currentBagId: bagId,
    })

    setBeansId("")
    setRoastDate("")
  }

  const onClickBag = (bagId: string) => {
    props.onSetStorage({
      currentBagId: bagId,
    })
  }

  return (
    <>
      <Head>
      </Head>
      <Layout>
        <div className='row'>
          <div className='col-lg-6'>
            <form onSubmit={onSubmitBeans}>
              <div className='form-floating'>
                <input
                  value={beansName}
                  onChange={(e: ChangeEvent<HTMLInputElement>): void => setBeansName(e.target.value)}
                  type='text'
                  className='form-control'
                  id='beansNameInput'
                  placeholder=''
                />
                <label htmlFor='beansNameInput' className='form-label'>Beans name</label>
              </div>
              <button className="btn btn-primary" type='submit'>Save beans</button>
            </form>
            <ul>
              {Object.keys(beans).map((key, i) => (
                <li key={i}>{beans[key].name}</li>
              ))}
            </ul>
          </div>
          <div className='col-lg-6'>
            <form onSubmit={onSubmitBag}>
              <select
                value={beansId}
                onChange={(e: ChangeEvent<HTMLSelectElement>): void => setBeansId(e.target.value)}
                id='beansIdInput'
                className='form-select'
                required
              >
                <option value="">Select a bean</option>
                {Object.keys(beans).map((beansId, i) => (
                  <option key={i} value={beansId}>{beans[beansId].name}</option>
                ))}
              </select>
              <label htmlFor='beansIdInput' className='form-label'>Bag name</label>
              <div className='form-floating'>
                <input
                    value={roastDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setRoastDate(e.target.value)}
                    type='date'
                    className='form-control'
                    id='roastDateInput'
                    placeholder=''
                    max={new Date().toJSON().substring(0, 10)}
                  />
                  <label htmlFor='roastDateInput' className='form-label'>Roast date</label>
              </div>
              <button className='btn btn-primary' type='submit'>Save</button>
            </form>
          </div>
          <div className='col-12'>
            <ul className='list-group'>
              {Object.keys(bags).map((bagId, i) => (
                <li onClick={() => onClickBag(bagId)} key={i}>
                  <>
                    {bags[bagId].coffeeBeans.name} @ {bags[bagId].roastDate.toDateString()}
                    {bagId == props.storage.currentBagId ? <span className='px-2'>*</span> : ''}
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

export default Bag
