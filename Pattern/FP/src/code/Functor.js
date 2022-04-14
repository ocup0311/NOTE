// A Functor is a type that implements map and obeys some laws

class Functor {
  constructor(value) {
    this.#value = this.#modifyValue(value)

    Object.freeze(this)
  }

  // inner ONLY -------------------
  #value

  #modifyValue(value, cache = new WeakMap()) {
    // exception
    if (value === null || typeof value !== 'object') return value
    if (value instanceof Date || value instanceof RegExp)
      return value.constructor(value)
    if (cache.has(value)) return cache.get(value)

    // var
    const clone = value.constructor()
    const allKeys = [
      ...Object.getOwnPropertyNames(value),
      ...Object.getOwnPropertySymbols(value),
    ]

    // run
    cache.set(value, clone)

    allKeys.forEach((key) => {
      clone[key] = this.#modifyValue(value[key], cache)
    })

    Object.freeze(clone)

    return clone
  }

  // methods -----------------------
  of(v) {
    return new Functor(v)
  }

  get() {
    return this.#value
  }

  map(fn) {
    return this.of(fn(this.#value))
  }
}
Object.freeze(Functor.prototype)

// test --------------------------------------------------
const myFunctor = new Functor({ x: 1 })
const myFunctor2 = myFunctor.map((v) => ({ ...v, y: 2 }))

// Functor.prototype.x = 5 // TypeError
// myFunctor.get().x = 2 // TypeError
console.log(myFunctor)
console.log(myFunctor.get())
console.log(myFunctor2)
console.log(myFunctor2.get())

// const getResult = (functor) => {
//   if (!(functor instanceof Functor)) return null

//   return functor
// }
// console.log(getResult(myFunctor))
// console.log(getResult('myFunctor'))
