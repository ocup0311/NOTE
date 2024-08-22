##### <!-- 收起 -->

<!----------- ref start ----------->

[state structure]: https://zh-hans.react.dev/learn/choosing-the-state-structure
[React 18 effect 函式執行兩次的原因及 useEffect 常見情境]: https://medium.com/@linyawun031/react-react-18-effect-函式執行兩次的原因及-useeffect-常見情境-2dc65c18b64b
[React 18 新功能之自動批次更新]: https://juejin.cn/post/7153814771937067044
[Learn React 文件]: https://react.dev/learn
[React Profiler]: https://max80713.medium.com/使用-react-profiler-來觀察-react-web-app-的渲染狀況並進行效能優化-bde15fe3d267
[why-did-you-render]: https://segmentfault.com/a/1190000023031115

<!----------- ref end ----------->

# React

> DATE: 8 (2024)
> REF: [Learn React 文件]

## # 簡介

---

## # 安裝與設定

---

## # 基本概念

---

## # 基本用法

<!-- useReducer -->

- <details close>
  <summary><code>useReducer</code></summary>

  <!-- 使用時機 -->

  - <details close>
    <summary>使用時機</summary>

    - 有太過複雜的 setState 邏輯時，將狀態的邏輯統一寫在 reducer 內，達到`關注點分離`
    - 一整套的 setState 組合 (EX. 一個 action 要對兩個 state 做更新的組合)

    </details>

  <!-- 行為特性 -->

  - <details close>
    <summary>行為特性</summary>

    - `dispatch` 一個 `action` 到 `reducer` 中，依照其中的邏輯進行更新 `state`
    - 透過發送要做的動作，有別於 `useState` 是直接告知要改為哪個 state
    - dispatch (function) / action (object) / reducer (function)

    </details>

  <!-- 推薦作法 -->

  - <details close>
    <summary>推薦作法</summary>

    - 建議使用 `switch / case` 寫法，且都用 `{ }` 包住
    - 維持 pure 寫法
    - 一個有意義的 action，會是組合所有相關 state 的更新，在同一次 dispatch 中進行 (而不是每個 state 分開做 dispatch)

    </details>

  <!-- 避免作法 -->

  - <details close>
    <summary>避免作法</summary>

    - 避免將其他`業務邏輯`也移動到 reducer，而是只放`狀態更新`的邏輯

    </details>

  <!-- 其他補充 -->

  - <details close>
    <summary>其他補充</summary>

    - 命名由來參考 `reduce()`。都是接受 當前狀態 和 action，然後返回 下個狀態
    - 因為獨立在 component 外，所以可以單獨做狀態更新邏輯的`測試`
    - 常與 `context` 搭配使用

    </details>

  </details>

<!-- useContext -->

- <details close>
  <summary><code>useContext</code></summary>

  <!-- 使用時機 -->

  - <details close>
    <summary>使用時機</summary>

    - 多個 component 中需共用 state
    - 多層巢狀 component 的組合

    </details>

  <!-- 行為特性 -->

  - <details close>
    <summary>行為特性</summary>

    - 讓 props 直達目的 component，而不需透過中間層傳遞
    - 更直接知道 props 來源，而不需再一層層追朔

    </details>

  <!-- 推薦作法 -->

  - <details close>
    <summary>推薦作法</summary>

    - 用來管理複雜的狀態時，搭配 reducer 使用

    </details>

  <!-- 避免作法 -->

  - <details close>
    <summary>避免作法</summary>

    - 避免過度使用。在使用之前，先試試 (1)傳遞 props (2)將 JSX 當作 children 傳遞。兩者皆無法滿足才使用 context

    </details>

  <!-- 其他補充 -->

  - <details close>
    <summary>其他補充</summary>

    - 可搭配客製化 Hook 使用
    - 一般在 Theme、Auth、Route 會使用

    </details>

  <!-- 經驗分享 -->

  - <details close>
    <summary>經驗分享</summary>

    - 使用 context 做全域時，即便在一個有 2000 個 component 的專案中，也不會感受到 re-render 的卡頓

    </details>

  </details>

<!-- 範例 -->

- <details close>
  <summary><code>範例</code></summary>

  <!-- 行為特性 -->

  - <details close>
    <summary>行為特性</summary>

    </details>

  <!-- 使用時機 -->

  - <details close>
    <summary>使用時機</summary>

    </details>

  <!-- 開發步驟 -->

  - <details close>
    <summary>開發步驟</summary>

    </details>

  <!-- 推薦作法 -->

  - <details close>
    <summary>推薦作法</summary>

    </details>

  <!-- 避免作法 -->

  - <details close>
    <summary>避免作法</summary>

    </details>

  <!-- 其他補充 -->

  - <details close>
    <summary>其他補充</summary>

    </details>

  </details>

---

## # 套件

<!-- React Hook Form -->

- <details close>
  <summary>React Hook Form</summary>

  - 行為特性：

    - 將渲染的控制狀態交還給瀏覽器原生，submit 時才更新 react 狀態
    - 因為一般來說，react 不需要知道這些狀態改變，只需要 submit 時再知道結果

  - 差異比較：

    - Formik 則是直接與 react state 做綁定同步

  - 發展簡史：

    - Formik 在更早期開發出來，後來 React Hook Form 才出現，使用量在 2022 出現交叉點
    - 目前 React Hook Form 作法更多人推薦

  </details>

---

## # 問題集中區

- 研究將 object state 扁平化後，是否影響效率，還是只有影響 setState 的便利性

  - [src](../src/code/state_struct.js)

- [React 18 新功能之自動批次更新]

---

## # 其他補充

<!-- 注意事項 -->

- 注意事項：

<!-- 小技巧 -->

- 小技巧：

<!-- 小工具 -->

- 小工具：

  - <details close>
    <summary></summary>

    </details>

<!-- 補充學習 -->

- 補充學習：

---

## # 踩雷實錄

---

## # 延伸討論

- <details close>
  <summary></summary>

  </details>

---

## # 小記

- Hook 是特殊的函數，只在 React 渲染時有效

- parent 的 state，在 setState 後，整個 parent 的 VDOM 都會 re-render

- Reconciliation：更新狀態後，VDOM 會先與上一次的 VDOM 做比對，再更新到真實 DOM

- 效能優化 (如 useCallback、useMemo)

  - 切忌過早使用 useCallback 和 useMemo 等，而是等到出現效能問題的位置，才進行使用
  - 理論上，位於越父層的，越需要使用
  - 分析工具

    - [why-did-you-render]
    - [React Profiler]

- 在渲染完成並且 React 更新 DOM 之後，瀏覽器就會重新繪製螢幕。儘管這個過程被稱為“瀏覽器渲染” (browser rendering)，但我們還是將它稱為“繪製” (painting)

- React 18 嚴格模式下，會在 `開發模式` 中故意調用兩次 setState、mount 等等，用來檢測是否有不期望的副作用

  - REF: [React 18 effect 函式執行兩次的原因及 useEffect 常見情境]

  - EX. 可看到出現兩次 log

    ```js
    setNumber((n) => {
      console.log(n)
      return n + 1
    })
    ```

- `transform` 可避免 reflow，會直接 repaint，只用 GPU 計算，讓畫面看起來有改變

- "living styleguide" or "storybook"

  - 展示出一個 component 的所有狀態的 view
  - 設計可用 storybook 工具來做

- state structure

  - REF: [state structure]

  - 盡量濃縮到使用最少數量的 state，若可以合併的則合併
  - 最好以扁平化方式建置 state。或是用子元件攤平
  - 在渲染期間從 props 或 state 中計算出一些訊息，則不應該再放到該元件的其他 state 中
  - 透過 `reducer` 來減少「不可能」state (可視作 "組合 state")
  - "讓你的狀態盡可能簡單，但不要過於簡單"

- controlled / uncontrolled component

  - 分別為狀態由 prop / state 控制

- proxy & reflect

- 通常將 reducer 與 context 搭配使用來管理複雜的狀態，可以避免 context 內 state 被任意改動

- Effect

  - 如果你想用 Effect 只根據其他狀態調整某些狀態，那麼你可能不需要 Effect

  - useEffectEvent

  - 如果 ref 是從父元件傳遞的，則必須在依賴項陣列中指定它
