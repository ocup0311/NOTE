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

[monad]: https://medium.com/javascript-scene/javascript-monads-made-simple-7856be57bfe8
[immutable.js]: https://ithelp.ithome.com.tw/articles/10187571
[eslint-plugin-immutable]: https://blog.jerry-hong.com/series/fp/think-in-fp-03/
[curry1]: https://javascript.info/currying-partials
[curry2]: https://blog.logrocket.com/understanding-javascript-currying/

 <!-- ref -->

# Functional Programming (FP)

> DATE: 4 (2022)
> REF:

## 1. 基本介紹

- Buzz words：

  > **Pure function** use **Immutable** and **Stateless** data to avoid **Side Effect**, this kind of expression called **Referential Transparency**

  - Immutable Data
  - Stateless (avoid share state)
  - Pure Function
  - Referential Transparency
  - No Side Effect

- Pure Function 特性：

  - Easy 容易理解
  - Reliable 可靠穩定的 & 可並行運作
  - Testable 可測試
  - Reusable 再利用 & Portable
  - Composable 再組合

- FP 要追求的…其實不是整個程式都是 Pure，而是 Pure 與 Impure 有明顯的界線。

- 是 `Declarative Paradigm` (宣告式) 的代表 (vs. Imperative 命令式)

- `Referential Transparency`：FP 的構想源自於 lambda 演算，而 lambda 演算中的函式就真的是數學上的函式 (相同的一組輸入，結果都是相同)

- 避免 Side Effects

  - [Monad]：把 Side Effect 用 Monad 封裝起來
  - `Dependency injection`：把問題丟給別人
  - `Effect functor`：拖延戰術

- immutable 技巧

  - [immutable.js]

    - Immutable data structure
    - 只複製有變動的節點父層以上的地方
    - 比 `deepClone` 省時間、空間

  - [eslint-plugin-immutable]

- Stateless

  - Avoid Shared State

- Higher-order function
- Curried function / Composition

  > REF: [Curry1] | [Curry2]

  - Partial application vs. currying

    - currying 一次只接受一個參數

    ```
    EX.
    fn(a, b, c)

    // currying
    fn(a)(b)(c)

    // Partial
    fn(a)(b, c)
    ```

- DRY (Don’t Repeat Yourself)

- Ramda
  - "function first, data last" (有助建立 Pointfree 模式)

---

## 2. 其他補充

- 注意事項：

  - <details close>
    <summary></summary>

    </details>

- 小技巧：

  - <details close>
    <summary></summary>

    </details>
