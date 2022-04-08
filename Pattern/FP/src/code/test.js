import { curry } from './curry.js'
import { recurry } from './recurry.js'
import * as R from 'ramda'

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
  const reCurriedCal = recurry(cal)

  console.log(reCurriedCal(5, 7, 3)) // 2
  console.log(reCurriedCal(5)(7)(3)) // 2
  console.log(reCurriedCal(5)(7, 3)) // 2
  console.log(reCurriedCal(5, 7)(3)) // 2
  console.log(curriedCal(3, 7, 5)) // 2
  console.log(curriedCal(3)(7)(5)) // 2
  console.log(curriedCal(3)(7, 5)) // 2
  console.log(curriedCal(3, 7)(5)) // 2
}

const tmp_test = () => {
  console.log(
    R.add(1)(9),
    R.compose(Math.abs, R.add(1), R.multiply(2))(-4),
    R.pipe(Math.abs, R.add(1), R.multiply(2))(-4)
  )
}

// run test ----------------------
tmp_test()
curry_test()
