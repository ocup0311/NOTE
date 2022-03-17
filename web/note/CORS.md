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

# CORS

> DATE: 3.2022
> REF: [MDN](https://developer.mozilla.org/zh-TW/docs/Web) & [CORS 完全手冊](https://blog.huli.tw/2021/02/19/cors-guide-1/)

### AJAX & CORS

- [Simple Request](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS#%E7%B0%A1%E5%96%AE%E8%AB%8B%E6%B1%82) (簡單請求): CORS 只擋 response 而不擋 request

- Preflight Request (預檢請求): 若非 Simple Request，則分裂成兩個請求，Preflight Request 先送出檢查，若沒過，則真正的請求就不會送出。

  <div class="imgBox" >
    <img src="../image/Preflight%20Request.png" alt="Discussion_array.png" />
  </div>

### 為什麼會發生 CORS 錯誤？

- origin：scheme + host + port
  ex. `https://google.com`

  - scheme：`https`
  - host：`google.com`
  - port：若沒有指定，預設 http：80, https：443
  - 範例：
    - 同源：
      `https://google.com & https://google.com/api`
    - 不同源：
      1. `https://google.com & http://google.com`
      2. `https://google.com & https://google.com：3000`
      3. `https://google.com & https://api.google.com`
         (domain & subdomain 之間不同源，可共用 cookie)
      4. `https://api.google.com & https://data.google.com`

- image、CSS、script ..等等不擋

  - 載入後只有瀏覽器知道內容 (無法用程式讀取) --> 無法把結果外傳 --> 較無資料外洩問題 （？）

- proxy 可以解決 CORS 的問題 <-- 因為是透過後端自己去拿資料，而不是透過瀏覽器

- CORS 是針對「在**瀏覽器**上寫 JS」(其他的是另一回事)

### 如何解決「簡單請求」的 CORS 問題？

- 「治標」爛方法：

  - 關掉瀏覽器的安全性設置
  - [把 fetch mode 設成 no-cors](https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors/43268098)：
    我發 request 給 no-cors header 的資源，我不要 response
    --> 絕對沒有 response
  - 不要用 AJAX 拿資料 (用 JSONP, JSON with Padding)
    - JSONP: script 標籤
    - AJAX: XMLHttpRequest 或是 fetch

- 「治本」方法：
  - 請「後端」加上 **CORS header** `Access-Control-Allow-Origin`
    ex. `res.set('Access-Control-Allow-Origin', 'https://your.domain')`
  - 使用 **proxy server**
    就是用 proxy server 幫你加上 `Access-Control-Allow-Origin`

### CORS 詳解

- 補充重點：

  - 非簡單請求（使用其他 HTTP method 與自定義 header）
  - 傳送 Cookie（如何讓跨來源請求也支援 cookie）

-

### 疑惑：

- 今天會有 same-origin policy 跟 CORS，是因為我們「在瀏覽器上寫 JS」，所以受到執行環境的限制。如果我們今天寫的是 Node.js，就完全沒有這些問題，想拿什麼就拿什麼，不會有人擋我們?
