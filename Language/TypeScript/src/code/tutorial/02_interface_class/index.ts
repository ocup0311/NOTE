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
