##### <!-- 收起 -->

<!----------- ref start ----------->

[React as a UI Runtime]: https://overreacted.io/react-as-a-ui-runtime/
[Getting Closure on React Hooks]: https://www.swyx.io/hooks
[互動式視覺化 React hooks 時間軸]: https://julesblom.com/writing/react-hook-component-timeline
[A (Mostly) Complete Guide to React Rendering Behavior]: https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/
[Mark's Dev Blog]: https://blog.isquaredsoftware.com/series/blogged-answers/
[React 開發者一定要知道的底層機制 — React Fiber Reconciler]: https://medium.com/starbugs/react-開發者一定要知道的底層架構-react-fiber-c3ccd3b047a1
[state structure]: https://zh-hans.react.dev/learn/choosing-the-state-structure
[React 18 effect 函式執行兩次的原因及 useEffect 常見情境]: https://medium.com/@linyawun031/react-react-18-effect-函式執行兩次的原因及-useeffect-常見情境-2dc65c18b64b
[React 18 新功能之自動批次更新]: https://juejin.cn/post/7153814771937067044
[Learn React 文件]: https://react.dev/learn
[React Profiler]: https://max80713.medium.com/使用-react-profiler-來觀察-react-web-app-的渲染狀況並進行效能優化-bde15fe3d267
[why-did-you-render]: https://segmentfault.com/a/1190000023031115

<!----------- ref end ----------->

# React

> DATE: 8 (2024)
> REF: [Learn React 文件] | [Mark's Dev Blog]

## # 簡介

---

## # 基本概念

<!-- Fiber Tree -->

- <details close>
  <summary>Fiber Tree</summary>

  - REF: [React 開發者一定要知道的底層機制 — React Fiber Reconciler]
  - [Fiber Object](../src/code/fiber.types.ts)

  ![](../src/image/Fiber_Tree.gif)

  </details>

<!-- Rendering -->

- <details close>
  <summary>Rendering</summary>

  <!-- REF -->

  - <details close>
    <summary>REF</summary>

    - [互動式視覺化 React hooks 時間軸]
    - [A (Mostly) Complete Guide to React Rendering Behavior]

    </details>

  <!-- 兩階段 -->

  - <details close>
    <summary>React 有兩個階段，此部分為 Render Phase</summary>

    - `Render`：製作 VDOM、比較差異
    - `Commit`：套用到 DOM

    </details>

  <!-- 名詞解釋 -->

  - <details close>
    <summary>名詞解釋</summary>

    <!-- Render -->

    - <details close>
      <summary>Render</summary>

      - 定義：在 React 中指的是製作 VDOM
      - 細節：

        - 也就是會執行一遍 Functional Component 內部的 render logic
        - 沒使用 Hook 優化的計算都會再計算一次
        - 如果 child 的 component type & key 相同，則會直接將計算結果更新在舊有的 Fiber object

      - 解釋：

        - 為了避免與 VDOM Render 搞混，React 官方將 `browser rendering` 稱為 `painting`
        - 而在更新 real DOM 之後，瀏覽器就會重新繪製螢幕，這個過程原本應該稱為 `browser rendering`

      </details>

    <!-- Reconciliation -->

    - <details close>
      <summary>Reconciliation</summary>

      - 定義：re-render 後，VDOM 會先與 last VDOM 做比對，再將差異更新到 real DOM 的過程

      </details>

    </details>

  <!-- 行為特性 -->

  - <details close>
    <summary>行為特性</summary>

    - `setState`、`dispatch` 會觸發 queue a re-render，先將狀態更新放進一個 queue

    <!-- 單一事件下會一起只做一次更新 (Automatic Batching：v18 前後為兩種版本) -->

    - <details close>
      <summary>單一事件下會一起只做一次更新 (Automatic Batching：以 v18 前後區分為兩種 作用範圍)</summary>

      - REF: [React 18 新功能之自動批次更新]

      - 作用範圍

        - before：every single `React event`
        - after：every single event loop tick (包含 `setTimeout`、`await` 等等)

      <!-- EX. -->

      - <details close>
        <summary>EX.</summary>

        - before：3 次 render (0 & 1 / 2 / 3)
        - after：2 次 render (0 & 1 / 2 & 3)

        ```js
        const [counter, setCounter] = useState(0)

        const onClick = async () => {
          setCounter(0)
          setCounter(1)

          const data = await fetchSomeData()

          setCounter(2)
          setCounter(3)
        }
        ```

        </details>

      </details>

    - parent 的狀態更新後，整個 parent 底下的 VDOM 都會 re-render
    - re-render 不代表 re-create Fiber object (可能會將計算結果更新 old Fiber object)
    - 如果 child 使用 React.memo()，則會先進行 props 的比較，再決定是否 re-render

    </details>

  <!-- 避免作法 -->

  - <details close>
    <summary>避免作法</summary>

    <!-- 避免在 Component 內部創建其他 Component type -->

    - <details close>
      <summary>避免在 Component 內部創建其他 Component type</summary>

      ```js
      // X 錯誤
      function ParentComponent() {
        function ChildComponent() {}

        return <ChildComponent />
      }

      // O 正確
      function ChildComponent() {}
      function ParentComponent() {
        return <ChildComponent />
      }
      ```

      </details>

    <!-- 避免在 render logic 中 setState -->

    - <details close>
      <summary>避免在 render logic 中 setState</summary>

      ```js
      // X 錯誤
      function Parent() {
        const [state, setState] = useState()
        setState()

        return <Child />
      }

      // O 正確
      function Parent() {
        const [state, setState] = useState()
        const handleClick = () => {
          setState()
        }

        return <Child onClick={handleClick} />
      }
      ```

      </details>

    </details>

  <!-- 其他補充 -->

  - <details close>
    <summary>其他補充</summary>

    - VDOM re-render 在一般情況下都算可接受範圍，而且 React 就是靠著 VDOM re-render 來快速判斷要更改哪些 real DOM 的部分
    - 主要影響效能的在於更改 real DOM
    - 可注意 `<Child />` 與 `{children}` 在 render 上的差異，一些情況可利用 `{children}` 方式避免不必要的 re-render

    </details>

  <!-- 簡易結論 -->

  - <details close>
    <summary>簡易結論</summary>

    - 一般使用情況，re-render 幾乎不影響效能
    - 但應避免濫用導致的不必要的 re-render (EX. useEffect 的濫用)
    - 只在真實感受到效能不好的地方，再針對使用 memo 等做優化

    </details>

  </details>

<!-- Hook -->

- <details close>
  <summary>Hook</summary>

  - REF: [Getting Closure on React Hooks]
  - 底層

    - 實際上，React 將一個 component 所有的 Hook 存為 fiber object 中的一個 linked list
    - 再將整個表層複製到 component 中

  - Hook 是特殊的函數，只在 React 渲染時有效

  </details>

<!-- `<Child />` vs `{children}` -->

- <details close>
  <summary><code>&lt;Child/&gt;</code> vs <code>{children}</code></summary>

  - `<Child />` 是在 parent 上渲染 Child。`{children}` 則是將渲染好的 children 傳入
  - 因此使用 `{children}` 可以用來分離 state 與 UI，避免 parent 的 state 改變觸發 children 進行不必要的 re-render
  - 當 `{children}` 本身內部進行 re-render 時，因為可以重用 Fiber object，所以也不會造成 parent 不必要的 re-render

  </details>

---

## # 基本用法

<!-- useState -->

- <details close>
  <summary><code>useState</code></summary>

  <!-- 使用時機 -->

  - <details close>
    <summary>使用時機</summary>

    </details>

  <!-- 行為特性 -->

  - <details close>
    <summary>行為特性</summary>

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
    - 當 state 更新時，使用到 useContext 的 child 會 re-render

    </details>

  <!-- 推薦作法 -->

  - <details close>
    <summary>推薦作法</summary>

    - 用來管理複雜的狀態時，搭配 reducer 使用，會建議將 state & dispatch 分別建立兩個 context
    - 若傳遞的 value 是 object，則需使用 `usememo` 優化
    - 可適時將 (1) provider 包覆下 (2) 使用 `useContext` 下 的第一層 child 進行 `React.memo()` 優化
      (讓只有真的使用 `useContext` 的那些 component 進行 re-render)
      (但依然是只在效能耗費很大情況下使用)

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

<!-- useRef -->

- <details close>
  <summary><code>useRef</code></summary>

  <!-- 使用時機 -->

  - <details close>
    <summary>使用時機</summary>

    </details>

  <!-- 行為特性 -->

  - <details close>
    <summary>行為特性</summary>

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

<!-- useEffect -->

- <details close>
  <summary><code>useEffect</code></summary>

  <!-- 使用時機 -->

  - <details close>
    <summary>使用時機</summary>

    </details>

  <!-- 行為特性 -->

  - <details close>
    <summary>行為特性</summary>

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

    - `useLayoutEffect` 是 `useEffect` 的一個變種，可以在 `repaint` 之前觸發，可讓使用者不會看到畫面的變化，而是直接看到最後結果

    </details>

  </details>

<!-- useMemo & useCallback -->

- <details close>
  <summary><code>useMemo & useCallback</code></summary>

  <!-- 使用時機 -->

  - <details close>
    <summary>使用時機</summary>

    - 效能優化
    - 理論上，位於越父層的，越需要使用？

    </details>

  <!-- 行為特性 -->

  - <details close>
    <summary>行為特性</summary>

    </details>

  <!-- 推薦作法 -->

  - <details close>
    <summary>推薦作法</summary>

    </details>

  <!-- 避免作法 -->

  - <details close>
    <summary>避免作法</summary>

    - 避免過早使用 useCallback 和 useMemo 等，而是等到出現效能問題的位置，才進行使用

    </details>

  <!-- 其他補充 -->

  - <details close>
    <summary>其他補充</summary>

    - 分析工具：[why-did-you-render] | [React Profiler]

    </details>

  </details>

<!-- 範例 -->

- <details close>
  <summary><code>範例</code></summary>

  <!-- 使用時機 -->

  - <details close>
    <summary>使用時機</summary>

    </details>

  <!-- 行為特性 -->

  - <details close>
    <summary>行為特性</summary>

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

  - [React as a UI Runtime]

---

## # 踩雷實錄

---

## # 延伸討論

- <details close>
  <summary></summary>

  </details>

---

## # 小記

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

  - 避免用來監聽一個 state 再去更新另一個 state

  - 避免用來處理使用者的事件

- 只在需要有識別度的 component 加上 `key={id}`
