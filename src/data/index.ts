import { FormValues } from "@/components/form"

export interface CoffeeBeans {
  id: string
  name: string
}

export type CoffeeBeansCollection = {
  [key: CoffeeBeans['id']]: CoffeeBeans
}

export interface CoffeeBag {
  id: string
  coffeeBeansId: CoffeeBeans['id']
  roastDate: Date
}

export type CoffeeBagCollection = {
  [key: CoffeeBag['id']]: CoffeeBag
}

/**
 * Represents a coffee brew and tasting that has happened
 */
export interface TastingNote extends FormValues {
  coffeeBagId: CoffeeBag['id'],
  date: Date
}
