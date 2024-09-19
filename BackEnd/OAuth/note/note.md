##### <!-- 收起 -->

<!----------- ref start ----------->

[OAuth 2.0 系列文]: https://blog.yorkxin.org/posts/oauth2-1-introduction/
[使用 OAuth 2.0 存取 Google API]: https://developers.google.com/identity/protocols/oauth2?hl=zh-tw
[OAuth 2.0]: https://oauth.net/2/
[各大網站 OAuth 2.0 實作差異]: https://blog.yorkxin.org/posts/oauth2-implementation-differences-among-famous-sites/
[OAuth 2.0 筆記 (7) 安全性問題]: https://blog.yorkxin.org/posts/oauth2-7-security-considerations/
[OAuth 2.0 筆記 (6) Bearer Token 的使用方法]: https://blog.yorkxin.org/posts/oauth2-6-bearer-token/
[OAuth 2.0 筆記 (5) 核發與換發 Access Token]: https://blog.yorkxin.org/posts/oauth2-5-issuing-tokens/
[OAuth 2.0 筆記 (4.4) Client Credentials Grant Flow 細節]: https://blog.yorkxin.org/posts/oauth2-4-4-client-credentials-grant-flow/
[OAuth 2.0 筆記 (4.3) Resource Owner Password Credentials Grant Flow 細節]: https://blog.yorkxin.org/posts/oauth2-4-3-resource-owner-credentials-grant-flow/
[OAuth 2.0 筆記 (4.2) Implicit Grant Flow 細節]: https://blog.yorkxin.org/posts/oauth2-4-2-implicit-grant-flow/
[OAuth 2.0 筆記 (4.1) Authorization Code Grant Flow 細節]: https://blog.yorkxin.org/posts/oauth2-4-1-auth-code-grant-flow/
[OAuth 2.0 筆記 (3) Endpoints 的規格]: https://blog.yorkxin.org/posts/oauth2-3-endpoints/
[OAuth 2.0 筆記 (2) Client 的註冊與認證]: https://blog.yorkxin.org/posts/oauth2-2-cilent-registration/
[OAuth 2.0 筆記 (1) 世界觀]: https://blog.yorkxin.org/posts/oauth2-1-introduction/

<!------------ ref end ------------>

# OAuth 2.0

> DATE: 9 (2024)
> REF: [OAuth 2.0] | [使用 OAuth 2.0 存取 Google API] | [OAuth 2.0 系列文]

### # 名詞介紹

<!-- Resource Owner -->

- <details close>
  <summary>Resource Owner</summary>

  - 可授權存取 Protected Resource 的角色
  - EX. User

  </details>

<!-- Resource Server -->

- <details close>
  <summary>Resource Server</summary>

  - 存放 Protected Resource 的地方 (別人透過有效的 Access Token 來此取得)
  - 可以透過向 Authorization Server 或獨立的 Introspection Endpoint 確認 Access Token 有效性
  - 也可以透過公鑰或共享密鑰，直接解碼 Access Token (但會無法執行撤銷，只能等待到期)
  - EX. Google 存使用者資料的地方

  </details>

<!-- Client -->

- <details close>
  <summary>Client</summary>

  - 透過有效的 Access Token，代替 Resource Owner 去向 Resource Server 取得 Protected Resource 的應用程式
  - 在此並非指前端，而是指那個第三方應用程式

  </details>

<!-- Authorization Server -->

- <details close>
  <summary>Authorization Server</summary>

  - 負責驗證身份，並核發 Access Token 的 server
  - 可以與 Resource Server 是同一個，也可以是不同個。也可以搭配數個 Resource Server
  - EX. Google 驗證授權的 server

  </details>

<!-- Authorization grant -->

- <details close>
  <summary>Authorization grant</summary>

  - Authorization Code

  </details>

<!-- Access Token -->

- <details close>
  <summary>Access Token</summary>

  - 具體的 string，通常包含： `Expire time` (時效性)、`Scope` (存取範圍)、`Token Type`
  - 使用 `HTTPS`、常用 `JWT` 格式、放在 HTTP `Authorization` Header
  - EX.

    ```txt
    GET /resource/1 HTTP/1.1
    Host: example.com
    Authorization: Bearer mF_9.B5f-4.1JqM
    ```

  </details>

<!-- Refresh Token -->

- <details close>
  <summary>Refresh Token</summary>

  - 代替 Resource Owner 授權 Client 可以重新取得新的 Access Token，而不需要再度請求 Resource Owner 的授權
  - Client 可以在 Access Token 到期時，自動使用 Refresh Token 去取得新的 Access Token (避免打斷 Owner 的體驗)
  - EX. 使用 Client Secret Basic 發送 Refresh 請求方式

    ```txt
    POST /token HTTP/1.1
    Host: server.example.com
    Authorization: Basic czZCaGRSa3F0Mzo3RmpmcDBaQnIxS3REUmJuZ1ZkbUl3
    Content-Type: application/x-www-form-urlencoded

    grant_type=refresh_token
    &refresh_token=tGzv3JOkF0XG5Qx2TlKWIA
    ```

  </details>

### # 內建授權流程 (Grant Flow)

<!-- Authorization Code Grant Flow -->

- <details close>
  <summary>Authorization Code Grant Flow</summary>

  - 情境：適合有分前端、後端的應用
  - 簡介：前端取得 Code，後端透過 Code 取得 Access Token

  <!-- 注意： -->

  - <details close>
    <summary>注意：</summary>

    - OAuth 2.1 強制要求以 `PKCE` (Proof Key for Code Exchange) 進行
    - Authorization Code 為一次性使用、建議時效最長 10 min
    - Access Token Request 所附上的 `Redirection URI` 一定要與 Authorization Code Request 附上的一樣，以用來驗證 (只有在 Authorization Code Request 時，是用來重定向)
    - Redirection URI 通常是一個`後端 URI`，負責用來處理 Access Token 的部分，在使用者體驗上可以先回覆給使用者一個 loading 畫面

    </details>

  <!-- 圖解： -->

  - <details close>
    <summary>圖解：</summary>

    ![](../src/image/Authorization_Code_Flow.png)

    </details>

  </details>

<!-- Client Credentials Grant Flow -->

- <details close>
  <summary>Client Credentials Grant Flow</summary>

  - 情境：主要用於內部 machine-to-machine
  - 簡介：內部機器不經手用戶，直接請求 Access Token

  <!-- 注意： -->

  - <details close>
    <summary>注意：</summary>

    - 強制要求 Authorization Server 必須認證 Client
    - 建議不使用 Refresh Token

    </details>

  <!-- 圖解： -->

  - <details close>
    <summary>圖解：</summary>

    ![](../src/image/Client_Credentials_Flow.png)

    </details>

  </details>

<!-- Device Authorization Grant Flow -->

- <details close>
  <summary>Device Authorization Grant Flow</summary>

  - 情境：無法直接輸入用戶憑證的設備 (EX. IoT)

  <!-- 圖解： -->

  - <details close>
    <summary>圖解：</summary>

    ![](../src/image/Device_Authorization_Flow.png)

    </details>

  </details>

<!-- Implicit Grant Flow -->

- <details close>
  <summary>Implicit Grant Flow (棄用)</summary>

  - `OAuth 2.1 廢除`
  - 簡介：直接發 Access Token 給前端 User-Agent，而沒透過 Grant
  - 改用：Authorization Code Grant + PKCE
  - 風險：因為直接給 Access Token，在轉址時可能被注入 script 直接將 Token 偷走

  <!-- 圖解： -->

  - <details close>
    <summary>圖解：</summary>

    ![](../src/image/Implicit_Grant_Flow.png)

    </details>

  </details>

<!-- Resource Owner Password Credentials Grant Flow -->

- <details close>
  <summary>Resource Owner Password Credentials Grant Flow (棄用)</summary>

  - `OAuth 2.1 廢除`
  - 簡介：直接以帳密當 Grant 去請求 Access Token
  - 改用：Authorization Code Grant + PKCE

  <!-- 原因： -->

  - <details close>
    <summary>原因：</summary>

    - 增加憑證暴露風險
    - 職責分離不乾淨
    - 無法集成 MFA

    </details>

  <!-- 圖解： -->

  - <details close>
    <summary>圖解：</summary>

    ![](../src/image/Resource_Owner_Password_Credentials_Flow.png)

    </details>

  </details>

### # 其他補充

<!-- Client 技術限制 -->

- <details close>
  <summary>Client 技術限制</summary>

  - 必須全程使用 TLS (HTTPS)
  - User-Agent 要支援 HTTP Redirection

  </details>

<!-- Access Token Request 的認證方式 (Client Authentication) -->

- <details close>
  <summary>Access Token Request 的認證方式 (Client Authentication)</summary>

  <!-- 推薦方式 -->

  - <details close>
    <summary>推薦方式</summary>

    <!-- Client Secret Basic -->

    - <details close>
      <summary>Client Secret Basic</summary>

      - Confidential client 的標準方式
      - 使用 HTTP Authorization Header

        ```
        // 格式：Basic Base64( client_id:client_secret )

        Authorization: Basic czZCaGRSa3F0Mzo3RmpmcDBaQnIxS3REUmJuZlZkbUl3
        ```

      </details>

    <!-- PKCE (Proof Key for Code Exchange) -->

    - <details close>
      <summary>PKCE (Proof Key for Code Exchange)</summary>

      - 情境：主要設計來給 public client 使用 (EX. 前端)

      - 流程：

        - 前端在應用內部，隨機生成一次性 code verifier
        - 再以 code verifier 做 hash，生成 code challenge
        - 請求 Authorization Code 時，一併傳送 `code challenge` (替代傳送 client secret 的作用)
        - 前端將 `code verifier` 連同 Authorization Code 傳給後端
        - 請求 Access Token 時，一併傳送 `code verifier` 給 Authorization Server 進行驗證

      </details>

    <!-- Private Key JWT -->

    - <details close>
      <summary>Private Key JWT</summary>

      - 最安全方式，使用 client 的非對稱性私鑰生成 JWT

      </details>

    </details>

  <!-- GPT 整理 -->

  - <details close>
    <summary>GPT 整理</summary>

    ![](../src/image/GPT_Client_Authentication_secure.png)
    ![](../src/image/GPT_Client_Authentication_common.png)

    </details>

  </details>

<!-- Access Token Type (`PoP` vs `MAC` vs `Bearer`) -->

- <details close>
  <summary>Access Token Type (<code>PoP</code> vs <code>MAC</code> vs <code>Bearer</code>)</summary>

  - 安全性：高 <-- `PoP` -- `MAC` -- `Bearer` --> 低

  <!-- Bearer Token -->

  - <details close>
    <summary><code>Bearer Token</code></summary>

    - 基本上是實踐的類型中，最基本簡單的 Access Token Type
    - 單純的使用 Access Token，任何取得 Token 的一方，皆可使用，沒有更近一步的驗證

    </details>

  <!-- `MAC Token` & `PoP Token` -->

  - <details close>
    <summary><code>MAC Token</code> & <code>PoP Token</code></summary>

    - 加強驗證，確保只有該 Client 可以使用該 Token (Resource Server 除了透過 Token 判斷，還會使用該密鑰來驗證 Client 的 Signature)
    - 使用 Token 時，需額外附上一個透過指定密鑰的`Signature` (Hash)
    - Hash 內容包含：`完整請求內容`、`TimeStamp`、`隨機數(nonce)`
    - 近期已被使用回應過的 nonce，Resource Server 會拒絕回應 (回 HTTP 400、401)
    - 單一 Token 上，MAC & PoP 兩種密鑰簽章的目的重複，擇一即可，兩者是在`性能`＆`安全`的取捨

    </details>

  <!-- MAC Token -->

  - <details close>
    <summary><code>MAC Token</code> (Message Authentication Code)</summary>

    - 由 Authorization Server 產生的`對稱密鑰`
    - Authorization Server、Resource Server、Client 共享密鑰
    - 綁定 Access Token 不需透過 MAC 密鑰來加密 Token (因為都是 Authorization Server 生成的)

    </details>

  <!-- PoP Token -->

  - <details close>
    <summary><code>PoP Token</code> (Proof of Possession)</summary>

    - 由 Client 產生的`非對稱密鑰`
    - Authorization Server & Resource Server 有公鑰、Client 有私鑰
    - 綁定 Access Token 會透過 PoP 密鑰來加密 Token

    </details>

  </details>

<!-- Refresh Token 的使用 -->

- <details close>
  <summary>Refresh Token 的使用</summary>

  <!-- 行為特性 -->

  - <details close>
    <summary>行為特性</summary>

    - Access Token 在每次請求都會傳輸，而 Refresh Token 只在取得與使用時傳輸一次，較不易被截取
    - Refresh 後取得的 Access Token 可能比原本的時效與權限還低

    </details>

  <!-- 適用情境 -->

  - <details close>
    <summary>適用情境</summary>

    - 最常在 Authorization Code Grant Flow 中使用
    - Implicit Grant Flow 禁用
    - Client Credentials Grant Flow 不建議使用
    - Device Code Flow 有時會使用

    </details>

  <!-- 安全加強 -->

  - <details close>
    <summary>安全加強</summary>

    - IP 白名單、縮短時效、單次使用、綁定使用者指紋 ＋ MFA
    - 需注意在使用 MAC、PoP Token 情境下，更換密鑰的方式

      - 避免每次 Refresh 都自動使用新的密鑰，反而可能更不安全
      - 應只在特定可掌握的特定情境下進行密鑰輪換

    </details>

  </details>

<!-- Endpoints 的規格 -->

- <details close>
  <summary>Endpoints 的規格</summary>

  <!-- Authorization Endpoint (Auth Server) -->

  - <details close>
    <summary>Authorization Endpoint (Auth Server)</summary>

    <!-- 用來與 client 前端溝通，可能發放 `Authorization Grant Code` 或 `Access Token` -->

    - <details close>
      <summary>用來與 client 前端溝通，可能發放 <code>Authorization Grant Code</code> 或 <code>Access Token</code></summary>

      - 只有 Implicit Grant Flow 會讓前端獲得 Token (OAuth 2.1 棄用)

      </details>

    <!-- 前端發送請求時所用的 URI (導向 Authorization Endpoint) -->

    - <details close>
      <summary>前端發送請求時所用的 URI (導向 Authorization Endpoint)</summary>

      - 可含 `Query Component` (EX. ?xxx=yyy)
      - 不可含 `Fragment Component` (EX. #zzz)

      </details>

    <!-- 接受 client 前端請求的方法，必須支援 `GET` -->

    - <details close>
      <summary>接受 client 前端請求的方法，必須支援 <code>GET</code></summary>

      - 首選是使用 GET，因為這個 Endpoint 主要是與前端溝通，透過 Redirect 的方式來進行，而 GET 最方便實作，且前端不使用 client_secret，因此也無敏感訊息

      - 也可額外支援 POST，就必須使用到 form

      </details>

    <!-- 參數 (通常是指 URL 上的 query parameters) -->

    - <details close>
      <summary>參數</summary>

      - `response_type`(必)、`state`(推)、`scope`(選)
      - Response Type (code、token)
      - state 主要用來儲存當前狀態

        - EX. 使用者原本點開一個購物商品，之後點登入後，要回到這個商品頁面，此時就是用 state 存
        - state 的內容只有在回到 client 之後才需知道，所以可以在 client 自行另外加解密，再傳送出去
        - 也可以防範 CSRF，所以推薦加上 state

      - 有時允許多種 Redirect URI 可選時，則會在請求時附上 redirect_uri
      - 若有重覆的參數，則要回傳錯誤

      - EX.

        ```
        https://authorization-server.com/auth?response_type=code&client_id=your_client_id&redirect_uri=your_redirect_uri&state=random_state
        ```

      </details>

    <!-- 必須使用 HTTPS，因為 response 包含 Grant -->

    - <details close>
      <summary>必須使用 HTTPS，因為 response 包含 Grant</summary>

      </details>

    </details>

  <!-- Redirection Endpoint (Client) -->

  - <details close>
    <summary>Redirection Endpoint (Client)</summary>

    <!-- Redirection Endpoint 內容的 <b>最佳實作</b> -->

    - <details close>
      <summary>Redirection Endpoint 內容的 <b>最佳實作</b></summary>

      - 從 Authorization Endpoint 不應該直接導向一個頁面，而是將這個 Endpoint 當作`中間層`
      - 一進入這個 Endpoint 就立刻將 Grant 取出後，再立刻導向要給使用者看的頁面
      - 這個 Endpoint 應該避免使用第三方 script，或是至少得讓自家的 script 先跑，而可以立刻處理掉

      </details>

    <!-- Authorization Endpoint 要回應時，所用的 URI (導向 Redirection Endpoint) -->

    - <details close>
      <summary>Authorization Endpoint 要回應時，所用的 URI (導向 Redirection Endpoint)</summary>

      - 必須是 `Absolute URI` (至少包含 scheme、authority、path)

        ![](../src/image/URI_Syntax.png)

        - EX.

          ```
          (X) https://www.example.com  // 缺少 path
          (O) https://www.example.com/oauth/callback
          ```

      - 可含 `Query Component` (EX. ?xxx=yyy)
      - 不可含 `Fragment Component` (EX. #zzz)

      </details>

    <!-- 必須使用 HTTPS 的情況 -->

    - <details close>
      <summary>必須使用 HTTPS 的情況</summary>

      - Response Type 為 code 或 token
      - Redirect URI 包含敏感訊息

      </details>

    <!-- Clients 在使用 Authorization Endpoint 之前，都該先設定 Redirection Endpoint，避免成為 `Open Redirector` -->

    - <details close>
      <summary>Clients 在使用 Authorization Endpoint 之前，都該先設定 Redirection Endpoint，避免成為 <code>Open Redirector</code></summary>

      - Open Redirector：允許用戶指定不需經過驗證的位址，使自動把 User-Agent 轉向該位址的 Endpoint
      - EX. 常見 pattern

        ```txt
        example.com/go.php?url=
        example.com/search?q=user+search+keywords&url=
        example.com/coupon.jsp?code=ABCDEF&url=
        example.com/login?url=
        ```

      </details>

    </details>

  <!-- Token Endpoint (Auth Server) -->

  - <details close>
    <summary>Token Endpoint (Auth Server)</summary>

    <!-- Request & Response 都必須使用 POST -->

    - <details close>
      <summary>Request & Response 都必須使用 POST</summary>

      </details>

    <!-- 後端發送請求時所用的 URI (導向 Token Endpoint) -->

    - <details close>
      <summary>後端發送請求時所用的 URI (導向 Token Endpoint)</summary>

      - 可含 `Query Component` (EX. ?xxx=yyy)
      - 不可含 `Fragment Component` (EX. #zzz)

      </details>

    <!-- 參數 (指 POST 的 body) -->

    - <details close>
      <summary>參數</summary>

      - `grant_type`(必)、`state`(推)、`scope`(選)
      - Grant Type (authorization_code、password、client_credentials、refresh_token..)
      - 其他同 Authorization Endpoint

      - EX. Response (Token Endpoint -> Client)

        ```
        HTTP/1.1 200 OK
        Content-Type: application/json;charset=UTF-8
        Cache-Control: no-store
        Pragma: no-cache

        {
          "access_token":"2YotnFZFEjr1zCsicMWpAA",
          "token_type":"example",
          "expires_in":3600,
          "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA",
          "example_parameter":"example_value"
        }
        ```

      </details>

    <!-- Request & Response 都包含敏感訊息，必須使用 HTTPS -->

    - <details close>
      <summary>Request & Response 都包含敏感訊息，必須使用 HTTPS</summary>

      </details>

    <!-- 必須進行 Client Authentication -->

    - <details close>
      <summary>必須進行 Client Authentication</summary>

      - 請求包含 Client Credentials (client_id、client_secret 等)
      - Best Practice 定期更換 credentials (一但更新，即可讓舊的 Token 都作廢)

      </details>

    </details>

  </details>

<!-- 其他安全措施補充 -->

- <details close>
  <summary>其他安全措施補充</summary>

  - Authorization Server 應該要考慮 Client 的身份，並且可以核發`少於所求的 scope`的 Access Token

  <!-- CSRF 攻防 -->

  - <details close>
    <summary>CSRF 攻防</summary>

    <!-- 攻擊 Client -->

    - <details close>
      <summary>攻擊 Client</summary>

      - 簡介：透過置換回傳的 Redirect URI，將「攻擊者的 Authorization Code」給受害者，後續一切合法，但受害者以為是在自己的帳號操作，可能去填寫一些敏感資料，而將敏感資料寫入攻擊者帳號

      - 前提：攻擊者在 Authorization Server 擁有自己的帳號

      - 防範：在 User-Agent 使用 state 參數來做驗證，確保得到自己對 Authorization Server 請求的回應

      </details>

    <!-- 攻擊 Authorization Server -->

    - <details close>
      <summary>攻擊 Authorization Server</summary>

      - 簡介：透過受害者自己點擊讓「攻擊者提供的 Client」得到授權，而將自己的敏感資訊授權給攻擊者 (可能透過 模仿 Client、提供 URI、Clickjacking .. 等等)

      - 前提：攻擊者的 Client 必須已經成功註冊在 Authorization Server

      - 防範：根本的防範是，加強 Authorization Server 對 Client 註冊的審核

      </details>

    </details>

  </details>

### # REF

> 註：因為該系列文內部連結沒更新，在此放上我自己修過的網址，供快速連結

- [OAuth 2.0]
- [使用 OAuth 2.0 存取 Google API]
- [OAuth 2.0 筆記 (1) 世界觀]
- [OAuth 2.0 筆記 (2) Client 的註冊與認證]
- [OAuth 2.0 筆記 (3) Endpoints 的規格]
- [OAuth 2.0 筆記 (4.1) Authorization Code Grant Flow 細節]
- [OAuth 2.0 筆記 (4.4) Client Credentials Grant Flow 細節]
- [OAuth 2.0 筆記 (5) 核發與換發 Access Token]
- [OAuth 2.0 筆記 (6) Bearer Token 的使用方法]
- [OAuth 2.0 筆記 (7) 安全性問題]
