"use strict";
// // 1. 研究 object
// ;(() => {
//   const myName = 'Ocup'
//   let age = 18
//   let nothingLiterally = null
//   let isMarried = false
//   let nothing = undefined
//   // 一開始 x 被 assign 為 undefined
//   let x
//   console.log(x)
//   x = 1
//   console.log(x)
//   x = 'test'
//   console.log(x)
//   // 一開始 y 還沒被 assign，則不能 use y
//   // let z: string
//   let y: string
//   y = 'test'
//   console.log(y)
//   // 似乎無法之後再指定型別？
//   // 如何使得 xx:sting + arg: any  -->  output: string
//   const fn = (arg: any) => {
//     let output = arg
//     return output
//   }
//   let xx = '1'
//   let yy = fn(xx) as string
//   function fn1(inputOptions: { x: string } & any): string {
//     console.log(inputOptions.x)
//     let x = ''
//     return inputOptions.x
//   }
//   fn1({ x: 1 })
//   //
//   let obj3 = { hello: 'Another World' }
//   let obj4 = Object.assign(obj3, {
//     goodbye: 'Cruel World',
//   })
//   console.log(4444, obj4)
//   // |
//   let obj6: { x: string; z: string } | { y: string }
//   obj6 = { x: '1', z: '4' } // 1 { x: string; z: string }
//   obj6 = { y: '5' } // 2 { y: string }
//   obj6 = { x: '1', z: '2', y: '2' } // 3 { x: string; z: string } + { y: string }
//   obj6 = { y: '4', z: '5' } // 4 至少符合 { y: string }，且 z 屬於 { x: string; z: string }
//   obj6 = { y: '4', f: '5' } // 5 符合 { y: string }，但 f 不屬於 { x: string; z: string }
//   obj6 = { z: '5' } // 6 不符合這兩者之一：{ x: string; z: string } 、 { y: string }
//   // &：兩者皆須符合，等同於 let obj7: { x: string; y: string }
//   let obj7: { x: string } & { y: string }
//   obj7 = { x: '1', y: '2' }
//   obj7 = { x: '1' }
//   console.log(6666, obj6)
//   console.log(7777, obj7)
//   let info = {
//     isCool: undefined,
//   }
//   info = {
//     isCool: true, // type = undefined
//   }
//   // let info = {
//   //   obj: {
//   //     x: 1,
//   //     y: '1',
//   //   },
//   // }
//   // type: "object"
//   let obj8: object = { x: 1 }
//   obj8.x = 2
//   obj8 = {}
//   obj8 = []
//   obj8 = function () {}
//   obj8 = new Object()
//   obj8 = new Number()
//   obj8 = new String()
//   obj8 = '12'
//   obj8 = { x: 10 }
//   // 自定義 type: "OBJ9"
//   type OBJ9 = { x: number }
//   let obj9: OBJ9 = { x: 1 }
//   obj9.x = 2
//   obj9 = {}
//   obj9 = { x: 10 }
//   // Type Inference
//   let obj10 = { x: 1 }
//   obj10.x = 2
//   obj10 = {}
//   obj10 = { x: 10 }
//   let array1 = [1]
//   array1.pop = () => 1
//   array1.pop = () => {
//     return '12'
//   }
//   array1.pop = () => {}
//   let obj11 = { fn: () => 1 }
//   obj11.fn = () => 3
//   // type {} === type object
//   let y1: { b: number } = { a: 1, b: 1 }
//   y1.b = 5
//   let x1: {} = { a: 1, b: 1 } // 等同 let x1: object = { a: 1, b: 1 }
//   x1.a = 5
//   x1 = []
//   x1 = String()
//   x1 = new String()
// })()
// // 2. function: Implicit Any
// ;(() => {
//   // 1.
//   const fn1 = (param1, param2) => {
//     return param1 + param2
//   }
//   const str1: string = fn1(1, 1)
//   console.log(str1)
//   // 2.
//   const fn2 = (param1: number, param2: number) => {
//     return { n: param1 + param2, n5: 'f' }
//   }
//   const str2 = fn2(1, 1) as { n: number; n1: number; n2: number }
//   const str3: { n: number; n1: number; n2: number } = fn2(1, 1)
//   console.log(str2)
//   const fn3 = (x = 1) => {
//     return 1
//   }
//   fn3(2)
// })()
// // 3. 研究菜胖需求
// ;(() => {
//   // arg key1 --> any
//   // param key1 可以隨便的，不會檢查（如 obj2 那邊）
//   const fn20 = ({ key1, key2 }: { key1: number } | { key2: any }) => {
//     // const inkey1 = key1 as number | undefined
//     console.log(key1)
//     console.log(key2)
//     // console.log(pro)
//   }
//   const obj1 = fn20({ key1: 1 })
//   const obj2 = fn20({ key1: '', key2: 1 })
//   // param key1 會檢查 number 了
//   // param key2 不能通過
//   const fn21 = ({ key1, ...pro } = { key1: 1 } as { key1: number }) => {
//     console.log(key1)
//     console.log(pro)
//   }
//   const obj3 = fn21({ key1: 1, key2: '' })
//   const obj4 = fn21({ key1: '', key2: 1 })
//   console.log(obj1)
//   console.log(obj2)
//   //
//   // interface Todo {
//   //   title: string
//   //   description: string
//   // }
//   type S = string | undefined
//   function updateTodo({
//     title = 'GOOD' as string,
//     description = undefined as S,
//     ...pro
//   }) {
//     console.log(description)
//     console.log(title)
//     console.log(pro?.x)
//     return { title, ...pro }
//   }
//   const todo1 = updateTodo({
//     description: 'throw out trash',
//     x: 1,
//   })
//   const todo2 = updateTodo({
//     description: 'throw out trash',
//     title: 1,
//   })
// })()
// // 4. 3 種 Type Annotation 方式：
// ;(() => {
//   // 3 種 Type Annotation 方式：
//   const x1: { y: number } = { y: 1 }
//   const x2 = { y: 1 } as { y: number }
//   const x3 = <{ y: number }>{ y: 1 }
//   // 些微差異：第一種方式一定要完全符合
//   // 1. 不能有多餘的，如 z。
//   const x4: { y: number } = { y: 1, z: 2 }
//   const x5 = { y: 1, z: 2 } as { y: number }
//   const x6 = <{ y: number }>{ y: 1, z: 2 }
//   // 2. 一定要有 y。
//   const x7: { y: number } = {}
//   const x8 = {} as { y: number }
//   const x9 = <{ y: number }>{}
//   // 都不能：有多餘的（z）卻沒有該有的（y）
//   const x10: { y: number } = { z: 1 }
//   const x11 = { z: 1 } as { y: number }
//   const x12 = <{ y: number }>{ z: 1 }
// })()
// // 5. function type 檢查
// ;(() => {
//   // 0. 初始化變數 fn
//   //  let fn: (x: number) => string
//   let fn = (x: number) => String(x)
//   // 1. 變數的 type 改變
//   //  Type 'number' is not assignable to type '(x: number) => string'.
//   fn = 1
//   // 2. 變數一樣是 function 但 回傳 type 改變
//   //  Type '(x: number) => void' is not assignable to type '(x: number) => string'.
//   //    Type 'void' is not assignable to type 'string'.
//   fn = (x: number) => {}
//   // 3. 變數一樣是 function 但 參數 type 改變
//   //  Type '(x: string) => string' is not assignable to type '(x: number) => string'.
//   //    Types of parameters 'x' and 'x' are incompatible.
//   //      Type 'number' is not assignable to type 'string'.
//   fn = (x: string) => String(x)
//   // 4. 參數消失了，被 TS 忽略，不會報錯
//   fn = () => ''
//   // 5. 變數一樣是 function，參數、回傳的 type 都正確
//   fn = (x: number) => ''
// })()
// // 6. Function signature ＆ 其他
// ;(() => {
//   let strJson = '{"name":"周星馳","age":23}'
//   let strJsonObj: { name: number; age: string } = JSON.parse(strJson)
//   // Function signature: let fn: (number, string, number) => void
//   // vscode: let fn: (x: number, y: string, z: number) => void
//   let fn = (x: number, y: string, z: number) => {}
//   fn = (y: number, x: string, z: number) => {}
//   fn = (y: string, x: number, z: number) => {}
//   fn = (z: number, y: string, x: number) => {}
//   fn = (d: number, g: string, h: number) => {}
// })()
// // 7. array
// ;(() => {
//   // 全部都是數字
//   // let numbers: number[]
//   const numbers = [1, 2, 3, 4, 5]
//   numbers[9] = 0
//   numbers[9] = '1'
//   numbers.push(1)
//   numbers.push('1')
//   // 全部都是字串
//   // let strings: string[]
//   const strings = ['hi', 'how are you', 'goodbye']
//   strings[9] = 1234
//   strings.push(1234)
//   let numbers_strings = [1, '21', 123, 'asdf']
//   numbers_strings[9] = '1234'
//   numbers_strings[9] = { x: 1 }
//   const objects1 = [{ x: 1 }, { x: 2 }, { x: 3 }]
//   const objects2 = [{ x: 1 }, { x: '2' }, { x: 3 }]
//   const objects3 = [
//     { x: 1, y: 3 },
//     { x: 2, y: 2 },
//     { x: 3, y: '' },
//   ]
//   const arr = [[1], [2]]
//   // Type Inference 會將所有可能都各做一個 獨立的型別，而不會合在一起
//   // 例如此情況不會變成 (string | number | boolean | null | undefined)[][]
//   const mixArr = [
//     [1, 2, 3],
//     [1, '2'],
//     [null, false, 1],
//     [1, undefined],
//   ]
// })()
// // 8. Tuple
// ;(() => {
//   // Tuple vs Array:
//   // Type Inference  -->  Array: (number | boolean)[]
//   const array = [1, 2, 3, false]
//   // Tuple: [number, number, number, boolean]
//   const tuple: [number, number, number, boolean] = [1, 2, 3, false]
//   // Readonly
//   type Tuple1 = Readonly<[number, string]>
//   const employee1: Tuple1 = [1, 'Steve']
//   employee1[0] = 10
//   type Tuple2 = [number, string]
//   const employee: Tuple2 = [1, 'Steve']
//   employee[0] = 10
//   type X = Readonly<{ x: string; y: number }>
//   const test: X = { x: 's', y: 1 }
//   test.x = 'f'
//   // Readonly
//   type Tuple1 = [number, string]
//   const employee1: Tuple1 = [1, 'Steve']
//   employee1[0] = 10
//   type Tuple2 = Readonly<[number, string]>
//   const employee2: Tuple2 = [1, 'Steve']
//   employee2[0] = 10
// })()
// // 9. Enum
// ;(() => {
//   enum WeekDay {
//     Sun,
//     Mon,
//     Tue,
//     Wes,
//     Thu,
//     Fri,
//     Sat,
//   }
//   let day: string = WeekDay[0]
//   console.log(WeekDay[day])
//   day = 'lalala'
//   let n: WeekDay = WeekDay.Fri
//   console.log(WeekDay[n])
//   n = 9
//   //
//   enum ShapeKind {
//     Circle,
//     Square,
//   }
//   interface Circle {
//     kind: ShapeKind.Circle
//     radius: number
//   }
//   interface Square {
//     kind: ShapeKind.Square
//     sideLength: number
//   }
//   let c: Circle = {
//     kind: ShapeKind.Square,
//     radius: 100,
//   }
//   //
//   enum E {
//     Sun,
//     Mon,
//   }
//   const fn = (x: E) => {
//     if (x !== E.Sun) fn(E.Sun)
//     return
//   }
//   fn(E.Sun)
//   fn(E.Mon)
//   fn(E.La)
//   fn('s')
// })()
// // 10. Literal Types
// ;(() => {
//   // Object Literal Type
//   const obj: { x: number; y: string } = { x: 1, y: '' }
//   // Function Literal Type
//   const fn: (param: number) => number = (param) => param * 2
// })()
// // 11. Type Alias
// ;(() => {
//   // EX.
//   // Object Literal Type
//   type OBJ = { x: number; y: string }
//   const obj11: OBJ = { x: 1, y: '' }
//   const obj22: OBJ = { x: 1, y: '', z: 1 }
//   const obj33: OBJ = { x: 1 }
//   // Function Literal Type
//   type FN = (param: number) => number
//   const fn11: FN = (param) => param * 2
//   // ！！object type 的狀況討論：
//   type OBJ1 = { x: string; y: number }
//   type OBJ2 = { x: string; y: number; z: number }
//   const fn1 = ({ x, y }: OBJ1): OBJ1 => ({ x, y })
//   const fn2 = (param: OBJ1): OBJ1 => param
//   const fn3 = (param: { x: string; y: number }): { x: string; y: number } =>
//     param
//   // 1. 以 "明文" input，則必須 “完全符合” type: OBJ1
//   fn1({ x: 'x', y: 1, z: 1 })
//   // 2. 以 "變數" input，則只需 “包含” type: OBJ1
//   const obj1 = { x: 'x', y: 1, z: 1 }
//   fn1(obj1)
//   // 3. 即便以另一個 type: OBJ2 定義  "變數" input，依然只需 “包含” type: OBJ1
//   const obj2: OBJ2 = { x: 'x', y: 1, z: 1 }
//   fn1(obj2)
//   // 4. 即便 function 回傳 type: OBJ1，依然只需 “包含” type: OBJ1
//   const obj3: OBJ2 = { x: 'x', y: 1, z: 1 }
//   fn2(obj3)
//   // 5. 即便都用 “Literal Type”，但以 "變數" input，依然只需 “包含”
//   const obj4: { x: string; y: number; z: number } = { x: 'x', y: 1, z: 1 }
//   fn3(obj4)
//   // 5. 其他基本規則：
//   const obj5 = { x: 1, y: 1 }
//   const obj6 = { y: 1, z: 1 }
//   fn1(obj5)
//   fn1(obj6)
// })()
// // 12. Optional Property Annotation
// ;(() => {
//   type T1 = { x: number; y: string | undefined }
//   const obj1: T1 = { x: 1 }
//   const obj2: T1 = { x: 1, y: undefined }
//   type T2 = { x: number; y?: string }
//   const obj3: T2 = { x: 1 }
// })()
// // 13. Type Annotation, Type Inference
// ;(() => {
//   // A vs X
//   let U: unknown // U:unknown
//   let A: any // A:any
//   let X // X:any
//   A = X // A:any,       X:undefined
//   A = U // A:any,       U:unknown
//   U = A // U:unknown,   A:any
//   X = U // X:any,       U:unknown
//   A = X // A:any,       X:unknown
//   U = X // U:unknown,   X:unknown
//   X = U // X:any,       U:unknown
//   U = X // U:unknown,   X:any
//   X = U // X:any,       U:unknown
//   A = X // A:any,       X:unknown
//   let B = A // B:any,       A:any
//   X = A // X:any,       A:any
//   A = X // A:any,       X:any
//   // A1 vs X1
//   let A1: any // A1:any
//   let X1 // X1:any
//   let N: number = 1 // N:number
//   X1 = N // X1:any        N:number
//   A1 = N // A1:any        N:number
//   let A2 = A1 // A2:any        A1:any
//   let X2 = X1 // X2:number     X1:number
//   console.log(A2) // A2:any
//   console.log(X2) // X2:number
//   // any
//   let A11: any // A11:any
//   let X11 // X11:any
//   let N11: number = 5 // N11:number
//   let S11: string = '' // S11:string
//   A11 = true // A11:any
//   X11 = true // X11:any
//   N11 = A11 // N11:number   A11:any
//   N11 = X11 // N11:number   X11:boolean
//   S11 = A11 // S11:string   A11:any
//   S11 = X11 // S11:string   X11:boolean
//   console.log(N11) // N11:number
//   console.log(S11) // S11:string
// })()
// // 14. never
// ;(() => {
//   type T = number // 任意選一個 type
//   // any vs unknown
//   type T1 = T & any // any
//   type T2 = T & unknown // T
//   // any vs never
//   type T3 = any & never // never
//   type T4 = any | never //any
//   // unknown vs never
//   type T5 = T | never // T
//   type T6 = T & unknown // T
//   //
//   const fn1 = (): never => {
//     if (1 > 0) throw new Error('You are my ERROR!')
//   }
//   const fn2 = (): never => {
//     if (true) throw new Error('You are my ERROR!')
//   }
//   //
//   const fn = (): never => {
//     throw new Error('You are my ERROR!')
//   }
//   const x1: string = fn()
//   const x2: number = fn()
//   const x3: null = fn()
//   const x4: never = fn()
//   //
//   const fn3 = (): number => {
//     throw new Error('You are my ERROR!')
//   }
//   const fn4 = (): T | never => {
//     throw new Error('You are my ERROR!')
//   }
// })()
// // 15. function VS global ( T | never 等同 T ，在 Type Inference 的小差異) （原因未知）
// ;(() => {
//   type T = number // 任意選一個 type
//   let x1: T | never // x1:number
//   let x2: number | never // x2:number
//   const fn1 = (): T | never => 1 // fn1:() => number
//   const fn2 = (): number | never => 1 // fn2:() => number | never
// })()
// type T = number // 任意選一個 type
// let x1: T | never // x1:number
// let x2: number | never // x2:number
// const fn1 = (): T | never => 1 // fn1:() => T | never
// const fn2 = (): number | never => 1 // fn2:() => number | never
// // 16. unknown vs any
// ;(() => {
//   const NUMBER: number = 1
//   // any
//   const ANY: any = NUMBER
//   const a1: number = ANY
//   const b1: string = ANY
//   // unknown
//   const UNKNOWN: unknown = NUMBER
//   const a2: number = UNKNOWN // error
//   const b2: string = UNKNOWN // error
//   const a3: number = typeof UNKNOWN === 'number' ? UNKNOWN : 0
//   const b3: string = typeof UNKNOWN === 'string' ? UNKNOWN : ''
//   const b4: string = typeof UNKNOWN === 'number' ? UNKNOWN : '' // error
//   console.log(a1, a2, a3, b1, b2, b3, b4)
// })()
// // 17. unknown 用途：safeJsonParse
// ;(() => {
//   const safeJsonParse = (jsonString: string): unknown => {
//     return JSON.parse(jsonString)
//   }
//   const json1 = '{ "x": 1 }'
//   const json2 = '[1, 2]'
//   const x1: {} = JSON.parse(json1)
//   const y1: [] = JSON.parse(json2)
//   const x2: {} = safeJsonParse(json1)
//   const y2: [] = safeJsonParse(json2)
//   const a = safeJsonParse(json1)
//   const b = safeJsonParse(json2)
//   const x3: {} = typeof a === 'object' && a !== null ? a : {}
//   const y3: any[] = Array.isArray(b) ? b : []
//   const x4: {} = a instanceof Object ? a : {}
//   const y4: any[] = b instanceof Array ? b : []
//   const x5: {} = a in Object ? a : {}
//   const y5: any[] = b in Array ? b : []
// })()
// // 18.
// ;(() => {
//   // interface
//   interface Necklace {
//     kind: string
//     brand: string
//   }
//   interface bracelet {
//     brand: string
//     year: number
//   }
//   // type
//   type Accessory = Necklace | bracelet
//   // function
//   const isNecklace = (b: Accessory): b is Necklace => {
//     return (b as Necklace).kind !== undefined
//   }
//   // run
//   const Necklace: Accessory = { kind: 'Choker', brand: 'TASAKI' }
//   const bracelet: Accessory = { brand: 'Cartier', year: 2021 }
//   console.log(isNecklace(bracelet)) // false
//   console.log(isNecklace(Necklace)) // true
//   // 一般情形
//   enum X1 { a }
//   let sample11 = X1.a     // 0
//   let sample12 = X1[0]    // a
//   // 初始化為 string 後：
//   // (1)沒有 index 對照，ex.sample23。
//   // (2)無法使用 value 呼叫出 key，ex.sample24
//   enum X2 { a = 'a1' }
//   let sample21 = X2.a     // a1
//   let sample22 = X2['a']  // a1
//   let sample23 = X2[0]    //error
//   let sample24 = X2['a1'] // error
//   // 可以有些初始化為 string 有些為 number
//   enum X3 { a = 'a1', b = 0 }
//   let sample31 = X3.a     // a1
//   let sample32 = X3['a']  // a1
//   let sample33 = X3[0]    // b
//   let sample34 = X3['a1'] // error
//   // 有初始化為 string，則必須所有項目都進行 初始化
//   enum X4 { a = 'a1', b } // error
//   enum X5 { a = 1, b, c = 0, d, e, f, g }
//   let sample51 = X5.a     // 3
//   let sample52 = X5.b     // 4
//   let sample53 = X5.c     // 0
//   let sample54 = X5.d     // 1
//   let sample55 = X5.e     // 2
//   let sample56 = X5.f     // 3
//   let sample57 = X5.g     // 4
//   const fn = () => {}
//   console.log(
//     sample12,
//     sample11,
//     sample21,
//     sample22,
//     sample23,
//     sample24,
//     sample31,
//     sample32,
//     sample33,
//     sample34,X4,X5
//     fn
//   )
// })()
var X5;
(function (X5) {
    X5[X5["a"] = 1] = "a";
    X5[X5["b"] = 2] = "b";
    X5[X5["c"] = 0] = "c";
    X5[X5["d"] = 1] = "d";
    X5[X5["e"] = 2] = "e";
    X5[X5["f"] = 3] = "f";
    X5[X5["g"] = 4] = "g";
})(X5 || (X5 = {}));
let sample51 = X5.a; // 3
let sample52 = X5.b; // 4
let sample53 = X5.c; // 0
let sample54 = X5.d; // 1
let sample55 = X5.e; // 2
let sample56 = X5.f; // 3
let sample57 = X5.g; // 4
let sample58 = X5[3]; // 4
console.log(sample51, sample52, sample53, sample54, sample55, sample56, sample57, sample58);
