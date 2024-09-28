###### <!-- ref -->

[SOAP vs REST: All you need to know]: https://www.linkedin.com/pulse/soap-vs-rest-all-you-need-toknow-luis-soares-m-sc-/

<!-- ref -->

# API

> DATE: 9 (2024)

### # API 設計

- 基本簡介

  - 定義應用程式之間如何互動的介面規範，讓不同系統、應用能夠進行資料交換與功能調用

- 解決目標

  <!-- 重用輪子 -->

  - <details close>
    <summary>重用輪子</summary>

    - 功能模組化：將系統功能模組化，提升開發、維護效率

    </details>

  <!-- 整合系統 -->

  - <details close>
    <summary>整合系統</summary>

    - 資料交換與整合：促進不同系統之間的資料傳遞與整合

    </details>

  <!-- 靈活擴展 -->

  - <details close>
    <summary>靈活擴展</summary>

    - 允許應用程式之間無縫互動，支援多元設備與客戶端

    </details>

- 好的原則

  <!-- 風格統一 -->

  - <details close>
    <summary>風格統一</summary>

    - 同一個系列的一致性要高
    - 可透過「遵循業界常見的規範」簡單的實現
    - 入境隨俗，依照語言的規範做調整

    </details>

  <!-- 命名可讀 -->

  - <details close>
    <summary>命名可讀</summary>

    - 從使用者的角度、功能性來思考命名，而非依照技術來命名

    </details>

  <!-- 單一職責 -->

  - <details close>
    <summary>單一職責</summary>

    - 可參考的判斷方式

      - 「當你有所遲疑要不要把某個東西放進 API 時，這時就應該把該東西排除，不要放進去」
      - 「能不能輕易為該 API 命名?」
      - 「能不能輕易解釋該 API 的功能?」

    </details>

  <!-- 版本管理 -->

  - <details close>
    <summary>版本管理</summary>

    - 提供認證機制與版本控制，確保 API 使用安全並且穩定

    </details>

- 相關名詞

  - `API-first`：在著手開發前，先做 API 的設計與規範

### # API 比較

<!-- 全面比較 -->

- <details close>
  <summary>全面比較</summary>

  <!-- SOAP：基於 XML 的協議，提供結構化且標準化的訊息交換和複雜功能支持 -->

  - <details close>
    <summary><code>SOAP</code>：基於 XML 的協議，提供結構化且標準化的訊息交換和複雜功能支持</summary>

    - 規格：`XML` / `常用 HTTP`
    - 特性：基於標準化協議 (EX. WS-Security、WS-ReliableMessaging)
    - 優勢：內建標準化的事務管理、訊息安全功能
    - 劣勢：格式冗長解析效能較低、開發較慢、維護成本較高
    - 適用：金融交易、政府系統、企業流程管理系統

    </details>

  <!-- REST：基於 HTTP 的架構風格，使用標準的 HTTP 方法進行資源操作，設計簡單、語義清晰 -->

  - <details close>
    <summary><code>REST</code>：基於 HTTP 的架構風格，使用標準的 HTTP 方法進行資源操作，設計簡單、語義清晰</summary>

    - 規格：`常用 JSON、XML` / `HTTP`
    - 特性：無狀態、資源導向，使用標準的 HTTP 方法 (GET、POST、PUT、DELETE)
    - 優勢：簡單易用、擴展性高、快速開發迭代、靈活設計
    - 劣勢：複雜應用可能不夠完善
    - 適用：Web API、移動應用後端、微服務架構

    </details>

  <!-- gRPC：基於 HTTP/2 的高效能 RPC 框架，使用 Protocol Buffers 進行序列化，支援多語言和雙向串流通訊 -->

  - <details close>
    <summary><code>gRPC</code>：基於 HTTP/2 的高效能 RPC 框架，使用 Protocol Buffers 進行序列化，支援多語言和雙向串流通訊</summary>

    - 規格：`Protocol Buffers` / `HTTP/2`
    - 特性：基於 HTTP/2 的多路複用與 Protocol Buffers 的高效序列化，實現低延遲、雙向串流、高效通訊
    - 優勢：高效能、延遲低、訊息序列化開銷小、支持雙向串流、支持多路複用
    - 劣勢：高度耦合、兼容性較低，不適合 public API
    - 適用：微服務間通訊、遊戲後端、物聯網、即時通訊

    </details>

  <!-- GraphQL：基於查詢語言的 API 設計模式，允許客戶端靈活請求精確的資料 -->

  - <details close>
    <summary><code>GraphQL</code>：基於查詢語言的 API 設計模式，允許客戶端靈活請求精確的資料</summary>

    - 規格：`Query Language` / `HTTP`
    - 特性：客戶端定義請求結構，單一端點（endpoint）處理多種操作，支援資料嵌套和關聯查詢。
    - 優勢：減少過量或不足的資料傳輸、單一端點整合資料來源、支援複雜資料查詢和巢狀結構
    - 劣勢：需要較高的後端設計與性能調優、不適合簡單的 CRUD 應用、不適合低延遲場景
    - 適用：儀表板系統、需要靈活資料查詢的 Web、移動應用

    </details>

  </details>

<!-- 總結比較 -->

- <details close>
  <summary>總結比較</summary>

  - `SOAP`：強調安全性、事務性和可靠性，適合複雜的企業級應用
  - `REST`：靈活、易用，適合公開 API 和快速開發的應用場景
  - `gRPC`：高效能、低延遲，適合內部系統和即時通訊需求
  - `GraphQL`：靈活查詢、多來源資料整合，適合需要複雜互動的應用

  </details>

<!-- 趨勢走向 -->

- <details close>
  <summary>趨勢走向</summary>

  - `SOAP` 在新項目中使用減少，但在金融、政府、大型企業內部系統中，仍然因其成熟的標準和高度的安全性繼續被採用
  - `REST` 依然是 Web 開發的主流選擇，特別是在公共 API、微服務架構
  - `gRPC` 在高效能、低延遲的需求中越來越受歡迎，尤其是內部系統間的 API 通訊，呈現上升趨勢
  - `GraphQL` 的靈活查詢、整合多資料來源的特性，使其在需要多樣化資料查詢、高互動性的應用中，受歡迎度持續增長，尤其在前端開發中

  </details>

<!-- REF -->

- <details close>
  <summary>REF</summary>

  - [SOAP vs REST: All you need to know]

  </details>

---

### # 閱讀更多

- [REST](./REST/note/note.md) | [GraphQL](./GraphQL/note/note.md) | [gRPC](./gRPC/note/note.md)
- [BackEnd](../BackEnd/README.md)
- [Ocup 學習筆記](../README.md)
