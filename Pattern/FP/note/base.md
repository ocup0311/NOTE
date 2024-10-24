###### <!-- ref -->

[Effect-TS]: https://github.com/Effect-TS/effect
[Mostly Adequate Guide]: https://mostly-adequate.gitbook.io/mostly-adequate-guide/
[FP with TS]: https://youtu.be/Z3PLwD3iebg?list=PLuPevXgCPUIMbCxBEnc1dNwboH6e2ImQo
[monad]: https://medium.com/javascript-scene/javascript-Monads-made-simple-7856be57bfe8
[immutable.js]: https://ithelp.ithome.com.tw/articles/10187571
[eslint-plugin-immutable]: https://blog.jerry-hong.com/series/fp/think-in-fp-03/
[curry1]: https://javascript.info/currying-partials
[curry2]: https://blog.logrocket.com/understanding-javascript-currying/

 <!-- ref -->

# Functional Programming (FP)

> DATE: 4 (2022)
> REF: [FP with TS] | [Effect-TS] | [Mostly Adequate Guide]

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
  - `Effect Functor`：拖延戰術

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

    ```js
    EX.fn(a, b, c)

    // currying
    fn(a)(b)(c)

    // Partial
    fn(a)(b, c)
    ```

  - Compose vs Pipe

    - Compose also makes a lot of sense when using React components.

    ```js
    EX.
    const compose = (fn1, fn2, fn3) => x => fn1(fn2(fn3(x)))
    const pipe = (fn1, fn2, fn3) => x => fn3(fn2(fn1(x)))
    ```

    - 實作:

    ```js
    const compose =
      (...fnArr) =>
      (x) =>
        fnArr.reduceRight((result, fn) => fn(result), x)

    const pipe =
      (...fnArr) =>
      (x) =>
        fnArr.reduce((result, fn) => fn(result), x)
    ```

    - 使用時機：

    ```js
    // 1. when only one line
    const result1 = R.compose(fn7, fn6, fn5, fn4, fn3, fn2, fn1)(arg)

    // easily read like Math:
    // result1 = fn7(fn6(fn5(fn4(fn3(fn2(fn1(arg)))))))

    --------------------------

    // 2. when too long and break to many lines
    const result2 = R.pipe(
      veryLongFn1,
      veryLongFn2,
      veryLongFn3,
      veryLongFn4
    )(arg)

    // easily read like JS:
    // const r1 = veryLongFn1(arg)
    // const r2 = veryLongFn2(r1)
    // const r3 = veryLongFn3(r2)
    // const result2 = veryLongFn4(r3)

    --------------------------

    // 3. when it's used for a component
    const MyComponent = R.compose(
      RequireAuth,
      Container,
      List,
      R.map(ListItem)
    )

    // easily read like HTML:
    // <RequireAuth>
    //   <Container>
    //     <List>
    //       {R.map(ListItem)}
    //     </List>
    //   </Container>
    // </RequireAuth>
    ```

- DRY (Don’t Repeat Yourself)

- Pointfree style

- Ramda

  - "function first, data last" (有助建立 Pointfree 模式)
  - 任何 API 都是 curried function (並非全部 e.g. compose)

- Just (Container)

  - Functor

    - 實現 map 的 Container

  - Monad

    - 可以變扁 (flatten) 的 pointed Functor

  - Applicative Functor

    - 實現了 ap 方法的 pointed Functor
    - Functor 與 Functor 間的運算

- Functor

  - But what about `control flow`, `error handling`, `asynchronous actions`, `state` and, dare I say, `effects`?!

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

## 3. 延伸閱讀

<!-- Effect-TS -->

- <details close>
  <summary>Effect-TS</summary>

  - FP-TS 專案已經沒維護了，改成 [Effect-TS]
  - [FP with TS]

  </details>
