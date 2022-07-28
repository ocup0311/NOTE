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
[鐵人賽 2]: https://ithelp.ithome.com.tw/articles/10214719#:~:text=%22strictNullChecks%22%3A%20true%2C
[ts 變數 name]: https://www.jianshu.com/p/78268bd9af0a

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

<!-- 安裝 TS -->

- <details close>
  <summary>安裝 TS</summary>

  ```shell
  $ npm install -g typescript
  ```

  </details>

<!-- 初始化 TS -->

- <details close>
  <summary>初始化 TS</summary>

  ```shell
  $ tsc --init
  ```

  - `tsc`：使用 **TS Compiler** 的指令
  - 生成設定檔 `tsconfig.json`
  - [tsconfig doc]

  </details>

<!-- 編譯 TS 成 JS -->

- <details close>
  <summary>編譯 TS 成 JS</summary>

  - ```shell
    $ tsc index.ts
    ```

    - 編譯 `index.ts`，並生成 `index.js`

  - ```shell
    $ tsc
    ```

    - 掃描專案底下所有的 `.ts` 編譯生成對應的 `.js`
    - 以一個 `tsconfig.json` 為一個專案

      ```txt
      EX.

      ＊ Directory Structure:
      ---------------------------------

      project
      └── test1
          └── test1.ts
          └── tsconfig.json
      └── test2
          └── test2.ts
      └── test3.ts
      └── tsconfig.json
      ---------------------------------

      ＊ 在三種不同位置執行 "tsc":

      1) /project/
      $ tsc
      --> 生成 test1.js, test2.js, test3.js

      2) /project/test1/
      $ tsc
      --> 只生成 test1.js

      3) /project/test2/
      $ tsc
      --> 生成 test1.js, test2.js, test3.js
      ```

  </details>

## 1. 基本介紹

<!-- 型別檢查 -->

- <details close>
  <summary>型別檢查</summary>

  - 程式碼中，使用錯誤型別，會有 `紅色波浪狀底線` 標明錯誤資訊

  <div class="imgBox" >
    <img src="../src//image//base/%E5%9E%8B%E5%88%A5%E6%AA%A2%E6%9F%A5%EF%BC%BF%E7%A8%8B%E5%BC%8F%E7%A2%BC.png" alt="型別檢查＿程式碼.png" />
  </div>

  - 編譯時，也會拋出 error

  <div class="imgBox" >
    <img src="../src//image/base/%E5%9E%8B%E5%88%A5%E6%AA%A2%E6%9F%A5%EF%BC%BF%E7%B7%A8%E8%AD%AF.png" alt="型別檢查＿編譯.png" />
  </div>

  </details>

<!-- Type Annotation -->

- <details close>
  <summary>Type Annotation (註記)</summary>

  -

  </details>

<!-- Type Inference -->

- <details close>
  <summary>Type Inference (推論)</summary>

  - 在未使用 Type Annotation 時，也會自動推論其 type
  - 如下圖，變數並未註記 type，但 hover 時，有自動推論 type 為 `(string | number)[ ]`

    <div class="imgBox" >
      <img src="../src/image/base/Type_Inference_sample.png" alt="Type_Inference_sample.png" />
    </div>

  <!-- Nullable Types -->

  - <details close>
    <summary><code>Nullable Types</code> --> <code>any</code></summary>

    - Nullable Types: `null`, `undefined`.. 等等
      <div class="imgBox" >
        <img src="../src/image/base/Nullable_Types_O.png" alt="Nullable_Types_O.png" />
        <img src="../src/image/base/Nullable_Types_X.png" alt="Nullable_Types_X.png" />
      </div>

    - Delayed Initialization 可視為初始化指派為 `undefined` --> `any`
      <div class="imgBox" >
        <img src="../src/image/base/Nullable_Types_Delay.png" alt="Nullable_Types_Delay.png" />
      </div>

      - 若有 `Type Annotation` 則會形成 Temporal Dead Zone
        <div class="imgBox" >
          <img src="../src/image/base/Delayed_Initialization.png" alt="Delayed_Initialization.png" />
        </div>

    </details>

  <!-- 自動進行檢查 -->

  - <details close>
    <summary>Type Inference --> 自動進行檢查</summary>

    - 即使沒有 Type Annotation，TS 自動認定其為 Type Inference 後的型別

      - 因為 Nullable Types --> any，所以可以再指派為任何型別，而其他的則已固定型別

        <div class="imgBox" >
          <img src="../src/image/base/Type_Inference_check.png" alt="Type_Inference_check.png" />
        </div>

    </details>

  - <mark>杯論：</mark>
    - 因為有 Type Inference 功能，所以可以只在 `未立刻賦值` 或 `特殊需求的型別` 時，才使用 Type Annotation？

  </details>

<!-- 型別介紹 -->

- <details open>
  <summary>型別介紹</summary>

  <!-- Object -->

  - <details close>
    <summary>Object</summary>

    <!-- 當 key 值為 Nullable Types，其 Type Inference 會明確定義 type，而不是 any -->

    - <details close>
      <summary>當 key 值為 Nullable Types，其 Type Inference 會明確定義 type，而不是 any</summary>

        <div class="imgBox" >
          <img src="../src/image/base/Type_Inference_object.png" alt="Type_Inference_object.png" />
        </div>

      </details>

    <!-- & vs | -->

    - <details close>
      <summary><code>&</code> vs <code>|</code></summary>

      - `&`：必須都有
      - `|`：至少需有其中一個，剩下的 key 也必須包含在其他的 type

        <div class="imgBox" >
          <img src="../src/image/base/object_type_&_|.png" alt="object_type_&_|.png" />
        </div>

      </details>

    - <details close>
      <summary><code>type object</code> vs <code>自定義 object type</code> vs <code>Type Inference</code></summary>

      - `Type Inference` 較接近 `自定義 object type`
      - `type object`：可覆寫成任何 JS object (包含 [], new Number().. etc)，但不能對該 object 的內部做更動

        <div class="imgBox" >
          <img src="../src/image/base/object_type.png" alt="object_type.png" />
        </div>

      </details>

  </details>

---

## 2. 其他補充

- 暫記：

  - TypeScript 擴充型別：即 Enum 與 Tuple，內建在 TypeScript

- 注意事項：

  - `"strictNullChecks": true` 的優劣？

    - [鐵人賽 2] 建議 `true`
    - default `true`
    - `tru` 有什麼好處、什麼必要？

  - [TS 變數 name]

- 小技巧：
