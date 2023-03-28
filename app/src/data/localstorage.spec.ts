import { deserialize, serialize } from './localstorage'

import { CoffeeBag, CoffeeBeans, TastingNote } from './index'
jest.mock('./index')

const MockedCoffeeBeans = jest.mocked(CoffeeBeans)
const MockedCoffeeBag = jest.mocked(CoffeeBag)

describe('deserialize', () => {
  test('turns empty JSON into storage data', () => {
    const appdata = deserialize('{}')
    expect(appdata).toStrictEqual({
      tastingNotes: {},
      coffeeBags: {},
      coffeeBeans: {},
      currentBagId: undefined,
    })
  })

  test('turns JSON into storage data', () => {
    const appdata = deserialize(`{
      "tastingNotes": {
        "one": "MOCK"
      },
      "coffeeBags": {
        "two": "MOCK"
      },
      "coffeeBeans": {
        "three": "MOCK"
      },
      "currentBagId": "two"
    }`)

    expect(appdata.coffeeBeans.three).toBeInstanceOf(CoffeeBeans)
    expect(CoffeeBeans).toHaveBeenCalledWith('MOCK')

    expect(appdata.coffeeBags.two).toBeInstanceOf(CoffeeBag)
    expect(CoffeeBag).toHaveBeenCalledWith('MOCK', {
      three: expect.objectContaining({}),
    })

    expect(appdata.tastingNotes.one).toBeInstanceOf(TastingNote)
    expect(TastingNote).toHaveBeenCalledWith('MOCK', {
      two: expect.objectContaining({}),
    })

    expect(appdata.currentBagId).toBe('two')
  })
})

describe('serialize', () => {
  test('turns empty storage data into JSON', () => {
    const json = serialize({
      tastingNotes: {},
      coffeeBeans: {},
      coffeeBags: {},
      currentBagId: undefined,
    })
    expect(json).toStrictEqual(
      JSON.stringify({
        tastingNotes: {},
        coffeeBags: {},
        coffeeBeans: {},
      })
    )
  })
})
