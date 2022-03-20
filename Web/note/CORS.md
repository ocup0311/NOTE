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

[mdn]: https://developer.mozilla.org/zh-TW/docs/Web
[cors 完全手冊]: https://blog.huli.tw/2021/02/19/cors-guide-1/
[cors spec]: https://fetch.spec.whatwg.org/#http-cors-protocol
[simple request]: https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS#%E7%B0%A1%E5%96%AE%E8%AB%8B%E6%B1%82
[把 fetch mode 設成 no-cors]: https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors/43268098
[origin]: #為什麼會發生-cors-問題
[res.header]: http://expressjs.com/en/api.html#res.set
[example]: #解決非簡單請求-cors-問題
[2.2.1 - cors-safelisted method]: https://fetch.spec.whatwg.org/#cors-safelisted-method
[2.2.2. - cors-safelisted request-header]: https://fetch.spec.whatwg.org/#cors-safelisted-request-header
[使用 cors 與 cache 時的注意事項]: https://blog.huli.tw/2021/02/19/cors-guide-4/#使用-cors-與-cache-時的注意事項

<!-- ref -->

# CORS

> DATE: 3.2022
> REF: [CORS 完全手冊] | [MDN] | [CORS spec]

### AJAX & CORS

- **[Simple Request] (簡單請求)**: CORS 只擋 response 而不擋 request
    <details close>
    <summary>簡略條件：</summary>

  - <details close>
    <summary>使用基本方法</summary>

    - `GET`
    - `POST`
    - `HEAD`

    > [2.2.1 - CORS-safelisted method]

    </details>

  - <details close>
    <summary>無自訂的 header</summary>

    - `accept`
    - `accept-language`
    - `content-language`
    - `content-type`

    > [2.2.2. - CORS-safelisted request-header]

    </details>

  - <details close>
    <summary>Content-Type 三選一</summary>

    - `application/x-www-form-urlencoded`
    - `multipart/form-data`
    - `text/plain`

    </details>

</details>

- **Preflight Request (預檢請求)**: 若非 Simple Request，則自動生成 Preflight Request ( **OPTIONS** ) 先送出檢查，若沒過，則真正的請求就不會送出。
  <details close>
  <summary>簡略步驟：</summary>

  1. 瀏覽器自動生成兩個 Header：

  ```
  ex.
  Access-Control-Request-Headers: content-type
  Access-Control-Request-Method: POST
  ```

  2. 以 OPTIONS 方式發出請求

</details>

  <div class="imgBox" >
    <img src="../image/CORS/Preflight%20Request.png" alt="Discussion_array.png" />
  </div>

---

### 為什麼會發生 CORS 問題？

- **origin**：scheme + host + port

    <details close>
    <summary>ex： https://google.com</summary>
    
    - 名詞：
      - scheme：`https`
      - host：`google.com`
      - port：若沒有指定，預設 http：80, https：443
    - 同源： `https://google.com & https://google.com/api`
    - 不同源：
      1. `https://google.com & http://google.com`
      2. `https://google.com & https://google.com：3000`
      3. `https://google.com & https://api.google.com`
        **(domain & subdomain 不同源，可共用 Cookie)**
      4. `https://api.google.com & https://data.google.com`

    </details>

- domain & subdomain 不同源，但可共用 Cookie

- <details close><summary>image、CSS、script ..等等不擋</summary>

  - 載入後只有瀏覽器知道內容 (無法用程式讀取)
    --> 無法把結果外傳
    --> 較無資料外洩問題

  </details>

- CORS 是針對「在**瀏覽器**上寫 JS」(其他的是另一回事)

---

### 解決「簡單請求」 CORS 問題

<details close>
<summary>「治標」爛方法：</summary>

- 關掉瀏覽器的安全性設置
- [把 fetch mode 設成 no-cors]：
  我發 request 給 no-cors header 的資源，我不要 response
  --> 絕對沒有 response
- 不要用 AJAX 拿資料 (用 JSONP, JSON with Padding) - JSONP: script 標籤 - AJAX: XMLHttpRequest 或是 fetch
</details>

<details open>
<summary>「治本」方法：</summary>

- 請「後端」加上 **CORS header**

  - 設定 `Access-Control-Allow-Origin`
  - 只能設定一個 [origin] 或是 全部 ( \* )。多個需動態設定。

  <details close>
  <summary>ex. </summary>

  > REF： [res.header]>

  ```
  res.header('Access-Control-Allow-Origin', <ORIGIN || '*'>)
  ```

  </details>

- 使用 **proxy server**
  用 proxy server 幫你加上 CORS header

</details>

---

### 解決「非簡單請求」 CORS 問題

> 重點項目：
>
> 1. 非簡單請求（使用其他 HTTP method 與自定義 header）
> 2. 傳送 Cookie（如何讓跨來源請求也支援 Cookie）

- 請「後端」處理各種 Preflight Request (OPTIONS)

    <details close>
    <summary>處理因 content-type 引起</summary>

  - 設定 `Access-Control-Allow-Headers`，除了：
    - application/x-www-form-urlencoded
    - multipart/form-data
    - text/plain

  ***

  > REF： [res.header] | <[ORIGIN]>

  ```
  app.options('/form', (req, res) => {
    res.header('Access-Control-Allow-Origin', <ORIGIN || '*'>)
    res.header('Access-Control-Allow-Headers', 'content-type')
    res.end()
  })
  ```

    </details>

    <details close>
    <summary>處理 Cookie 需求</summary>

  - 跨來源請求，預設不會帶上 Cookie
  - Client 加入 `credentials: 'include'`
  - Server 設定 `Access-Control-Allow-Credentials` 為 true
  - `Access-Control-Allow-Origin` 不能是 \*，要指定 [origin]

  ***

  > REF： [res.header] | <[ORIGIN]>

  ```
  app.post('/form', (req, res) => {
    res.header('Access-Control-Allow-Origin', <ORIGIN>)
    res.header('Access-Control-Allow-Credentials', true)
  })

  app.options('/form', (req, res) => {
    res.header('Access-Control-Allow-Origin', <ORIGIN>)
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'content-type, X-App-Version')
    res.end()
  })
  ```

    </details>

    <details close>
    <summary>前端欲取得 response 自定義 Header</summary>

  - 設定 `Access-Control-Expose-Headers` (將該 Header 暴露)

  ***

  > REF： [res.header] | <[ORIGIN]>

  ```
  app.get('/', (req, res) => {
    res.header('X-List-Version', '1.3')
    res.header('Access-Control-Allow-Origin', <ORIGIN || '*'>)
    res.header('Access-Control-Expose-Headers', 'X-List-Version')
  })
  ```

    </details>

    <details close>
    <summary>使用其他 HTTP method</summary>

  - 設定 `Access-Control-Allow-Methods` (除了 GET、HEAD、POST)

  ***

  > REF： [res.header] | <[ORIGIN]>

  ```
  app.options('/form', (req, res) => {
    res.header('Access-Control-Allow-Origin', <ORIGIN || '*'>)
    res.header('Access-Control-Allow-Methods', 'PATCH')
    res.end()
  })
  ```

    </details>

    <details close>
    <summary>使 Preflight Response 被瀏覽器 Cache</summary>

  - 設定 `Access-Control-Max-Age` 的秒數，單位-秒

  ***

  > REF： [res.header] | <[ORIGIN]>

  ```
  app.options('/form', (req, res) => {
    res.header('Access-Control-Allow-Origin', <ORIGIN || '*'>)
    res.header('Access-Control-Max-Age', 300)
    res.end()
  })
  ```

    </details>

    <details close>
    <summary>不同 Origin 條件發送同請求時使用 Cache</summary>

  - 例如 `<img>` 與 `js fetch` 都對同一個來源發送 CORS Request
  - 方法 1: 設定 `Vary: Origin` ，針對不同 Origin 分辨 Cache
  - 方法 2: `<img>` 加上 `crossorigin="anonymous"`，使其帶上 Origin
  - 淮：Vary header 也要看防火牆有沒有通的樣子

  ***

  > REF： [res.header] | <[ORIGIN]> | [使用 CORS 與 Cache 時的注意事項]

  ```
  app.options('/form', (req, res) => {
    res.header('Access-Control-Allow-Origin', <ORIGIN || '*'>)
    res.header('Access-Control-Max-Age', 300)
    Vary: Origin
    res.end()
  })
  ```

    </details>

---

### 總結

- HTTP response to **CORS request** can include the following header: ([EXAMPLE])

  - Both

  1. `Access-Control-Allow-Origin`
  2. `Access-Control-Allow-Credentials`

  - **NON CORS-Preflight Request only**

  3. `Access-Control-Expose-Headers`

  - **CORS-Preflight Request only**

  4. `Access-Control-Allow-Methods`
  5. `Access-Control-Allow-Headers`
  6. `Access-Control-Max-Age`

### 其他

<details close><summary>待釐清</summary>

- 今天會有 same-origin policy 跟 CORS，是因為我們「在瀏覽器上寫 JS」，所以受到執行環境的限制。如果我們今天寫的是 Node.js，就完全沒有這些問題，想拿什麼就拿什麼，不會有人擋我們?
-

</details>
