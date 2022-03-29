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

[ithome1]: https://ithelp.ithome.com.tw/articles/10191666
[w3c]: https://www.w3.org/TR/2003/NOTE-DOM-Level-3-Events-20031107/events.html#Events-phases
[非侵入式 javascript]: https://zh.wikipedia.org/wiki/%E9%9D%9E%E4%BE%B5%E5%85%A5%E5%BC%8FJavaScript

 <!-- ref -->

# DOM

> DATE: 3.2022
> REF: [iThome1]

- <details close>
     <summary>WIINDOW</summary>

  - <details close>
     <summary>Global Object</summary>

    ECMAScript 標準裡的「全域物件」- 在「全域作用範圍」宣告的全域變數無法使用 delete 移除

    ```
    EX.
    var a = 10
    console.log( window.a )   // 10
    delete window.a           // false
    console.log( window.a )   // 10

    window.b = 10
    console.log( window.b )   // 10
    delete window.b           // true
    console.log( window.b )   // undefined
    ```

    </details>

  - JavaScript 與瀏覽器的溝通窗口

  - BOM (Browser Object Model，瀏覽器物件模型)

    - Level 0 DOM
    - 用來溝通瀏覽器(不涉及網頁內容)
    - 瀏覽器各自實作

  - DOM (Document Object Model，文件物件模型)
    - 用來控制網頁內容
    - W3C 制定規範

  </details>

  <div class="imgBox" >
    <img src="../image/DOM/DOM_BOM.png" alt="DOM_BOM.png" />
  </div>

- <details close>
     <summary>EVENT</summary>

  > REF: [W3C]

  1. 事件捕獲 (Event Capturing)
  2. 事件冒泡 (Event Bubbling)

  <div class="imgBox" >
    <img src="../image/DOM/DOM_Event.png" alt="DOM_Event.png" />
  </div>

  </details>

- 注意事項：

  <!-- HTMLCollection & NodeList -->

  - <details close>
     <summary>HTMLCollection & NodeList</summary>

    - **HTMLCollection：**`getElementsBy**`

      - HTML element 節點

    - **NodeList：**`querySelectorAll`

      - HTML element 節點、文字節點、屬性節點 等

    - 不能使用 Array method，但可以用 index 存取。

    - 內容時效性：

      - 動態：大部分情況下
      - 靜態：`querySelector` & `querySelectorAll`

  </details>

  <!-- Event -->

  - <details close>
     <summary>Event</summary>

    - `.addEventListener(click)` & `.onclick`

      可以重複監聽多個 click，但 onclick 會被覆蓋。

    - [非侵入式 JavaScript]：
      **_(建議這樣嗎？ React 一樣嗎？)_**
      將 Javascript 從 HTML 抽離，避免在 HTML 中夾雜一堆 onchange、onclick 等去掛載 Javascript 事件，讓 HTML 與 Javascript 分離

      ```
      // (建議這樣嗎？ React 一樣嗎？?)
      X:
      <button onclick="fn()">Click</button>

      O:
      <button id="btn">Click</button>

      var btn = document.getElementById('btn')
      btn.onclick = fn
      ```

  </details>

  <!-- addEventListener & addEventListener -->

  - <details close>
     <summary>addEventListener & addEventListener</summary>

    - 透過 `removeEventListener` 解除時，必須跟 `addEventListener` 綁定同一個 handler「實體」。

    ```
    X: 並未移除事件
    btn.addEventListener('click', ()=>console.log('HI'))
    btn.removeEventListener('click', ()=>console.log('HI'))

    O: 正確移除事件
    const fn = ()=>console.log('HI')
    btn.addEventListener('click', fn)
    btn.removeEventListener('click', fn)
    ```

  </details>

- 小技巧：

  - `createDocumentFragment`：大量變動 DOM 時，先在 DocumentFragment 操作，最後再一次更改 DOM，節省 **reflow** 次數。
