import _ from 'lodash'

// 1. 兩種 interface：Object & Function
// (此部分 interface 與 type 似無差異)
;(() => {
  //
  enum WeekEnum {
    Sun,
    Mon,
    Tue,
  }
  type WeekType = 'Sun' | 'Mon' | 'Tue'

  type WeekFormat = WeekEnum | WeekType
  let a: WeekEnum = WeekEnum.Sun
  let c: WeekFormat = WeekEnum[0]

  // function interface
  interface FN1 {
    (p1: number): void
  }

  const fn1: FN1 = (p) => {}
  fn1(1)
  fn1('')
  fn1(null)

  const fn2: FN1 = () => {}
  fn2()
  fn2(1)
  fn2('')

  const fn3: FN1 = (p1, p2) => {}
  fn3(1)
  fn3(1, 2)
  fn3('')

  // object interface
  interface OBJ1 {
    x: number
    y: (p1: string) => void
    z: string
  }

  const obj1: OBJ1 = { x: 1, y: (p1) => {} }
  const obj2: OBJ1 = { x: 1, y: () => {} }
  const obj3: OBJ1 = { x: 1, y: (p1, p2) => {} }
  const obj4: OBJ1 = { x: '', y: (p1) => {} }
  const obj5: OBJ1 = { x: 1 }
  const obj6: OBJ1 = { x: 1, y: (p1) => {}, z: 1 }

  // function & object interface
  interface FN2 {
    (p1: OBJ1): void
  }

  const fn11: FN2 = (p) => {}

  fn11({ x: 1, y: (p1: string): void => {} })
  fn11({ x: 1, y: (p1) => {} })
  fn11({ x: 1, y: (p1) => {}, z: 1 })
  fn11({ x: 1, y: () => {} })

  const obj11 = { x: 1, y: (p1: string): void => {}, z: 1 }
  const obj12 = { x: 1, y: (p1: any) => {}, z: 1 }
  const obj13 = { x: 1, y: () => {} }
  fn11(obj11)
  fn11(obj12)
  fn11(obj13)
})()

// 2. interface extend
;(() => {
  // interface
  interface X1 {
    a: number
    b: string
  }

  interface Y1 {
    c?: number
    d?: string
  }

  interface Z1 extends X1, Y1 {
    e?: [null]
  }

  const test1: Z1 = { a: 1, b: '' }
  const test2: Z1 = { a: 1, b: '', c: 1, e: [null] }
  const test3: Z1 = { a: 1, b: '', c: '' }
  const test4: Z1 = { a: 1, b: '', e: 1 }
  const test5: Z1 = {}

  // type
  type X2 = { a: number; b: string }
  type Y2 = { c?: number; d?: string }
  type Z2 = X2 & Y2

  const test6: Z2 = {
    a: 1,
    b: '',
  }
})()

// 3. extends 的子項目，不能有衝突
;(() => {
  // interface
  interface I1 {
    a: number
    b: string
  }

  interface I2 {
    a: number
  }

  interface I3 {
    a?: number
  }

  interface I4 {
    a: string
  }

  interface NI1 extends I1, I2 {}
  interface NI2 extends I1, I3 {}
  interface NI3 extends I1, I4 {}

  // type
  type T1 = {
    a: number
    b: string
  }

  type T2 = {
    a: string
  }

  type T3 = T1 & T2

  const x: T3 = { b: '1', a: getNever() }

  function getNever(): never {
    throw Error()
  }
})()

// 4. Function Overload
;(() => {
  // 1.function
  interface ADD1 {
    (p1: number, p2: number): number
    (p1: string, p2: string): number
  }

  // a. arrow function
  const add1: ADD1 = (p1: number | string, p2: number | string): number => {
    if (_.isNumber(p1) && _.isNumber(p2)) return p1 + p2
    if (_.isString(p1) && _.isString(p2)) return parseInt(p1) + parseInt(p2)

    throw Error('Params Needed: both number | both string.')
  }

  add1(1, 2)
  add1('1', '2')
  add1(1, '2')

  // b. regular function
  const add2: ADD1 = function (
    p1: number | string,
    p2: number | string
  ): number {
    if (_.isNumber(p1) && _.isNumber(p2)) return p1 + p2
    if (_.isString(p1) && _.isString(p2)) return parseInt(p1) + parseInt(p2)

    throw Error('Params Needed: both number | both string.')
  }

  add2(1, 2)

  // 2.object.fn
  interface ADD2 {
    add(p1: number, p2: number): number
    add(p1: string, p2: string): number
  }

  const add3: ADD2 = {
    add(p1: number | string, p2: number | string): number {
      if (_.isNumber(p1) && _.isNumber(p2)) return p1 + p2
      if (_.isString(p1) && _.isString(p2)) return parseInt(p1) + parseInt(p2)

      throw Error('Params Needed: both number | both string.')
    },
  }

  add3.add(1, 2)
})()

// 00. 給朋友舉例
;(() => {
  // 1. enum 設定檔
  enum SIZE {
    L = 'L',
    M = 'M',
    S = 'S',
  }

  type Settings = {
    size: SIZE
  }

  const doSomething = (name: string, age: number, settings: Settings) => {}

  const mySettings = { size: SIZE.M }
  doSomething('Ocup', 18, mySettings)
})()
