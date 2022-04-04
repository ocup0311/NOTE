const promise_test = (type) => {
  const buildPromise = (data) =>
    new Promise((resolve) =>
      setTimeout(
        () => {
          console.log(data)
          resolve(data.value)
        },
        data.time,
        data.value
      )
    )

  const itemArr = [
    { value: '🥝', time: 22 },
    { value: '🍓', time: 33 },
    { value: '🍍', time: 11 },
    { value: '🍇', time: 44 },
  ]

  // compare some methods to deal with Promise:
  switch (type) {
    case '1. new Promise() only':
      // 1. Promise.all / Promise.race / for await ... of  等等，都還沒使用
      // { value: '🍍', time: 11 }
      // { value: '🥝', time: 22 }
      // { value: '🍓', time: 33 }
      // { value: '🍇', time: 44 }

      ;(() => {
        const promiseArr = itemArr.map((v) => buildPromise(v))
      })()
      break

    case '2. Promise.all()':
      // 2. 使用 Promise.all
      // { value: '🍍', time: 11 }
      // { value: '🥝', time: 22 }
      // { value: '🍓', time: 33 }
      // { value: '🍇', time: 44 }
      // all [ '🥝', '🍓', '🍍', '🍇' ]

      ;(async () => {
        const promiseArr = itemArr.map((v) => buildPromise(v))
        const result = await Promise.all(promiseArr)
        console.log('all', result)
      })()
      break

    case '3. Promise.race()':
      // 3. 使用 Promise.race
      // { value: '🍍', time: 11 }
      // race 🍍
      // { value: '🥝', time: 22 }
      // { value: '🍓', time: 33 }
      // { value: '🍇', time: 44 }

      ;(async () => {
        const promiseArr = itemArr.map((v) => buildPromise(v))
        const result = await Promise.race(promiseArr)
        console.log('race', result)
      })()
      break

    case '4. for await ... of':
      // 4. 使用 for await ... of

      // { value: '🍍', time: 11 }
      // { value: '🥝', time: 22 }
      // for await 🥝
      // { value: '🍓', time: 33 }
      // for await 🍓
      // for await 🍍
      // { value: '🍇', time: 44 }
      // for await 🍇

      ;(() => {
        const promiseArr = itemArr.map((v) => buildPromise(v))

        ;(async () => {
          for await (const result of promiseArr) {
            console.log('for await', result)
          }
        })()
      })()
      break

    case '5. for( ){ await new Promise}':
      // 5. 使用 for( ){ await new Promise}
      // { value: '🥝', time: 22 }
      // for { value: '🥝', time: 22 }
      // { value: '🍓', time: 33 }
      // for { value: '🍓', time: 33 }
      // { value: '🍍', time: 11 }
      // for { value: '🍍', time: 11 }
      // { value: '🍇', time: 44 }
      // for { value: '🍇', time: 44 }

      ;(() => {
        ;(async () => {
          for (const item of itemArr) {
            await buildPromise(item)
            console.log('for', item)
          }
        })()
      })()
      break
    default:
      console.log('give a valid promise_test type')
  }
}
