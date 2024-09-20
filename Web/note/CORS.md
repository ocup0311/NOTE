###### <!-- 收起 -->

<!-- ref -->

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
[api gateway cors]: https://docs.aws.amazon.com/zh_tw/apigateway/latest/developerguide/how-to-cors-console.html

# CORS

> DATE: 3 (2022)
> UPDATE: 9 (2024)
> REF: [CORS 完全手冊] | [MDN] | [CORS spec] | [API Gateway CORS]

### # AJAX & CORS

- **[Simple Request] (簡單請求)**: CORS 只擋 response 而不擋 request

  <!-- 簡略條件 -->

  - <details close>
    <summary>簡略條件(<code>＠所列為白名單</code>)：</summary>

    <!-- 使用基本方法 -->

    - <details close>
      <summary>使用基本方法</summary>

      - `GET`
      - `POST`
      - `HEAD`

      > [2.2.1 - CORS-safelisted method]

      </details>

    <!-- 無自訂的 header -->

    - <details close>
      <summary>無自訂的 header</summary>

      - `accept`
      - `accept-language`
      - `content-language`
      - `content-type`

      > [2.2.2. - CORS-safelisted request-header]

      </details>

    <!-- Content-Type 三選一 -->

    - <details close>
      <summary>Content-Type 三選一</summary>

      - `application/x-www-form-urlencoded`
      - `multipart/form-data`
      - `text/plain`

      </details>

    </details>

- **Preflight Request (預檢請求)**: 若非 Simple Request，則自動生成 Preflight Request ( **OPTIONS** ) 先送出檢查，若沒過，則真正的請求就不會送出。

  <!-- 簡略步驟： -->

  - <details close>
    <summary>簡略步驟：</summary>

    1. 瀏覽器自動生成兩個 Header：

    ```
    ex.
    Access-Control-Request-Headers: content-type
    Access-Control-Request-Method: POST
    ```

    2. 以 OPTIONS 方式發出請求

    </details>

  ![](../image/CORS/Preflight%20Request.png)

---

### # 為什麼會發生 CORS 問題？

<!-- origin：scheme + host + port -->

- **origin**：scheme + host + port

  <!-- ex： https://google.com -->

  - <details close>
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

<!-- domain & subdomain 不同源，但可共用 Cookie -->

- domain & subdomain 不同源，但可共用 Cookie

<!-- image、CSS、script ..等等不擋 -->

- <details close><summary>image、CSS、script ..等等不擋</summary>

  - 載入後只有瀏覽器知道內容 (無法用程式讀取)
    --> 無法把結果外傳
    --> 較無資料外洩問題

  </details>

<!-- CORS 是針對「在 瀏覽器 上寫 JS」(其他的是另一回事) -->

- CORS 是針對「在`瀏覽器`上寫 JS」(其他的是另一回事)

  - 主要是針對使用瀏覽器的一般使用者，盡可能避免他們人為上的失誤造成的資安問題。同時也讓瀏覽器在保有安全性下，提供更多便利功能

---

### # 解決「簡單請求」 CORS 問題

<!-- 「治標」爛方法： -->

- <details close>
  <summary>「治標」爛方法：</summary>

  - 關掉瀏覽器的安全性設置
  - [把 fetch mode 設成 no-cors]：
    我發 request 給 no-cors header 的資源，我不要 response
    --> 絕對沒有 response
  - 不要用 AJAX 拿資料 (用 JSONP, JSON with Padding) - JSONP: script 標籤 - AJAX: XMLHttpRequest 或是 fetch

  </details>

<!-- 「治本」方法： -->

- <details open>
  <summary>「治本」方法：</summary>

  <!-- 請「後端」加上 CORS header -->

  - <details close>
    <summary>請「後端」加上 <b>CORS header</b></summary>

    - 設定 `Access-Control-Allow-Origin`
    - 只能設定一個 [origin] 或是 全部 ( \* )。多個需動態設定。

    > REF： [res.header]>

    ```
    res.header('Access-Control-Allow-Origin', <ORIGIN || '*'>)
    ```

    </details>

  <!-- 使用 proxy server -->

  - <details close>
    <summary>使用 <b>proxy server</b></summary>

    - 用 proxy server 幫你加上 CORS header
    - 因為 CORS 只發生在`前端`跟後端要資料的情況（proxy server 跟 server 之間不會產生 CORS）

    </details>

  </details>

---

### # 解決「非簡單請求」 CORS 問題

> 重點項目：
>
> 1. 非簡單請求（使用其他 HTTP method 與自定義 header）
> 2. 傳送 Cookie（如何讓跨來源請求也支援 Cookie）

- 請「後端」處理各種 Preflight Request (OPTIONS)

  <!-- 處理因 content-type 引起 -->

  - <details close>
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

  <!-- 處理 Cookie 需求 -->

  - <details close>
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

  <!-- 前端欲取得 response 自定義 Header -->

  - <details close>
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

  <!-- 使用其他 HTTP method -->

  - <details close>
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

  <!-- 使 Preflight Response 被瀏覽器 Cache -->

  - <details close>
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

  <!-- 不同 Origin 條件發送同請求時使用 Cache -->

  - <details close>
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

### # 總結

- HTTP response 處理 CORS request 需要使用的 header: ([EXAMPLE])

  - Both

    1. `Access-Control-Allow-Origin`
    2. `Access-Control-Allow-Credentials`

  - **NON CORS-Preflight Request only**

    3. `Access-Control-Expose-Headers`

  - **CORS-Preflight Request only**

    4. `Access-Control-Allow-Methods`
    5. `Access-Control-Allow-Headers`
    6. `Access-Control-Max-Age`

---

### # 其他 Cross-Origin 措施

<!-- CORB (Cross-Origin Read Blocking) -->

- <details close>
  <summary>CORB (Cross-Origin Read Blocking)</summary>

  - 起因：為了避免 Spectre 攻擊

  - 行為特性

    - 瀏覽器內建的機制
    - 判斷 `MIME Type` 與 `HTML tag` 是否相符，不合理則不會載入 render process (EX. `<img> 不能載入 JSON`)

      - 可透過 `Content-Type` 或 `MIME Sniffing` 判斷 `MIME Type`
      - `MIME Sniffing`：瀏覽器預先載入該檔案的前面小部分 (約 256, 512 byte) 來判斷 `MIME Type`

    - 主要想保護 HTML、XML、JSON，不讓被載入到跨來源的 render process，就不會被 Spectre 攻擊

  - 推薦做法

    - 用以下方式關閉瀏覽器的 `MIME Sniffing`
    - res header 設置 `X-Content-Type-Options: nosniff`，並將所有 `Content-Type` 都設定正確

  - 其他補充

    - `Spectre`：攻擊某些`預先執行`行為造成的儲存在 cache、memory 等的資料

  </details>

<!-- CORP (Cross-Origin Resource Policy) -->

- <details close>
  <summary>CORP (Cross-Origin Resource Policy)</summary>

  - 行為特性

    - 行為類似於「資源版的 CORS」
    - 用來設定哪些 origin 可以下載該資源
    - 透過 `<img>` 等標籤下載資源，也受 CORP 限制

  - `Cross-Origin-Resource-Policy`

    - `same-origin`
    - `same-site`
    - `cross-origin`

  - 其他補充

    - 可搭配判斷是否 client 是透過各 browser 而來

  </details>

<!-- COEP (Cross-Origin-Embedder-Policy) -->

- <details close>
  <summary>COEP (Cross-Origin-Embedder-Policy)</summary>

  - 行為特性

    - 指定是否一定要設定 CORP

  - `Cross-Origin-Embedder-Policy`

    - `require-corp`：設定後，強迫所有資源都必須設定 CORP
    - `unsafe-none`

  </details>

<!-- COOP (Cross-Origin-Opener-Policy) -->

- <details close>
  <summary>COOP (Cross-Origin-Opener-Policy)</summary>

  - 行為特性

    - 用來設定能使用 `window.open`、`iframe` 的 origin 範圍限制

  - `Cross-Origin-Opener-Policy`

    - `unsafe-none`：可以隨便使用，但只限於 `window.location`、`window.close()` 等方法
    - `same-origin`：開啟與被開啟者都必須有設定一樣的 COOP
    - `same-origin-allow-popups`：只要求 same-origin，而不要求被開啟者的 COOP 設定
    - `same-origin-plus-coep`

  </details>

<!-- `Site Isolation` vs `cross-origin isolated state` -->

- <details close>
  <summary><code>Site Isolation</code> vs <code>cross-origin isolated state</code></summary>

  <!-- Site Isolation -->

  - <details close>
    <summary>Site Isolation</summary>

    - 在 browser 設定，預設通常是開啟

    - 確保 same site 才能用同一個 process

      - 不同分頁，同 origin 也可能只開一個 process

    </details>

  <!-- cross-origin isolated state -->

  - <details close>
    <summary>cross-origin isolated state</summary>

    - 由 server 設定

      - `Cross-Origin-Embedder-Policy: require-corp`
      - `Cross-Origin-Opener-Policy: same-origin`

    - 確保 same-origin 才能用同一個 browsing context group (BCG)

      - BCG 範圍更小，同 BCG 一定同 process
      - 同 BCG 才能共用 memory

    </details>

  </details>
