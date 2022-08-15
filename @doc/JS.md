 <!-- note the specification for js code -->

# 目錄

> [命名](#命名)
> --- [#縮寫](#縮寫)
> --- [#註記](#註記)
> --- [#函數](#函數)
>
> [Function](#Function)
> --- [情境 1](#情境-1)

# 命名

## #縮寫

- `N`: 自然數、正整數
- `Z`: 整數
- `Q`: 有理數（分數）
- `R`: 實數（根號）
- `C`: 複數（i）
- `arr`: array
- `str`: string
- `temp`: temporary value
- `ptr`: pointer

---

## #註記

- `main`: 主程式
- `exception`: 先回傳的例外
- `var`: 變數
- `function`: 函式
- `run`: 開始執行
- `test`: 測試

---

## #函數

### get-

- 取得 常數、info、等等
- `ex. 'getSomeInfo'`

### make-

- 產生 亂數、等等
- `ex. 'makeRandomInt'`

### built-

- 產生 instance、function、等等
- `ex. 'builtInput'`

### to-

- 除上述外，其他 function
- `ex. 'toSortNumber'`

---

# Function

### 情境 1

```javascript
// which one is better if the fn2 & fn3 are only use by fn1?
// A:
function fn1() {
  function fn2() {}
  function fn3() {}

  fn2()
  fn3()
}

// B:
function fn2() {}
function fn3() {}
function fn1() {
  fn2()
  fn3()
}
```
