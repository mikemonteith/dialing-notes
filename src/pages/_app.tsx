import { useEffect, useState } from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import 'bootstrap/dist/css/bootstrap.css'
import { createInitialStorageData, get as getStorage, set as setStorage, StorageData } from '@/data/localstorage'

/**
 * Props which are passed to all nextjs pages
 */
export interface PageProps {
  storage: StorageData
  onSetStorage: (data: Partial<StorageData>) => void
}

export default function App({ Component, pageProps }: AppProps) {

  const [storageState, setStorageState] = useState<StorageData>(createInitialStorageData())

  // Fetch data out of storage
  useEffect(function() {
    const data = getStorage()
    setStorageState(data)
  },[]);

  // Set data into storage
  const onSetStorage = (data: StorageData) => {
    const newStorageData: StorageData = {
      ...storageState,
      ...data,
    }
    setStorage(newStorageData)
    setStorageState(newStorageData)
  }

  return <Component {...pageProps} storage={storageState} onSetStorage={onSetStorage} />
}
