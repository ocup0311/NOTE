###### <!-- ref -->

[DDoS 技術鑑賞]: https://youtu.be/7kB9-nQJR44
[mdn]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps
[徹底理解 xss]: https://iter01.com/577498.html
[防禦 xss]: https://kknews.cc/zh-tw/tech/j8bx8p.html
[nosql injection]: https://www.invicti.com/blog/web-security/what-is-nosql-injection/
[mongodb]: https://www.mongodb.com/docs/manual/faq/fundamentals/#how-does-mongodb-address-sql-or-query-injection
[injection in mongodb]: https://zanon.io/posts/nosql-injection-in-mongodb/
[預防 ddos]: https://kknews.cc/zh-tw/news/j4g6nyy.html
[aws shield]: https://aws.amazon.com/tw/shield/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc
[owasp top ten]: https://owasp.org/www-project-top-ten/
[vulnerability scanning tools]: https://owasp.org/www-community/Vulnerability_Scanning_Tools
[sql injection]: https://www.imperva.com/learn/application-security/sql-injection-sqli/
[owasp csrf]: https://owasp.org/www-community/attacks/csrf
[csrf1]: https://blog.techbridge.cc/2017/02/25/csrf-introduction/
[csrf2]: http://sj82516-blog.logdown.com/posts/1456564/site-form-to-send-security-configurations-using-recaptcha-with-csrf-token
[use of custom request headers]: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#use-of-custom-request-headers
[prototype pollution]: https://tech-blog.cymetrics.io/posts/huli/prototype-pollution/
[--disable-proto]: https://nodejs.org/api/cli.html#cli_disable_proto_mode
[官方 express middleware]: http://expressjs.com/en/resources/middleware.html
[error-first callbacks]: https://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/

 <!-- ref -->

# Server-Side Web

> DATE: 4 (2022)
> REF: [MDN]

<!-- 工具 -->

- <details close>
     <summary>工具：</summary>

  </details>

---

### 簡介：

<!-- server vs client -->

- <details close>
  <summary>server vs client</summary>

  - server-side：control what information is sent to the user
  - client-side：handle the structure and presentation of that data to the user

  </details>

<!-- 框架選擇： -->

- <details close>
  <summary>框架選擇：</summary>

  - 學習曲線

    - 使用語言
    - API 一致性
    - 文件品質
    - 社群活耀度

  - 開發速度 (Productivity)

    - 熟悉下，新增新功能、維護舊功能，所需時間

      - **目的/起源**：是否是為了解決特定問題所衍生的框架
      - **Opinionated**：固定推薦的寫法 vs 高彈性寫法(Express)
      - **Batteries included**：完整功能(Django) vs 輕量(Express)
      - **Good practices**：是否偏向某設計模式來設計 api

  - 效能 (Performance)

    - 一般較少考量

  - Caching support

    - 快取一些相同請求的 response
    - 通常可在 proxy, server, code, framework 等地方做不同程度的快取

  - 可擴展性 (Scalability)

    <!-- 考慮該框架是否適合各種擴展 -->

    - <details close>
        <summary>考慮該框架是否適合各種擴展</summary>

      - vertical scaling (垂直)：增強單一硬體設備
      - horizontal scaling (水平)：增多硬體設備
      - geographical scaling (地理)：改變主機地理位置

      </details>

  - 安全性 (Web security)

    - 考慮一些安全措施的預設值等等

  </details>

<!-- Express -->

- <details close>
  <summary>Express</summary>

  > REF: [官方 Express middleware]

  <!-- 描述： -->

  - <details close>
    <summary>描述：</summary>

    - 底層的 node 環境在單線程中使用輕量級多任務處理，而不是為每個 web 請求提供單獨的進程
    - the underlying node environment uses lightweight multitasking within a thread rather than spawning separate processes for every new web request

    </details>

  <!-- 特性： -->

  - <details close>
    <summary>特性：</summary>

    - unopinionated：較彈性、高度包容
    - middleware
    - [Error-First Callbacks]

    </details>

  <!-- 注意事項： -->

  - <details close>
    <summary>細節提醒：</summary>

    - `app.all("/", cb)`：所有種類的請求都包括，取代設定所有的 `app.get("/", cb)`, `app.post("/", cb)`,..., etc.

    - `express.Router()`：用來切 url (傾向於用 router 還是全部都寫完整 url？)

    - Middleware 是照順序進行的。
    - 支援所有 Node 支援的 DB

    <!-- call back： -->

    - <details close>
      <summary>call back：</summary>

      - Route：(req, res)
      - Middleware：(req, res, next)
      - Error：(err, req, res, next)

      </details>

    - Error Middleware 需最後 call，沒做則會把錯誤細節傳回 client

    - Http status code 需自行加入 Middleware 處理

    </details>

  </details>

<!-- Website security -->

- <details close>
  <summary>Website security</summary>

  > REF: [OWASP Top Ten]
  > 工具: [Vulnerability Scanning Tools]

  - 結論：不能相信任何來自於瀏覽器的資料 ＆ 所有資料都需消毒過濾

  <!-- XSS (Cross-Site Scripting) -->

  - <details close>
    <summary>XSS (Cross-Site Scripting)</summary>

    > REF: [徹底理解 XSS] | [防禦 XSS] | [Prototype Pollution]

    - 常見的攻擊
    - 使客戶端被嵌入 `client-side scripts`
      (可能獲得瀏覽器裡使用者的資訊)
    - 注意標籤：`<script>`, `<object>`, `<embed>`, `<link>`
    - input sanitization：server 的預防處理

    - 常見漏洞：

      - 前端程式碼漏洞：

        - DOM-Based XSS

      - 後端程式碼漏洞：

        <!-- Reflected XSS -->

        - <details close>
          <summary>Reflected XSS</summary>

          - 例如 url ?query 後面加 `<script>`

          </details>

        <!-- Persistent XSS (Stored XSS) -->

        - <details close>
          <summary>Persistent XSS (Stored XSS)</summary>

          - 例如留言板打 `<script>`

          </details>

      - 瀏覽器或外掛漏洞：

        <!-- Universal XSS (UXSS) -->

        - <details close>
          <summary>Universal XSS (UXSS)</summary>

          - 網站寫好也無法防

          </details>

      - 其他漏洞

        <!-- Mutation-based (mXSS) -->

        - <details close>
          <summary>Mutation-based (mXSS)</summary>

          - 例如 `innerHTML`

          </details>

      - 延伸：

        <!-- Prototype Pollution -->

        - <details close>
          <summary>Prototype Pollution</summary>

          - 解法：

            - 過濾 `__proto__` & `prototype`
            - 用 Object.create(null) 建立則沒有 prototype
            - 用 Map 取代 Object (Map 的 prototype 也是會被污染，例如改掉 `.get`)
            - `Object.freeze(Object.prototype)` 使凍結 Object.prototype，不可再更改
            - NodeJS [--disable-proto] 關掉 `__proto__`

          </details>

    </details>

  <!-- SQL injection -->

  - <details close>
    <summary>SQL injection</summary>

    <!-- SQL -->

    - <details close>
      <summary>SQL</summary>

      > REF: [SQL Injection]

      - 可能會給你含有 SQL 的 input，需要轉換特殊字元來預防
      - 種類：
        - In-band SQLi
          - Error-based SQLi
          - Union-based SQLi
        - Inferential (Blind) SQLi
          - Boolean
          - Time-based
        - Out-of-band SQLi

      ```
      EX.
      statement = `SELECT * FROM users WHERE name = '${userName}';`

      // [正常] 當 input userName = "A"
      SELECT * FROM users WHERE name = 'A';

      // [攻擊] 當 input userName = "A';DROP TABLE users; SELECT * FROM userinfo WHERE 't' = 't"
      SELECT * FROM users WHERE name = 'A';DROP TABLE users; SELECT * FROM userinfo WHERE 't' = 't';

      // [防守] 將特殊字元轉換
      SELECT * FROM users WHERE name = 'a\';DROP TABLE users; SELECT * FROM userinfo WHERE \'t\' = \'t';
      ```

      </details>

    <!-- NoSQL -->

    - <details close>
      <summary>NoSQL (TODO: 再 coding 確認一下)</summary>

      - TODO:
        - 確認 mogoose 做到什麼地步
        - 確認除了 `$where` 那類的，其他有沒有機會 MongoDB Injection

      > REF: [NoSQL Injection] | [MongoDB] | [Injection in MongoDB]

      - NoSQL 更危險，因為 SQL 用專用語法，但 NoSQL 是用各自的編寫語言來查詢 (e.g. javascript)，因此可用 Injection 做更多事。
      - MongoDB：

        - 使用 `BSON` 封裝資料，所以不會被 inject script，但有後門
        - 開放使用程式碼：`$where`, `mapReduce`, `$accumulator`, `$function`

      ```
      EX.
      db.collection.find( { $where: function() {
        return (this.name == $userData) } } );

      // [正常] 當 $userData = "A"
      db.collection.find( { $where: function() {
        return (this.name == 'A' ) } } );

      // [攻擊] 當 $userData = "A'; sleep(5000); '"
      db.collection.find( { $where: function() {
        return (this.name == 'A'; sleep(5000); '' ) } } );
      ```

      </details>

    </details>

  <!-- CSRF (Cross-Site Request Forgery) -->

  - <details close>
    <summary>CSRF (Cross-Site Request Forgery) (XSRF)</summary>

    > REF: [OWASP CSRF] | [CSRF1] | [CSRF2]

    - 不知道被攻擊者的資訊，完全是他自己送出給 Server
    - 使用者者點擊連結，送出 `攻擊者包裝好的 Request` + `使用者的 Cookie`
    - 解法：

      <!-- CSRF token -->

      - <details close>
        <summary>CSRF token</summary>

        - Server response form 時，附帶隱藏的 CSRF token，POST 之後，Server 比對是否 token 沒變

        </details>

      <!-- reCAPTCHA -->

      - <details close>
        <summary>reCAPTCHA</summary>

        - google 推出的「我不是機器人」防堵自動化填寫，也可防堵 CSRF

        </details>

      - 使用者自己輸入一個不存在 Cookie 的資料

      - Multi-Step Transactions

      <!-- client-side Double Submit Cookie -->

      - <details close>
        <summary>client-side Double Submit Cookie</summary>

        - Request 發送前，在 client 生成 token 存入 Cookie & Form，到 Server 時比對兩者

        </details>

      <!-- 部分瀏覽器支援 SameSite cookie -->

      - <details close>
        <summary>部分瀏覽器支援 SameSite cookie</summary>

        - 在 a.com 發送 b.com 的 request，則不帶 b.com cookie
        - Strict：嚴格，通通限制 (預設)
        - Lax：POST, PUT, DELETE, etc. 才會限制

        ```
        EX.
        Set-Cookie: session_id=123; SameSite=Lax
        ```

        </details>

      - [Use of Custom Request Headers] (最推薦？)

    </details>

  <!-- Other threats -->

  - <details close>
    <summary>Other threats</summary>

    <!-- Clickjacking (劫持) -->

    - <details close>
      <summary>Clickjacking (劫持)</summary>

      - 將官方嵌入 `<iframe>` 偽造成官方，騙使用者點擊你的按鈕
      - 解法：可設定成不可被嵌入 `<iframe>`

      </details>

    <!-- DoS (Denial of Service) -->

    - <details close>
      <summary>DoS (Denial of Service)</summary>

      - DDoS (Distributed Denial of Service)
      - 解法：
        - [預防 DdoS]
        - 強化防火墻，限制異常 IP
        - 提升設備規格，使有更多應對時間
        - 內部監控，異常流量警報
        - 過濾所有 RFC1918 IP 位址
        - 產品 [AWS Shield]
        - Trick：偵測到攻擊，塞廣告給他，攻擊越多賺越多
      - REF：
        - [DDoS 技術鑑賞]

      </details>

    <!-- Directory Traversal (File and disclosure) -->

    - <details close>
      <summary>Directory Traversal (File and disclosure)</summary>

      - 攻擊者嘗試訪問 Server 文件
      - 過濾 Client 傳送類似 `../../` 的內容

      </details>

    <!-- File Inclusion -->

    - <details close>
      <summary>File Inclusion</summary>

      - 解法：過濾傳送的 file

      </details>

    <!-- Command Injection -->

    - <details close>
      <summary>Command Injection</summary>

      - 解法：過濾可能會用在 command line 的 input

      </details>

    </details>

  </details>

<!-- 大圖 -->

![](../image/Server/simple_dynamic_website.png)

---

### 名詞：

---

### 其他：
