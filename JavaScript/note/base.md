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

 <!-- ref -->

# JS 基礎

> DATE: 3.2022
> REF:

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

## 2. 其他補充

- 注意事項：
- 小技巧：
