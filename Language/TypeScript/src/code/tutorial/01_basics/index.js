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
//   numbers[9] = '1'
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
//   // Tuple vs Array:
//   // Type Inference  -->  Array: (number | boolean)[]
//   const array = [1, 2, 3, false]
//   // Tuple: [number, number, number, boolean]
//   const tuple: [number, number, number, boolean] = [1, 2, 3, false]
//   // Enum
//   enum WeekDay {
//     Sun,
//     Mon,
//     Tue,
//     Wes,
//     Thu,
//     Fri,
//     Sat,
//   }
//   // WeekDay.Sat = WeekDay.Sat
//   let day = WeekDay[0]
//   day = 'WeekDay[0]'
//   let nthOfDay: WeekDay = WeekDay.Fri
//   nthOfDay = 12
//   // type Tuple = Readonly<[number, string]>
//   // let employee: Tuple = [1, 'Steve']
//   // employee[0] = 10
//   // employee = [10, 'Sam']
// })()
// Enum
var WeekDay;
(function (WeekDay) {
    WeekDay[WeekDay["Sun"] = 0] = "Sun";
    WeekDay[WeekDay["Mon"] = 1] = "Mon";
    WeekDay[WeekDay["Tue"] = 2] = "Tue";
    WeekDay[WeekDay["Wes"] = 3] = "Wes";
    WeekDay[WeekDay["Thu"] = 4] = "Thu";
    WeekDay[WeekDay["Fri"] = 5] = "Fri";
    WeekDay[WeekDay["Sat"] = 6] = "Sat";
})(WeekDay || (WeekDay = {}));
// WeekDay.Sat = WeekDay.Sat
let day = WeekDay[0];
console.log('day 1: ', day);
day = 'lalala';
console.log('day 2: ', day);
let n = WeekDay.Fri;
console.log('n 1:', n, WeekDay[n]);
n = 9;
console.log('n 2:', n, WeekDay[100]);
