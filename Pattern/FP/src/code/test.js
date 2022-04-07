import { curry } from './curry.js'

const curry_test = () => {
  const cal = (x, y, z) => (x + y) / z

  // Simple Curry ------------------------------------
  // util
  const simpleCurry = (fn) => (x) => (y) => (z) => fn(x, y, z)

  const simpleCurriedCal = simpleCurry(cal)

  console.log(cal(3, 7, 5)) // 2
  console.log(simpleCurriedCal(3)(7)(5)) // 2

  // Advanced Curry ------------------------------------
  const curriedCal = curry(cal)

  console.log(curriedCal(3, 7, 5)) // 2
  console.log(curriedCal(3)(7)(5)) // 2
  console.log(curriedCal(3)(7, 5)) // 2
  console.log(curriedCal(3, 7)(5)) // 2
}

const tmp_test = () => {}

// run test ----------------------
tmp_test()
curry_test()
