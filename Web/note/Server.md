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

[mdn]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps

 <!-- ref -->

# Server-Side Web

> DATE: 4.2022
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

  - 底層的 node 環境在單線程中使用輕量級多任務處理，而不是為每個 web 請求提供單獨的進程
  - the underlying node environment uses lightweight multitasking within a thread rather than spawning separate processes for every new web request

  </details>

<!-- 大圖 -->

<div class="imgBox" >
  <img src="../image/Server/simple _dynamic_website.png" alt="simple _dynamic_website.png" />
</div>

---

### 名詞：

---

### 其他：
