// 原文範例：
// class Map<T> {
//   private _items: { [key: string]: T };

//   set(key: string, value: T) { ... }

//   has(key: string): boolean { ... }

//   get(key: string): T { ... }

//   remove(key: string): T { ... }
// }

// interface NumberMap extends Map<number> {}
// interface StringMap extends Map<string> {}
// interface BooleanMap extends Map<boolean> {}

// function stringsHandler(map: StringMap) { ... }

class Mapper<T> {
  private _items: { [key: string]: T }

  set(key: string, value: T) {}

  has(key: string): boolean {
    return true
  }

  get(key: string): T {
    return this._items[Object.keys(this._items)[0]]
  }

  remove(key: string): T {
    return this._items[Object.keys(this._items)[0]]
  }
}

// 嘗試解釋 -----------------------------------------------------------
// 當我想要統一用 MyMap 來 new 就好 (因為 OO 的 xx 原則。開放封閉原則？)
// --> 我不需要多一個可以被 new 的 StringMap class
// --> 為什麼不用 abstract？
// --> 可能是 abstract 消耗比較大，且沒有必要使用他的其他功能

// 三種方式：interface、class、abstract --------------------------------
// 1. 使用 interface extends class
interface StringMap_I extends Mapper<string> {}
interface NumberMap_I extends Mapper<number> {}
interface BooleanMap_I extends Mapper<boolean> {}

function stringsHandler_I(map: StringMap_I) {}
const stringMapInstance_I: StringMap_I = new Mapper()
stringsHandler_I(stringMapInstance_I)

// 2. 使用 class extends class
class StringMap_C extends Mapper<string> {}
class NumberMap_C extends Mapper<number> {}
class BooleanMap_C extends Mapper<boolean> {}

function stringsHandler_C(map: StringMap_C) {}
const stringMapInstance_C1 = new StringMap_C()
const stringMapInstance_C2: StringMap_C = new Mapper()
stringsHandler_C(stringMapInstance_C2)

// 3. 使用 abstract extends class
abstract class StringMap_A extends Mapper<string> {}
abstract class NumberMap_A extends Mapper<number> {}
abstract class BooleanMap_A extends Mapper<boolean> {}

function stringsHandler_A(map: StringMap_A) {}
const stringMapInstance_A: StringMap_A = new Mapper()
stringsHandler_A(stringMapInstance_A)
