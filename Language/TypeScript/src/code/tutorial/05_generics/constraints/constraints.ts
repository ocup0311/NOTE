function copyFields<T extends U, U>(target: T, source: U): T {
  // Type 'U[Extract<keyof U, string>]' is not assignable to type 'T[Extract<keyof U, string>]'.
  // Type 'U' is not assignable to type 'T'.
  //   'T' could be instantiated with an arbitrary type which could be unrelated to 'U'.ts(2322)
  for (const id in source) {
    source[id] = target[id]
    target[id] = source[id]
    target[id] = (source as T)[id]
  }

  // Type 'Extract<keyof T, string>' cannot be used to index type 'U'.ts(2536)
  for (const id in target) {
    source[id] = target[id]
    target[id] = source[id]
  }

  return target
}

const objX = { a: 1, b: 2 }
const objY = { b: 20 }

copyFields(objX, objY)

export default {}
