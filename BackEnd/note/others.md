###### <!-- 收起 -->

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

<!-- ref -->

[HATEOAS：建構驅動的 REST API]: https://apifox.com/apiskills/hateoas-driven-rest-api/
[HATEOAS 驅動的 REST API]: https://restful.p2hp.com/learn/hateoas
[你的 REST 不是 REST？]: https://www.ithome.com.tw/voice/128528
[成為看起來很強的後端]: https://youtu.be/HMX4KSDtfpw?list=PLS5AiLcCHgNxd341NwuY9EOpVvY5Z8VOs

 <!-- ref -->

# 隨筆

## # [成為看起來很強的後端]

> DATE: 8 (2022)

<!-- 圖解 -->

- <details close>
  <summary>圖解</summary>

  ![](../src/image/BackEnd_Map.png)

  </details>

<!-- DataBase -->

- <details close>
  <summary>DataBase</summary>

  - RDBMS(關聯式)：關聯性強，如 電商
  - 非關聯：快取、分散式系統

  </details>

<!-- 權限 -->

- <details close>
  <summary>權限</summary>

  - 一般 Client to Server 比較複雜，Server to Server 較為簡單。

  - Authentication v.s. Authorization

    - Authentication（驗證）
      - 沒通過，給 401 Unauthorized（未授權）
    - Authorization（授權）
      - 沒通過，給 403 Forbidden(禁止)

  - Token

    - event-based：通常是一次性 (OTP one-time-password)
    - time-based：一般所指的 Token
    - static：設定好，不太會一直改變的（password）

  - 處理

    - 雜湊 (Hash)

      - 單向
      - 太簡單的容易被查表破解 (Rainbow Table)

    - 編碼 (Encode)

      - 雙向
      - 例如壓縮讓內容變小，好傳輸
      - 常用
        - base64 (0~9, a~z, A~Z, +=) (結尾通常 ==)
        - hex (16) (0~9, a~f)

    - 加密 (Encrypt)

      - 雙向＋鑰匙
        - 對稱式：加解密同把鑰匙 (ex. AES)
        - 非對稱式：鑰匙不同把 (ex. SSL)

  </details>

---

## # ExplainThis 小記

> DATE: 9 (2024)

##### # RESTful API

<!-- 避免做法 -->

- <details close>
  <summary>避免做法</summary>

  <!-- 濫用 GET / POST -->

  - <details close>
    <summary>濫用 GET / POST</summary>

    - 錯誤：濫用 GET 改資料、濫用 POST 更新資料
    - 正確：用 PUT/PATCH 更新、DELETE 刪除

    </details>

  <!-- 過度巢狀的 URI -->

  - <details close>
    <summary>過度巢狀的 URI</summary>

    </details>

  <!-- 動詞不要再加在 URI -->

  - <details close>
    <summary>動詞不要再加在 URI</summary>

    - 錯誤：[GET] /getUser
    - 正確：[GET] /user

    </details>

  <!-- 濫用 HTTP status code -->

  - <details close>
    <summary>濫用 HTTP status code</summary>

    </details>

  <!-- 缺乏 API 版本控制 -->

  - <details close>
    <summary>缺乏 API 版本控制</summary>

    - 若有更新 API 時，可能用到 cache 的舊版本

    </details>

  </details>

<!-- 其他補充 -->

- <details close>
  <summary>其他補充</summary>

  <!-- HATEOAS (Hypermedia as the Engine of Application State) -->

  - <details close>
    <summary>HATEOAS (Hypermedia as the Engine of Application State)</summary>

    <!-- REF -->

    - <details close>
      <summary>REF</summary>

      - [你的 REST 不是 REST？]
      - [HATEOAS：建構驅動的 REST API]
      - [HATEOAS 驅動的 REST API]

      </details>

    <!-- 行為特性 -->

    - <details close>
      <summary>行為特性</summary>

      - Level 3 的 RESTful 標準
      - res 中包含相關聯的 url，讓 client 只需直接使用，而不在 client 自行組裝 url
      - 在後端，用自動化方式動態組裝對應的 url

      </details>

    <!-- SOAP WSDL vs RESTful HATEOAS -->

    - <details close>
      <summary>SOAP <code>WSDL</code> vs RESTful <code>HATEOAS</code></summary>

      - WSDL 主要目的是用來規定好格式，讓 client 按照那個格式溝通 API (C/S 耦合度較高)
      - HATEOAS 主要的目的是，讓 client 不用自己組裝要怎麼溝通 API (用來將 C/S 解耦)

      </details>

    </details>

  </details>

#####

- <details close>
  <summary></summary>

  </details>
