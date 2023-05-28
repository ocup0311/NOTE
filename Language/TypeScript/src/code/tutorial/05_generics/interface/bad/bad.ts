// 1. 我認為不好的寫法 ----------------------------------------------------
interface CreateArrayFunc<T> {
  (length: number, value: T): Array<T>
}

const createArray_bad: CreateArrayFunc<any> = function <T>(
  length: number,
  value: T
): Array<T> {
  const result: T[] = []

  for (let i = 0; i < length; i++) {
    result[i] = value
  }

  return result
}

const arr1 = createArray_bad(3, 'x')
arr1.push(1) // 不如預期的正常運作

// 2. 不用 interface 都更好 ----------------------------------------------
const createArray_ok = function <T>(length: number, value: T): Array<T> {
  const result: T[] = []

  for (let i = 0; i < length; i++) {
    result[i] = value
  }

  return result
}

const arr2 = createArray_ok(3, 'x')
arr2.push(1) // Error: Argument of type 'number' is not assignable to parameter of type 'string'.

export default {}
