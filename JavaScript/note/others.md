<!-- 暫存，之後再整理分類 -->

###### <!-- ref -->

[hoisting]: https://blog.techbridge.cc/2018/11/10/javascript-hoisting/

<!-- ref -->

# [for await...of vs Promise.all](https://stackoverflow.com/questions/59694309/for-await-of-vs-promise-all)

> DATE: 2.2022
> MORE: [ref](https://coderwall.com/p/kvzbpa/don-t-use-array-foreach-use-for-instead)

> Using for loops is easy enough sure, in most cases.. but your overlooking the entire point of map, forEach, filter, reduce, find, findIndex, etc... These make use of functional paradigms, and these paradigms exist for a reason. Functional programming is all about focusing not on how to solve problems and instead, shifts your focus to what to solve. Beyond that, anyone who is worried about performance at this level can go back after they've built their app and measure the app's performance and decide where to optimize (and I will bet you will find most of your optimizations will not be refactoring map, filter, or reduce). Using for loops is like going backwards, not to mention that forEach is slow because it is modifying/mutating the original array, whereas .map() returns a new array, is much faster, and without the side effect of mutating the original array. There are fewer and fewer cases where a for loop is viable. Currently, the best use case would be for something like iterating an async generator function using the new for-await-of syntax. Which is super cool. My point is that javascript gives us first class functions and in combination with it's (sorta) functional paradigms can produce: more readable code, better tooling, composition and patterns like higher order functions and currying, beautiful immutability, and many other wins such as referential transparency with pure functions - which reduce side effects and can increase run time, especially if memoized etc... Although I say "sorta" as obviously you're going to need functions with side effects to make API calls, or logs, or write i/o (any function that has I/O).

# [How to Build a Node.js Error-handling System](https://www.toptal.com/nodejs/node-js-error-handling)

> DATE: 2.2022

# [JavaScript Runtime](https://github.com/Fandix/Fandix.github.io-/blob/main/source/_posts/NodeJS/how-dose-javascript-work.md)

> DATE: 2.2022

> TurboFan 是一個 優化編譯器 (optimization compiler) ，可以在應用程式運行時在後台 (單獨的線程)中不斷優化 bytecode 或 machine code，這些被非常優化的 bytecode 或 machine code 會把 Ignition 產生的未優化的程式替換掉。

> 處理非同步任務: browser - WebAPIs Nodejs - libuv

> 所以以架構層面來說，NodeJS 就是一個基於 V8 engine 提供地 Javascript 標準規範語法，加上由 C++ 撰寫的 libuv 來擴充 Javscript 沒有提供的操作電腦系統操作。

# [Why RxJS? RxJS vs Promises](https://javascript.plainenglish.io/why-rxjs-rxjs-vs-promises-b28962771d68)

> DATE: 2.2022

> While Promises execute on creation, Observables won’t start to execute until we want them to start.

> - One library for many purposes. We can use one library to work with any type of data using the same operators. e.g. multiple data sources, events emitters, and APIs.
> - Composition. It is possible to combine data from several sources as we like.
> - Watchful. RxJS can produce multiple values over time and it uses a push model to notify us when specific events occur. This allows for reactive programming as it is possible to watch and react to users' actions and changes.
> - Lazyness. Evaluation doesn’t start until subscription.
> - Built-in errors handling
>   Cancellable. Unlike Promises, it is possible to cancel async actions.

# [Vite 淺入淺出](https://www.gushiciku.cn/pl/gxv8/zh-tw)

# [LHS vs RHS](https://ithelp.ithome.com.tw/articles/10202146)

> DATE: 3.2022 REF: [Hoisting]

- 查找 (look up)

  - LHS (left-hand side)：

    > 請幫我去查**左邊**這個變數的位置在哪裡，因為我要對它賦值。

    - 查找是否有宣告左邊變數？
      未宣告 --> **ReferrenceError**

      ```
      EX.  (前提：嚴格模式下)

      a = b

      a 未宣告
      --> ReferrenceError
      ```

    - 查找是否可以賦值給左邊變數？
      不能賦值 --> **TypeError**

      ```
      EX.  (前提： const a = 1)

      a = 2

      a 不能賦值
      --> TypeError
      ```

    - 賦予值到左邊的變數上

  - RHS (right-hand side)：

    > 請幫我查詢**右邊**這個變數的值是什麼，因為我要用這個值。

    - 查找是否有宣告右邊變數？
      未宣告 --> **ReferrenceError**

      ```
      EX.

      let a = b

      b 未宣告
      --> ReferrenceError
      ```

    - 是否可對右邊變數執行某動作？
      不能執行 --> **TypeError**

      ```
      EX.  (前提： fn = 1)

      fn()

      fn 不可當 function 執行
      --> TypeError
      ```

    - 從右邊的變數上取值並執行
