<style> 
.imgBox{
  display: flex; 
  flex-direction: column; 
  margin: 5%; 
  justify-content: center;
  border: 2px solid black;
}
</style>

<!--  style  -->

###### <!-- ref -->

[primitive wrapper]: https://www.javascripttutorial.net/javascript-primitive-wrapper-types/
[mdn]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[`__proto__`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto

 <!-- ref -->

# JS 基礎

> DATE: 3.2022
> REF: [MDN]

## 1. 基本介紹

<!-- Function -->

- <details close>
  <summary>Function</summary>

  <!-- First-Class Function (第一級函數) -->

  - <details close>
     <summary>First-Class Function (第一級函數)</summary>

    - 因為是 object，有其他語言並非如此
    - 可當參數傳

    </details>

  <!-- arguments -->

  - <details close>
     <summary>arguments</summary>

    - 有屬性 `callee`, `length`, etc.
    - Arrow Function 沒有 `arguments` 物件

    ```
    function fn(arg1, arg2) {
      console.log(arguments) // [object Arguments] {"0":1, "1":2}
      console.log([])        // [object Array] []
      console.log({})        // [object Object] {}

    }

    fn(1,2)
    ```

    </details>

  <!-- IIFE -->

  - <details close>
     <summary>IIFE</summary>

    - Immediately Invoked Function Expression
    - _過去使用 IIFE 最主要的原因就是為了避免變數污染造成的問題_

    ```
    EX.
    ;(() => {})()
    ```

    </details>

  <!-- Closure -->

  - <details close>
     <summary>Closure (閉包)</summary>

    - 隱藏 message

    ```
    EX.
    const outer = () => {
      const message = 'message'

      const inner = () => {
        return message
      }

      return inner
    }

    const myFn = outer()
    ```

    </details>

  </details>

<!-- this -->

- <details close>
  <summary>this</summary>

  > **ECMAScript**： The `this` keyword evaluates to the value of the ThisBinding of the current execution context.
  > **MDN**：In most cases, the value of `this` is determined by how a function is called.

  - `this` 代表的是 function **執行**時所屬的物件

  - Arrow Function：`this` 強制在定義時被綁定，無法更改

  - 綁定原則：

     <!-- 預設綁定 (Default Binding) -->

    - <details close>
      <summary>預設綁定 (Default Binding)</summary>

      - 預設綁定到 `global` (window)
      - 但使用 `"use strict"` 會禁止綁定 global (--> `undefined`)

      </details>

     <!-- 隱含式綁定 (Implicit Binding) -->

    - <details close>
      <summary>隱含式綁定 (Implicit Binding)</summary>

      - `function(){}` 專屬
      - 在「呼叫的時機點」為某物件的**參考屬性** (**reference property**) --> 綁定該物件

      ```
      EX.
      function fn() {console.log(this)}
      const obj = {fn1: fn}
      const fn2 = obj.fn1

      fn()       // Default Binding
      obj.fn1()  // obj
      fn2()      // Default Binding
      ```

      </details>

     <!-- 顯式綁定 (Explicit Binding) -->

    - <details close>
      <summary>顯式綁定 (Explicit Binding)</summary>

      - `.bind()` / `.call()` / `.apply()`，綁定指定的物件

      </details>

     <!-- 「new」關鍵字綁定 -->

    - <details close>
      <summary>「new」關鍵字綁定</summary>

      - 綁定被建構出來的物件

      </details>

  </details>

<!-- Primitive Wrapper -->

- <details close>
  <summary>Primitive Wrapper</summary>

  > REF: [Primitive Wrapper]

  - 基本型別使用一些屬性、方法時，短暫 new 一個物件，用完後刪除

  - EX.

  ```
  let str = language.substring(4)
  ```

  ↓ ↓ ↓

  ```
  // technically equivalent to:

  let tmp = new String(language)
  let str = temp.substring(4)
  temp = null
  ```

    </details>

<!-- Prototype -->

- <details open>
  <summary>Prototype</summary>

  <!-- new 建立實體 -->

  - <details close>
    <summary>new 建立實體後，prototype 自動指向</summary>

    - `物件 x` 的「prototype」會自動指向`建構式 Y`的「prototype 屬性」
    - 備註說明：
      - `Y.prototype`：Y 的 prototype property
      - `Y.__proto__`：Y 的 prototype
      - `x.__proto__`：x 的 prototype
      - `Object.getPrototypeOf(x)`：`x.__proto__`
        ([`__proto__`] 已棄用)

    ```
    EX.
    const x = new Y()

    // x 的 prototype 指向 Y.prototype
    Object.getPrototypeOf(x) === Y.prototype
    ```

    </details>

  <!-- js class -->

  - <details close>
    <summary>js class 即是用 prototype</summary>

    ```
    EX.
    class X { }
    class Y extends X { }

    Object.getPrototypeOf(Y) === X
    ```

    </details>

  <!-- Object.prototype -->

  - <details close>
    <summary>Object.prototype</summary>

    - 幾乎所有的物件 (環境宿主物件除外) 順著原型鏈找到最上層，都會找到 `Object.prototype` 才停止 (JavaScript 所有物件的起源)

      ```
      EX.
      const obj = {}
      obj.__proto__.__proto__ === Object.prototype
      ```

    <!-- 提供許多方法 -->

    - <details close>
      <summary>Object.prototype 提供許多方法：</summary>

      ```
      EX.
      Object.prototype.hasOwnProperty()
      Object.prototype.toString()
      Object.prototype.valueOf()
      ```

      </details>

    </details>

  <!-- js class -->

  - <details close>
    <summary>建議基本操作</summary>

    - `Object.setPrototypeOf(<obj>, <proto>)`：設定 obj 的 prototype 為 proto
    - `Object.create(<proto>)`：回傳一個物件，其 prototype 為 proto
    - `Object.getPrototypeOf(<obj>)`：回傳 obj 的 prototype

    </details>

  </details>

## 2. 其他補充

- 注意事項：

  - <details close>
    <summary>x.prototype 不是 x 的 prototype</summary>

    - `x.prototype`：x 的 prototype property
    - `x.__proto__`：x 的 prototype

      - 已改用 `Object.getPrototypeOf(x)`

      </details>

- 小技巧：

  <!-- Cascade -->

  - <details close>
    <summary>Cascade</summary>

    - 也稱作 Fluent Interface

    ```
    EX.
    const calNum = (initNum = 0) => {
      let value = initNum

      const N = {
        add: (num) => {
          value = value + num
          return N
        },

        result: () => value,
      }

      return N
    }

    console.log(calNum(10).add(1).add(2).result())
    ```

    </details>
