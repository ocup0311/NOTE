##### <!-- 收起 -->

<!----------- ref start ----------->

[Golang 入門教學課程]: https://www.youtube.com/playlist?list=PL-g0fdC5RMbo9bdRzbKaCWYC2mXg2eEZE
[GoPlantUML]: https://github.com/jfeliu007/goplantuml
[Dumels]: https://www.dumels.com/diagram
[go Web 框架選擇]: https://learnku.com/articles/46853?order_by=vote_count&

<!------------ ref end ------------>

# Golang 基礎

> DATE: 7 (2024)
> REF: [Golang 入門教學課程]

## # 環境設定

---

## # 基本介紹

---

## # 基本方法

---

## # 特殊用法

---

## # 設計模式

---

## # 其他補充

- 注意事項：

- 小工具：

  <!-- 視覺化工具 -->

  - <details close>
    <summary>視覺化工具</summary>

    - 將 GoLang 專案的 code 生成 UML class diagram

      - [Dumels]
      - [GoPlantUML]

    </details>

- 小技巧：

- 延伸閱讀：

  - [go Web 框架選擇]

## # 延伸討論

- <details close>
  <summary></summary>

  </details>

---

## <mark>TODO:</mark> 待整理

- `package main`

  - 封包
  - 可執行的要用 main

- `func main{}`

  - 程式的進入點

- 強型別，一定要宣告型別

- 宣告預設賦值

  - `int`: 0
  - `string`: ""

- 語法

  - `:=`

    - 自動判斷型別，自動宣告型別
    - EX. 以下兩個相同，abc 會被自動宣告為 `int`，且賦值為 1

      ```go
      abc := 1
      var abc int = 1
      ```

  - `struct`

    - 習慣命名大寫開頭
    - EX.

      ```go
      type Person struct {
        name string
        age int
      }

      func main {
        var p1 Person = Person{ "Ocup", 18 }
        var p2 Person = Person{ age: 20, name: "May" }
      }
      ```

- function

  - 可能需要注意大小寫
  - 探討宣告函式的位置

    - 如 utility 中

      - package 中，即便只有一個 parent function 使用到的 child function，也會將 child 寫在外頭
      - child 寫在上，parent 寫在下
      - 因為記憶體來說外部是靜態分配 (global static)，內部是動態分配

    - 但更多時候須考量狀態與生命週期的設計

      - EX. clone pattern / api handler
      - EX. struct 內部，也會是靜態分配，且跟著物件的生命週期
      - EX. pure 的沒有狀態問題
      - EX. xx pool，就會統一由 pool 物件去管理狀態

- 其他

  - Variadic Functions

    - 不用固定參數數量
