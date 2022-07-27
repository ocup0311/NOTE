const message1: (number | string)[] = ['Hello, world!', 0]

const array1: Array<string | number> = []
array1.push(1)
array1.push('1')

const array2: (string | null)[] = []
array2.push(null)
array2.push('null')
array2.push(null)

console.log(array1, array2)

const fn1 = (input: string) => {
  let output: string | number = 1

  if (input) output = input

  return output
}

fn1('false')

function fn2() {}

// 測試 "strictNullChecks": true -------------------------------
// type obj = {
//   name: string
//   age: number
// }

const loggedInUsername: string = 'Oby'

const users = [
  { name: 'Oby', age: 12 },
  { name: 'Heera', age: 32 },
]

const loggedInUser = users.find((u) => u.name === loggedInUsername)
console.log(loggedInUser?.age)
// 測試 "strictNullChecks": true -------------------------------
