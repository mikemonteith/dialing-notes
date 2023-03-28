import {
  CoffeeBag,
  CoffeeBagCollection,
  CoffeeBagID,
  CoffeeBagJSON,
  CoffeeBeans,
  CoffeeBeansCollection,
  CoffeeBeansID,
  CoffeeBeansJSON,
  TastingNote,
  TastingNoteCollection,
} from './index'

const beans: CoffeeBeansCollection = {
  beansid: new CoffeeBeans({
    id: 'beansid',
    name: 'Brazil Fazenda',
  }),
}

const bags: CoffeeBagCollection = {
  bagid: new CoffeeBag(
    {
      id: 'bagid',
      coffeeBeansId: 'beansid',
      roastDate: '2023-01-01T00:00:00.000Z',
    },
    beans
  ),
}

const notes: TastingNoteCollection = {
  noteid: new TastingNote(
    {
      id: 'noteid',
      coffeeBagId: 'bagid',
      date: '2023-01-01T00:00:00.000Z',
      grind: '9',
      weightIn: 18,
      weightOut: 36,
      notes: 'Perfect',
    },
    bags
  ),
}

describe('CoffeeBeans', () => {
  test('can be constructed with json', () => {
    const beans = new CoffeeBeans({
      id: 'fakeid',
      name: 'Brazil Fazenda',
    })
    expect(beans.id).toBe('fakeid')
    expect(beans.name).toBe('Brazil Fazenda')
  })

  test('can be destructured to JSON', () => {
    const json = beans['beansid'].toJSON()
    expect(json).toStrictEqual({
      id: 'beansid',
      name: 'Brazil Fazenda',
    })
  })
})

describe('CoffeeBags', () => {
  test('can be constructed with json', () => {
    const bag = new CoffeeBag(
      {
        id: 'bagid',
        coffeeBeansId: 'beansid',
        roastDate: '2023-01-01T00:00:00.000Z',
      },
      beans
    )
    expect(bag.id).toBe('bagid')
    expect(bag.roastDate).toStrictEqual(new Date('2023-01-01T00:00:00.000Z'))
    expect(bag.coffeeBeans).toBeInstanceOf(CoffeeBeans)
    expect(bag.coffeeBeans.id).toBe('beansid')
    expect(bag.coffeeBeans.name).toBe('Brazil Fazenda')
  })

  test('throws exception if beans.id is not found', () => {
    expect(
      () =>
        new CoffeeBag(
          {
            id: 'bagid',
            coffeeBeansId: 'xxx',
            roastDate: '2023-01-01T00:00:00.000Z',
          },
          beans
        )
    ).toThrowErrorMatchingInlineSnapshot(
      `"coffee beans with id "xxx" not found in collection"`
    )
  })

  describe('methods', () => {
    test('can be destructured to JSON', () => {
      const json = bags['bagid'].toJSON()
      expect(json).toMatchObject({
        id: 'bagid',
        coffeeBeansId: 'beansid',
        roastDate: '2023-01-01T00:00:00.000Z',
      })
    })
  })
})

describe('TastingNote', () => {
  test('can be constructed with json', () => {
    const note = new TastingNote(
      {
        id: 'noteid',
        coffeeBagId: 'bagid',
        date: '2023-01-01T00:00:00.000Z',
        grind: '9',
        weightIn: 18,
        weightOut: 36,
        notes: 'Perfect',
      },
      bags
    )
    expect(note.coffeeBag).toBeInstanceOf(CoffeeBag)
    expect(note.coffeeBag.id).toStrictEqual('bagid')
    expect(note.date).toStrictEqual(new Date('2023-01-01T00:00:00.000Z'))
  })

  test('throws exception if bag.id is not found', () => {
    expect(
      () =>
        new TastingNote(
          {
            id: 'noteid',
            coffeeBagId: 'xxx',
            date: '2023-01-01T00:00:00.000Z',
            grind: '9',
            weightIn: 18,
            weightOut: 36,
            notes: 'Perfect',
          },
          bags
        )
    ).toThrowErrorMatchingInlineSnapshot(
      `"coffee bag with id "xxx" not found in collection"`
    )
  })

  test('can be destructured to JSON', () => {
    const json = notes['noteid'].toJSON()
    expect(json).toStrictEqual({
      id: 'noteid',
      coffeeBagId: 'bagid',
      date: '2023-01-01T00:00:00.000Z',
      grind: '9',
      weightIn: 18,
      weightOut: 36,
      notes: 'Perfect',
    })
  })
})
