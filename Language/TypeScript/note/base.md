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

[ts docs]: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
[google ts style guide]: https://google.github.io/styleguide/tsguide.html
[鐵人賽 1]: https://ithelp.ithome.com.tw/articles/10214714
[ecmascript 相容表]: https://kangax.github.io/compat-table/es6/
[tsconfig doc]: https://aka.ms/tsconfig

 <!-- ref -->

# TS 基礎

> DATE: 7 (2022)
> REF: [TS Docs] | [google TS style guide] | [鐵人賽 1]

 <!-- 工具 -->

- <details close>
     <summary>工具：</summary>

  - [ECMAScript 相容表]

    </details>

    </details>

## 0. 環境

- 安裝 TS

  ```shell
  $ npm install -g typescript
  ```

- 初始化 TS

  ```shell
  $ tsc --init
  ```

  - `tsc`：使用 **TS Compiler** 的指令
  - 生成設定檔 `tsconfig.json`
  - [tsconfig doc]

- 編譯 TS 成 JS

  ```shell
  $ tsc index.ts
  ```

  - 編譯 `index.ts`，並生成 `index.js`

  ```shell
  $ tsc
  ```

  - 掃描專案底下所有的 `.ts` 編譯生成對應的 `.js`
  - 以一個 `tsconfig.json` 為一個專案

  ```
  EX.

  project
  └── test1
      └── test1.ts
      └── tsconfig.json
  └── test2
      └── test2.ts
  └── test3.ts
  └── tsconfig.json

  ----------------------
  1)
  /project/
  $ tsc
  生成 test1.js, test2.js, test3.js

  2)
  /project/test1/
  $ tsc
  只生成 test1.js

  3)
  /project/test2/
  $ tsc
  生成 test1.js, test2.js, test3.js
  ```

## 1. 基本介紹

- Type Annotation

<!--  -->

- <details close>
  <summary></summary>

  -

  </details>

---

## 2. 其他補充

- 注意事項：

- 小技巧：
