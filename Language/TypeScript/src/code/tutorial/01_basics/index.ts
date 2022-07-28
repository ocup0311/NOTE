const myName = 'Ocup'
let age = 18
let nothingLiterally = null
let isMarried = false
let nothing = undefined

// 一開始 x 被 assign 為 undefined
let x
console.log(x)
x = 1
console.log(x)
x = 'test'
console.log(x)

// 一開始 y 還沒被 assign，則不能 use y
// let z: string
let y: string
y = 'test'
console.log(y)

// 似乎無法之後再指定型別？
// 如何使得 xx:sting + arg: any  -->  output: string
const fn = (arg: any) => {
  let output = arg

  return output
}

let xx = '1'
let yy = fn(xx) as string

function fn1(inputOptions: { x: string } & any): string {
  console.log(inputOptions.x)
  let x = ''
  return inputOptions.x
}

fn1({ x: 1 })

//
let obj3 = { hello: 'Another World' }
let obj4 = Object.assign(obj3, {
  goodbye: 'Cruel World',
})

console.log(4444, obj4)

// |
let obj6: { x: string; z: string } | { y: string }
obj6 = { x: '1', z: '4' } // 1 { x: string; z: string }
obj6 = { y: '5' } // 2 { y: string }
obj6 = { x: '1', z: '2', y: '2' } // 3 { x: string; z: string } + { y: string }
obj6 = { y: '4', z: '5' } // 4 至少符合 { y: string }，且 z 屬於 { x: string; z: string }
obj6 = { y: '4', f: '5' } // 5 符合 { y: string }，但 f 不屬於 { x: string; z: string }
obj6 = { z: '5' } // 6 不符合這兩者之一：{ x: string; z: string } 、 { y: string }

// &：兩者皆須符合，等同於 let obj7: { x: string; y: string }
let obj7: { x: string } & { y: string }
obj7 = { x: '1', y: '2' }
obj7 = { x: '1' }

console.log(6666, obj6)
console.log(7777, obj7)

let info = {
  isCool: undefined,
}

info = {
  isCool: true, // type = undefined
}

// let info = {

//   obj: {
//     x: 1,
//     y: '1',
//   },
// }

// type: "object"
let obj8: object = { x: 1 }
obj8.x = 2
obj8 = {}
obj8 = []
obj8 = function () {}
obj8 = new Object()
obj8 = new Number()
obj8 = new String()
obj8 = '12'
obj8 = { x: 10 }

// 自定義 type: "OBJ9"
type OBJ9 = { x: number }
let obj9: OBJ9 = { x: 1 }
obj9.x = 2
obj9 = {}
obj9 = { x: 10 }

// Type Inference
let obj10 = { x: 1 }
obj10.x = 2
obj10 = {}
obj10 = { x: 10 }

let array1 = [1]

array1.pop = () => 1
array1.pop = () => {
  return '12'
}
array1.pop = () => {}

let obj11 = { fn: () => 1 }
obj11.fn = () => 3
