// const mem1 = process.memoryUsage()
// console.log('mem1:', mem1)

// const str = '123'

// const mem2 = process.memoryUsage()
// console.log('mem2:', mem2)

// const mem3 = process.memoryUsage()
// console.log('mem3:', mem3)

// console.log('mem3:', mem3, 'dasfghj', 9999999999999999999999)

// const arr = Array(3.355 * 1e7).fill('some string')
// arr.reverse()

const x = '1234567'
const used = process.memoryUsage()
console.log('used:', used)

// for (let key in used) {
//   console.log(`${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`)
// }
