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

  // 應用
  interface A {
    a?: Number
  }
  interface B {
    b?: number
  }
  interface C {
    c?: string
  }

  interface ABC extends A, B, C {}
  interface FN {
    get(tag: 'a'): A
    get(tag: 'b'): B
    get(tag: 'c'): C
  }
  const abc: ABC = { a: 1 }

  const fn: FN = {
    get: (tag: 'a' | 'b' | 'c'): ABC => {
      if (tag === 'a') return { a: 1 }
      if (tag === 'b') return { b: 1 }
      if (tag === 'c') return { c: '1' }
      throw Error('')
    },
  }
})()

// 5. Interface Merging
;(() => {
  type Box = {
    height: number
    width: number
  }
  interface Box {
    scale: number
  }
  const box1: Box = { height: 5, width: 6, scale: 10 }
  const box2: Box = { height: 5, width: 6 }

  for (let i = 0; i < 1; i++) {
    interface Box {
      scale: number
      height: string
    }
    const box3: Box = { height: '', scale: 1, width: 6 }
  }

  // namespace 也可以 Declaration Merging，但必須在最外層定義
  namespace Animals {
    export class Zebra {}
  }
  namespace Animals {
    export interface Legged {
      numberOfLegs: number
    }
    export class Dog {}
  }
})()

// 6. Index Signatures (舊：Indexable Types)
;(() => {
  // interface
  interface StringArray1 {
    [index: number]: string
  }

  const arr1: StringArray1 = ['a', 'b']
  const item1 = arr1[0]

  const obj1: StringArray1 = {}
  const obj3: StringArray1 = { 0: 'a' }

  // type
  type StringArray2 = string[]
  const arr2: StringArray2 = ['a', 'b']
  const item2 = arr2[0]

  const obj2: StringArray2 = {}
  const obj4: StringArray2 = { 0: 'a' }

  console.log(item1, item2, obj1, obj2, obj3, obj4)

  // Dictionary
  interface NumberOrStringDictionary {
    [index: string]: number | string
    length: number
    name: string
  }

  const X: NumberOrStringDictionary = {
    name: '兩個 keys 為必須: name, length',
    length: 123,
    x: 1,
  }

  X
})()

// 7. readonly
;(() => {
  type T = {
    readonly x: number
    readonly y: string
    readonly o1: { a: number }
    z: number
    u: string
    o2: { a: number }
  }

  const obj: T = {
    x: 1,
    y: 'y',
    o1: { a: 1 },
    z: 2,
    u: 'u',
    o2: { a: 9 },
  }
  obj.x = 2
  obj.y = 'x'
  obj.o1 = { a: 2 }
  obj.o1.a = 2
  obj.z = 1
  obj.u = 'z'
  obj.o2 = { a: 8 }
  obj.o2.a = 7
})()

// 8. Hybrid Types Interface (看起來就是 js class 的前身)
;(() => {
  interface Counter {
    (start: number): string

    interval: number
    reset(): void
  }

  function getCounter(): Counter {
    const counter = function (start: number) {} as Counter

    counter.interval = 123
    counter.reset = () => {}

    return counter
  }

  const c = getCounter()
  c(10)
  c.reset()
  c.interval = 5

  const a = { x: 1 } as { x: number; y: string }
})()

// 8. Type Assertions (as & <>)
;(() => {
  const obj1 = { x: 1, y: '', z: 1 } as { x: number; y: string }
  const obj2 = { x: 1 } as { x: number; y: string }
  const obj3 = { x: '' } as { x: number; y: string }

  const x = 1 as any as string as number
  const y = 1 as any as string as never as number as any as string

  let a = 1 as any as { x: string } as { x: string; y: number }
  let b = 1 as any as { x: string; y: number } as { x: string }
  a = { x: '' }
  a = { x: '', y: 1 }
  b = { x: '' }
  b = { x: '', y: 1 }
})()

// 9.
;(() => {
  //
  interface X {
    [index: number]: string | number
    0: string
    1: number
  }

  const x1: X = ['', 1]
  const x2: X = ['', 1, 1]

  type Y = [string, number]
  const y1: Y = ['', 1]
  const y2: Y = ['', 1, 1]

  interface Z extends Y {}

  const z1: Z = ['', 1]
  const z2: Z = ['', 1, 1]

  // Mapped object types
  type Fruit = 'apple' | 'orange' | 'banana'

  type FruitCount = {
    [key in Fruit]: number
  }
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
