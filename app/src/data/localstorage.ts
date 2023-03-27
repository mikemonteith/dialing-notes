import {
  TastingNote,
  TastingNoteJSON,
  TastingNoteID,
  TastingNoteCollection,
  CoffeeBag,
  CoffeeBagJSON,
  CoffeeBagID,
  CoffeeBagCollection,
  CoffeeBeans,
  CoffeeBeansJSON,
  CoffeeBeansID,
  CoffeeBeansCollection,
} from './index'

const TASTING_NOTES_STORAGE_KEY = 'tasting_notes'

/**
 * Data saved in browser local storage
 */
export type StorageDataJSON = {
  tastingNotes?: Record<TastingNoteID, TastingNoteJSON>
  coffeeBeans?: Record<CoffeeBeansID, CoffeeBeansJSON>
  coffeeBags?: Record<CoffeeBagID, CoffeeBagJSON>
  currentBagId?: CoffeeBagID
}

export type StorageData = {
  tastingNotes: TastingNoteCollection
  coffeeBeans: CoffeeBeansCollection
  coffeeBags: CoffeeBagCollection
  currentBagId?: CoffeeBagID
}

export const createInitialStorageData = (): StorageData => ({
  tastingNotes: {},
  coffeeBeans: {},
  coffeeBags: {},
})

/**
 * Convert data string (JSON) into objects for use across the application.
 */
export const deserialize = (stringData: string): StorageData => {
  const json = JSON.parse(stringData)

  const coffeeBeans: CoffeeBeansCollection = {}
  if (json.coffeeBeans) {
    for (const id in json.coffeeBeans) {
      coffeeBeans[id] = new CoffeeBeans(json.coffeeBeans[id])
    }
  }

  const coffeeBags: CoffeeBagCollection = {}
  if (json.coffeeBags) {
    for (const id in json.coffeeBags) {
      coffeeBags[id] = new CoffeeBag(json.coffeeBags[id], coffeeBeans)
    }
  }

  const tastingNotes: TastingNoteCollection = {}
  if (json.tastingNotes) {
    for (const id in json.tastingNotes) {
      tastingNotes[id] = new TastingNote(json.tastingNotes[id], coffeeBags)
    }
  }

  let currentBagId = undefined
  if (json.currentBagId && json.currentBagId in coffeeBags) {
    currentBagId = json.currentBagId
  }

  return {
    coffeeBeans,
    coffeeBags,
    tastingNotes,
    currentBagId,
  }
}

/**
 * Convert application objects into a JSON string for storage
 */
export const serialize = (data: StorageData): string => {
  const json: StorageDataJSON = {}

  if (data.tastingNotes) {
    json.tastingNotes = {}
    for (const id in data.tastingNotes) {
      json.tastingNotes[id] = data.tastingNotes[id].toJSON()
    }
  }

  if (data.coffeeBags) {
    json.coffeeBags = {}
    for (const id in data.coffeeBags) {
      json.coffeeBags[id] = data.coffeeBags[id].toJSON()
    }
  }

  if (data.coffeeBeans) {
    json.coffeeBeans = {}
    for (const id in data.coffeeBeans) {
      json.coffeeBeans[id] = data.coffeeBeans[id].toJSON()
    }
  }

  if (data.currentBagId) {
    json.currentBagId = data.currentBagId
  }

  return JSON.stringify(json)
}

/**
 * Take data from local storage and convert it into proper
 * objects for use across the application.
 */
export const get = (): StorageData => {
  const item = window.localStorage.getItem(TASTING_NOTES_STORAGE_KEY)
  if (item) {
    return deserialize(item)
  } else {
    return createInitialStorageData()
  }
}

/**
 * Update local storage with a new app state.
 */
export const set = (newStorageData: StorageData): void => {
  const stringData = serialize(newStorageData)
  window.localStorage.setItem(TASTING_NOTES_STORAGE_KEY, stringData)
}
