// 2. 將 generics 定義在 interface 上 ---------------------------------------------------------------------
// -- (1) 但每個 function 是獨立的，只是用到同一個 interface 的模樣
// -- (2) function 可以只寫一次，但不同 type 則須分開定義，變成數個 function
interface CreateArrayFunc<T> {
  (length: number, value: T): Array<T>
}

const createArray = function <T>(length: number, value: T): Array<T> {
  const result: T[] = []

  for (let i = 0; i < length; i++) {
    result[i] = value
  }

  return result
}

export const createStringArray: CreateArrayFunc<string> = createArray
export const createNumberArray: CreateArrayFunc<number> = createArray

createStringArray(3, 'x')
createNumberArray(3, 1)
