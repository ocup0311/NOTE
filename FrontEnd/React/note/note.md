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

- [React 18 新功能之自動批次更新]

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

- React Hook Form

  - 將控制狀態交給瀏覽器，submit 時才更新 react 狀態
  - 因為一般來說，react 不需要知道這些狀態改變，只需要知道 submit 時才知道

- TODO: 研究扁平化後，是否影響效率，還是只有影響 setState 的便利性

  - [src](../src/code/state_struct.js)
