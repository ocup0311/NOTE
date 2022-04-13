class Just {
  constructor(value) {
    Object.defineProperty(this, '__value', { value, enumerable: false })
  }

  of(v) {
    console.log(1111, Object.getPrototypeOf(this), this)
    return new Just(v)
  }

  get() {
    return this.__value
  }
}
Object.freeze(Just.prototype)

class Functor extends Just {
  constructor(value) {
    super(value)
  }

  map(fn) {
    return this.of(fn(this.__value))
  }
}
Object.freeze(Functor.prototype)

class Maybe extends Just {
  constructor(value) {
    super(value)
  }

  isNothing() {
    return this.__value === null || this.__value === undefined
  }

  map(fn) {
    return this.isNothing() ? this.of(null) : this.of(fn(this.__value))
  }
}

class Monad extends Maybe {
  constructor(value) {
    super(value)
  }

  join() {
    return this.isNothing() ? this.of(null) : this.__value
  }
}

const myFunctor = new Functor(1)

myFunctor.xx = 1

console.log('MyFunctor:', myFunctor)
console.log('MyFunctor.get:', myFunctor.get())
const myJust2 = myFunctor.map((v) => v + 1)
console.log('MyFunctor:', myFunctor)
console.log('MyFunctor.get:', myFunctor.get())
console.log('myJust2:', myJust2)
console.log('myJust2.get:', myJust2.get())
