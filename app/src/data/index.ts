import { JsonObjectExpression } from 'typescript'

type JSON = object // TODO: validate that this JSON type can only contain valid JSON data
type ID = string

interface SerializableConstructor<JsonType extends JSON> {
  // The Serializable object must be constructed from raw JSON
  new (data: JsonType): Serializable<JsonType>
}

/**
 * An object which can be exported to JSON for storage
 */
interface Serializable<JsonType extends JSON> {
  id: ID

  // The Serializable object must be able to return it's own JSON
  toJSON(): JsonType
}

export type CoffeeBeansID = ID

export type CoffeeBeansJSON = {
  id: CoffeeBeansID
  name: string
}

export class CoffeeBeans implements Serializable<CoffeeBeansJSON> {
  id: CoffeeBeansID
  name: string

  constructor(data: CoffeeBeansJSON) {
    this.id = data.id
    this.name = data.name
  }

  toJSON(): CoffeeBeansJSON {
    return {
      id: this.id,
      name: this.name,
    }
  }
}

export type CoffeeBeansCollection = Record<CoffeeBeansID, CoffeeBeans>

export type CoffeeBagID = ID

export type CoffeeBagJSON = {
  id: CoffeeBagID
  coffeeBeansId: CoffeeBeansID
  roastDate: string
}

export class CoffeeBag implements Serializable<CoffeeBagJSON> {
  id: CoffeeBagID
  coffeeBeans: CoffeeBeans
  roastDate: Date

  constructor(data: CoffeeBagJSON, coffeeBeans: CoffeeBeansCollection) {
    this.id = data.id

    if (data.coffeeBeansId in coffeeBeans) {
      this.coffeeBeans = coffeeBeans[data.coffeeBeansId]
    } else {
      throw Error(
        `coffee beans with id "${data.coffeeBeansId}" not found in collection`
      )
    }
    this.roastDate = new Date(data.roastDate)
  }

  toJSON(): CoffeeBagJSON {
    return {
      id: this.id,
      coffeeBeansId: this.coffeeBeans.id,
      roastDate: this.roastDate.toISOString(),
    }
  }
}

export type CoffeeBagCollection = Record<CoffeeBagID, CoffeeBag>

export type TastingNoteID = ID

export type TastingNoteJSON = {
  id: TastingNoteID
  coffeeBagId: ID
  date: string
  grind: string
  weightIn: number
  weightOut: number
  notes: string
}

export class TastingNote implements Serializable<TastingNoteJSON> {
  id: TastingNoteID
  coffeeBag: CoffeeBag
  date: Date
  grind: string
  weightIn: number
  weightOut: number
  notes: string

  constructor(data: TastingNoteJSON, bags: CoffeeBagCollection) {
    this.id = data.id
    if (data.coffeeBagId in bags) {
      this.coffeeBag = bags[data.coffeeBagId]
    } else {
      throw Error(
        `coffee bag with id "${data.coffeeBagId}" not found in collection`
      )
    }
    this.date = new Date(data.date)
    this.grind = data.grind
    this.weightIn = data.weightIn
    this.weightOut = data.weightOut
    this.notes = data.notes
  }

  toJSON(): TastingNoteJSON {
    return {
      id: this.id,
      coffeeBagId: this.coffeeBag.id,
      date: this.date.toISOString(),
      grind: this.grind,
      weightIn: this.weightIn,
      weightOut: this.weightOut,
      notes: this.notes,
    }
  }
}

export type TastingNoteCollection = Record<TastingNoteID, TastingNote>
