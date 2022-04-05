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

[immutable.js]: https://ithelp.ithome.com.tw/articles/10187571
[eslint-plugin-immutable]: https://blog.jerry-hong.com/series/fp/think-in-fp-03/

 <!-- ref -->

# JS 基礎

> DATE: 4 (2022)
> REF:

## 1. 基本介紹

- FP 要追求的…其實不是整個程式都是 Pure，而是 Pure 與 Impure 有明顯的界線。

- 是 `Declarative Paradigm` (宣告式) 的代表 (vs. Imperative 命令式)
- `Referential Transparency`：FP 的構想源自於 lambda 演算，而 lambda 演算中的函式就真的是數學上的函式 (相同的一組輸入，結果都是相同)

- 避免 Side Effects

  - `Monad`：把 Side Effect 用 Monad 封裝起來
  - `Dependency injection`：把問題丟給別人
  - `Effect functor`：拖延戰術

- immutable 技巧

  - [immutable.js]

    - 只複製有變動的節點父層以上的地方
    - 比 `deepClone` 省時間、空間

  - [eslint-plugin-immutable]

- Stateless
  - Avoid Shared State

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
