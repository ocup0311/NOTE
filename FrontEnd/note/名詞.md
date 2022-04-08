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

[tree shaking]: https://webpack.js.org/guides/tree-shaking/
[critical css]: https://www.sitepoint.com/how-and-why-you-should-inline-your-critical-css/
[debounce & throttle]: https://medium.com/@alexian853/debounce-throttle-%E9%82%A3%E4%BA%9B%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC%E6%87%89%E8%A9%B2%E8%A6%81%E7%9F%A5%E9%81%93%E7%9A%84%E5%B0%8F%E4%BA%8B-%E4%B8%80-76a73a8cbc39
[usedeferredvalue]: https://betterprogramming.pub/5-new-hooks-in-react-18-300aa713cefe

 <!-- ref -->

# 前端名詞

> DATE: 4.2022

<!-- Tree Shaking -->

- <details close>
  <summary>Tree Shaking</summary>

  > REF: [Tree Shaking]

  - 編譯打包時，將未使用到的程式碼 (dead-code) 移除。 (像在搖動樹木，將枯葉搖落一般)

  </details>

<!-- Critical CSS -->

- <details close>
  <summary>Critical CSS</summary>

  > REF: [Critical CSS]

  - 只將初次載入區塊需要渲染的 CSS 抽出來，放在 `<head>`，後續的 CSS 再以 Lazy loading 的方式延遲載入。

  </details>

<!-- Debounce & Throttle -->

- <details close>
  <summary>Debounce & Throttle</summary>

  > REF: [Debounce & Throttle]

  - 參考 React 18 [useDeferredValue]

  </details>
