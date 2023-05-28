// 1. 將 generics 定義在 function 上 ---------------------------------------------------------------------
interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>
}

const createArray: CreateArrayFunc = function <T>(
  length: number,
  value: T
): Array<T> {
  const result: T[] = []

  for (let i = 0; i < length; i++) {
    result[i] = value
  }

  return result
}

const arr = createArray(3, 'x')
arr.push(1) // Error: Argument of type 'number' is not assignable to parameter of type 'string'.

export default {}
