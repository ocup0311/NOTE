##### <!-- 收起 -->

<!----------- ref start ----------->

<!------------ ref end ------------>

# GraphQL

> DATE: 9 (2024)
> REF:

## # 小記

<!-- 避免做法 -->

- <details close>
  <summary>避免做法</summary>

  <!-- 過度查詢 (Over-fetching) -->

  - <details close>
    <summary>過度查詢 (Over-fetching)</summary>

    - 建議：

      - client 應該只請求必要的資料
      - server 應該設定預防措施

    </details>

  <!-- 忽略 N+1 查詢問題 -->

  - <details close>
    <summary>忽略 N+1 查詢問題</summary>

    - 建議：使用資料加載技術（EX. DataLoader）來批量處理請求

    </details>

  <!-- 缺少 查詢深度限制 設置 -->

  - <details close>
    <summary>缺少 查詢深度限制 設置</summary>

    - 狀況：

      - 用戶有機會出現過深巢狀查詢
      - 惡意攻擊
      - 無限遞迴查詢

    - 建議：server 設置查詢深度和複雜度的限制，確保資源消耗保持在可控範圍內 (EX. graphql-depth-limit)

    </details>

  <!-- 權限控制處理不當 -->

  - <details close>
    <summary>權限控制處理不當</summary>

    - 由於靈活性和細粒度查詢特性，相對 REST 更容易產生 權限控制處理不當 問題，需要更加注意

    </details>

  </details>

<!-- 其他補充 -->

- <details close>
  <summary>其他補充</summary>

  <!-- subscription -->

  - <details close>
    <summary>subscription</summary>

    - Apollo Client 內建使用 WebSocket (需配置 WebSocketLink)
    - Apollo Client 會在使用者觸發訂閱時，才自動啟用 WebSocket 連線
    - 使用者結束訂閱，Apollo Client 就會結束 WebSocket 連線

    </details>

  </details>
