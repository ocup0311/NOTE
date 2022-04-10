import { curry } from './curry.js'
import { recurry } from './recurry.js'
import { composeWithAsync, composeWithAsyncMix } from './composeWithAsync.js'
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

const composeAsync_test = async () => {
  // some testing functions
  const asyncFn = R.curry(
    (fnName, data) =>
      new Promise((resolve) =>
        setTimeout(() => {
          console.log(fnName, ': ', data)

          resolve({ ...data, value: data.value + 1 })
        }, data.time)
      )
  )

  const syncFn = R.curry((fnName, data) => {
    console.log(fnName, ': ', data)
    return { ...data, value: data.value + 10 }
  })

  const asyncFn1 = asyncFn('asyncFn1')
  const asyncFn2 = asyncFn('asyncFn2')
  const syncFn1 = syncFn('syncFn1')
  const syncFn2 = syncFn('syncFn2')
  const syncFn3 = syncFn('syncFn3')

  // run --------------------------------
  const arg = { value: 1, time: 5000 }

  const tasksMix = [syncFn3, asyncFn2, syncFn2, asyncFn1, syncFn1]
  const result1 = await composeWithAsyncMix(tasksMix)(arg)
  console.log('result1: ', result1)

  const tasksAsync = [asyncFn2, asyncFn1]
  const result2 = await composeWithAsync(tasksAsync)(arg)
  console.log('result2: ', result2)

  // log --------------------------------

  // [immediately ...]
  // syncFn1 :  { value: 1, time: 5000 }
  // composeWith { value: 11, time: 5000 }
  // composeWith Promise { <pending> }
  // composeWith Promise { <pending> }
  // composeWith Promise { <pending> }

  // [5 seconds later ...]
  // asyncFn1 :  { value: 11, time: 5000 }
  // syncFn2 :  { value: 12, time: 5000 }

  // [5 seconds later ...]
  // asyncFn2 :  { value: 22, time: 5000 }
  // syncFn3 :  { value: 23, time: 5000 }
  // result:  { value: 33, time: 5000 }

  // [5 seconds later ...]
  // asyncFn1 :  { value: 1, time: 5000 }

  // [5 seconds later ...]
  // asyncFn2 :  { value: 2, time: 5000 }
  // result2:  { value: 3, time: 5000 }
}

const pipe_compose_test = () => {
  const pipe =
    (...fnArr) =>
    (x) =>
      fnArr.reduce((result, fn) => fn(result), x)

  const compose =
    (...fnArr) =>
    (x) =>
      fnArr.reduceRight((result, fn) => fn(result), x)

  console.log(
    R.add(1)(9),
    compose(Math.abs, R.add(1), R.multiply(2))(-4),
    R.compose(Math.abs, R.add(1), R.multiply(2))(-4),
    pipe(Math.abs, R.add(1), R.multiply(2))(-4),
    R.pipe(Math.abs, R.add(1), R.multiply(2))(-4)
  )
}

const tmp_test = async () => {
  const composeWhileNotNil = R.composeWith((f, res) => {
    console.log(f, res)
    return R.isNil(res) ? res : f(res)
  })

  const a = composeWhileNotNil([
    Math.abs,
    R.add(1),
    R.multiply(2),
    R.prop('age'),
  ])({ age: 10 })

  const b = composeWhileNotNil([
    Math.abs,
    R.add(1),
    R.multiply(2),
    R.prop('age'),
  ])({})

  console.log(a, b)
}

// run test ----------------------
tmp_test()
// curry_test()
// composeAsync_test()
// pipe_compose_test()
