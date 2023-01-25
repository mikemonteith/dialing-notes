import { TastingNote, CoffeeBeansCollection, CoffeeBagCollection, CoffeeBag } from './index'

const TASTING_NOTES_STORAGE_KEY = "tasting_notes"


/**
 * Data saved in browser local storage
 */
export type StorageData = {
  records?: Array<TastingNote>
  coffeeBeans?: CoffeeBeansCollection
  coffeeBags?: CoffeeBagCollection
  currentBagId?: CoffeeBag['id']
}

/**
 * Convert data string (JSON) into objects for use across the application
 */
const deserialize = (stringData: string) : StorageData => {
  const json = JSON.parse(stringData)
  const data : StorageData = json

  // Dates need to be converted from strings into real dates
  if (data.records) {
    for (const index in data.records) {
      data.records[index].date = new Date(data.records[index].date)
    }
  }
  if (data.coffeeBags) {
    for (const index in data.coffeeBags) {
      data.coffeeBags[index].roastDate = new Date(data.coffeeBags[index].roastDate)
    }
  }

  return data
}

/**
 * Convert application objects into a JSON string for storage
 */
const serialize = (data: StorageData): string => {
  return JSON.stringify(data)
}
  
/**
 * Take data from local storage and convert it into proper
 * objects for use across the application.
 */
export const get = () : StorageData =>  {
  let data: StorageData = {}
  const item = window.localStorage.getItem(TASTING_NOTES_STORAGE_KEY)
  if (item) {
    data = deserialize(item)
  }
  return data
}

/**
 * Update local storage with a new app state.
 */
export const set = (newStorageData: StorageData): void => {
  const stringData = serialize(newStorageData)
  window.localStorage.setItem(TASTING_NOTES_STORAGE_KEY, stringData)
}