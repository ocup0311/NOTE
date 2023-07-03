###### <!-- ref -->

[Visualizing memory management in V8 Engine]: https://deepu.tech/memory-management-in-v8/
[A tour of V8: Garbage Collection]: https://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection
[C 語言記憶體]: https://blog.gtwang.org/programming/memory-layout-of-c-program/
[V8 引擎與 JIT 原理]: https://juejin.cn/post/7179130165262286885
[從 Node.js 專案裡找出 Memory leak]: https://vocus.cc/article/61176c17fd89780001942f1c
[Guide: How To Inspect Memory Usage in Node.js]: https://www.valentinog.com/blog/node-usage/
[worker.cc]: https://github.com/nodejs/node/blob/921493e228/src/node_worker.cc
[深入理解 node.js worker threads]: https://zhuanlan.zhihu.com/p/167920353
[udemy]: https://www.udemy.com/course/understand-nodejs/
[level of abstraction]: ../src/image/Node/Level_of_Abstraction.png
[how to jit(just in time)]: https://eli.thegreenplace.net/2013/11/05/how-to-jit-an-introduction
[node/deps/v8/]: https://github.com/nodejs/node/tree/1aabfa8732fb438cdcee21e81d389bcab28d2460/deps/v8
[node/src]: https://github.com/nodejs/node/tree/master/src
[node/lib]: https://github.com/nodejs/node/tree/master/lib
[tracking issue: process.binding to internalbinding]: https://github.com/nodejs/node/issues/22160
[node 内部工作原理解析]: https://www.jianshu.com/p/a8f5a8cdc6ab
[REF1]: https://www.udemy.com/course/understand-nodejs/learn/lecture/3453110
[完整圖解 Node.js 的 Event Loop(事件迴圈)]: https://notes.andywu.tw/2020/%E5%AE%8C%E6%95%B4%E5%9C%96%E8%A7%A3node-js%E7%9A%84event-loop%E4%BA%8B%E4%BB%B6%E8%BF%B4%E5%9C%88/

<!-- ref -->

# Learn and Understand NodeJS

> DATE: 3 (2022)
> REF: [Udemy]

## # V8 Javascript Engine

#### 1. Processors, Machine Language, and C++

<!-- Microprocessor 簡介 -->

- <details close>
  <summary>Microprocessor</summary>

  - 使用 Machine code (Machine language)
  - 現流行的有：IA-32 or x86-64 or ARM or MIPS

  </details>

<!-- 以 C syntax 設計 -->

- <details close>
  <summary>以 C syntax 設計</summary>

  - JS or JAVA were inspired by what's called <code>C syntax</code>

  </details>

<!-- 底層為 C++ 實作 -->

- <details close>
  <summary>底層為 C++ 實作</summary>

  - `V8`(the JS engine) 跟 `Node`(add onto V8) 都是由 C++ 實作

  </details>

<!-- Level of Abstraction -->

- <details close>
  <summary>Level of Abstraction</summary>

  - JS
  - C/C++ (feature-filled programming language)
  - Assembly language (組合語言)
  - Machine code
  - Microprocessor

  (圖註：箭頭應該反過來？) [REF1]
  ![Level of Abstraction]

  </details>

<!-- JS -> machine code -->

- <details close>
  <summary>JS --> machine code</summary>

  - C++ is compiled into machine code by a C++ compiler.
  - V8 is written in C++. It converts JS directly to machine code.
  - NodeJS lets JS get access to extra functionality written in C++.

  </details>

#### 2. Javascript Engines and The ECMAScript Specification

- ECMAScript is the standard specification that says how the JS should work.

#### 3. V8 Under The Hood

<!-- V8 is used in Chrome and in Node.js -->

- <details close>
  <summary>V8 用在 Chrome、Node.js ..等</summary>

  - 程式碼：[node/deps/v8/]
  - V8 is used in Chrome and in Node.js, among others. It implements ECMAScript and WebAssembly, and runs on Windows 7 or later, macOS 10.12+, and Linux systems that use x64, IA-32, ARM, or MIPS processors.

  </details>

<!-- V8 可嵌入 C++ application -->

- <details close>
  <summary>V8 可嵌入 C++ application</summary>

  - 可以將 V8 嵌入 C++ application，就可以用 C++ 開發更多功能給 JS 使用 (EX. fs)

  </details>

<!-- V8 實作 JIT(Just In Time) -->

- <details close>
  <summary>V8 實作 JIT(Just In Time)</summary>

  - V8 中，含有編譯器，達成 JIT

    - (1) 在 runtime 將程式碼轉成 machine code
    - (2) 在 runtime 執行 machine code

  - 常用的程式碼會被標記為 Hot，並以 Optimized Machine Code 保存在 memory，不常用後再降級

  - REF
    - [V8 引擎與 JIT 原理]
    - [How to JIT(Just In Time)]

  </details>

---

## # Node Core

<!-- Node Repo -->

- <details close>
  <summary>Node Repo</summary>

  - REF: [Node 内部工作原理解析]

  ![Nodejs_repo_code.png](../src/image/Node/Nodejs_repo_code.png)

  </details>

<!-- JS Server 所需要做的事 -->

- <details close>
  <summary>JS Server 所需要做的事</summary>

  - 操作 File
  - 與 Database 溝通
  - 連結其他網路
  - 接收 Requests, 發送 Responses
  - 處理需要花大量時間的工作 (async)

  </details>

<!-- C++ Core -->

- <details close>
  <summary>C++ Core</summary>

  - 程式碼：[node/src]

  </details>

<!-- JS Core -->

- <details close>
  <summary>JS Core</summary>

  - 程式碼：[node/lib]

  - 包含將 C++ feature 包裝成 JS

    - `process.binding()` (已棄用，改為 `internalBinding()`)

      - 用來連結，將 C++ feature，包裝成 JS feature
      - C++ 端以 `setMethod()` 導出，JS 端以 `internalBinding()` 調用
      - Node.js internal code only.
      - Deprecated. Please use public APIs instead. (DEP0111)
      - [Tracking Issue: process.binding to internalBinding]

  - 用 JS 開發的更多功能 (也可自己用 JS 開發)

  </details>

---

## # Modules, Exports, and Require

<!-- First Class Function -->

- <details close>
  <summary>First Class Function</summary>

  - 可被當作參數傳入、當作回傳值、賦值給變量、存儲在資料結構中
  - Functional programming 必備桃件

  </details>

<!-- Immediately Invoked Function Expressions (IIFEs) -->

- <details close>
  <summary>IIFEs</summary>

  - Immediately Invoked Function Expressions (IIFEs)
  - 可以立刻執行的 function

  ```javascript
  // EX.
  ;(() => {})()
  ```

  </details>

---

## # NPM

- Because the tool isn't installed globally we can't launch it from the command line (unless we add it to the path) but we can call it from an NPM script because NPM knows all about the installed packages.

---

## # 延伸閱讀 (基礎)

<!-- Worker Threads -->

- <details close>
  <summary>Worker Threads</summary>

  - REF: [深入理解 Node.js Worker Threads]

  - Worker Threads 簡單說是，透過 [worker.cc]，再開一個 nodejs runtime 給他用

  </details>

<!-- Event Loop -->

- <details close>
  <summary>Event Loop</summary>

  - REF: [完整圖解 Node.js 的 Event Loop(事件迴圈)]

  - 需注意，v10.0.0 左右有改版，優先度略有不同
  - 非同步丟去 Queue，同步先執行完全部後，再依下述優先度查看執行，直到 Queue 清空
  - Sync --> microTask Queue --> nextTick Queue --> macrotask queue(Check --> Timers)

  ![](../src/image/Node/Nodejs_Event_Loop.png)

  </details>

<!-- Memory -->

- <details close>
  <summary>Memory</summary>

  - REF

    - [Visualizing memory management in V8 Engine]
    - [Guide: How To Inspect Memory Usage in Node.js]
    - 對照 [C 語言記憶體]

  ![V8_memory.png](../src/image/Node/V8_memory.png)

  </details>

<!-- Garbage Collection -->

- <details close>
  <summary>Garbage Collection</summary>

  - REF: [A tour of V8: Garbage Collection]

  </details>

---

## # 延伸閱讀 (方法)

- <details close>
  <summary>處理 Memory leak</summary>

  - [從 Node.js 專案裡找出 Memory leak]

  </details>

---

- <details close>
  <summary></summary>

  </details>
