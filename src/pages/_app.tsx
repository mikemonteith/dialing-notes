import { useEffect, useState } from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import type { FormValues } from '@/components/form'

import 'bootstrap/dist/css/bootstrap.css'

const TASTING_NOTES_STORAGE_KEY = "tasting_notes"

/**
 * Props which are passed to all nextjs pages
 */
export interface PageProps {
  storage: StorageData
  onSetStorage: (data: StorageData) => void
}

/**
 * Represents a coffee brew and tasting that has happened
 */
export interface TastingNote extends FormValues {
  date: Date
}

/**
 * Data saved in browser local storage
 */
export type StorageData = {
  records?: Array<TastingNote>
}

export default function App({ Component, pageProps }: AppProps) {

  const [storageState, setStorageState] = useState<StorageData>({})

  // Fetch data out of storage
  useEffect(function() {
    let data = {}
    const item = window.localStorage.getItem(TASTING_NOTES_STORAGE_KEY)
    if (item) {
      data = JSON.parse(item)
    }

    setStorageState(data)
  },[]);

  // Set data into storage
  //const onSetStorage = (key: string, data: any) => {
  const onSetStorage = (data: StorageData) => {
    const newStorageData: StorageData = {
      ...storageState,
      ...data,
    }
    window.localStorage.setItem(TASTING_NOTES_STORAGE_KEY, JSON.stringify(newStorageData))
    setStorageState(newStorageData)
  }

  return <Component {...pageProps} storage={storageState} onSetStorage={onSetStorage} />
}
