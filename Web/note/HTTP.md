###### <!-- ref -->

[保哥 1]: https://youtu.be/Taq5TV1K4XU
[telnet]: https://formulae.brew.sh/formula/telnet
[chunk vs range]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests#comparison_to_Chunked_transfer-encoding
[semantics and content (rfc 7231)]: https://www.rfc-editor.org/rfc/rfc7231.html

 <!-- ref -->

# HTTP

### 版本歷史

> DATE: 3.2022
> REF: [保哥 1]

- 工具：

  - 使用 [TELNET] 連線
  - Postman
  - Fiddler free web debudding proxy

- HTTP/0.9

  - 1991 (已廢)
  - 主要內容：
    - Client/Server Request/Response
    - 跑在 TCP/IP 上的 ASCII 協定
    - Request 以單行 ASCII 命令為主
    - Response 以 ASCII 命令為主，回傳 HTML
    - 每次每次執行完自動斷掉連線

- HTTP/1

  - 一次發布：
    - 5.1996 (RFC 1945)
  - 1991~1995 瀏覽器出世
  - 主要內容：
    - 以 ASCII 為主，可多行命令 (含 Header)
      - Header 出現
      - 1.method 2.Header
    - 回傳以 ASCII 為主
      - 1.狀態列 2.Header 3.內文不限定 HTML
    - 每次結束斷開 TCP/IP 連線

- HTTP/1.1

  - 三次發布：
    - 1.1997 (RFC 2068)
      - 解決一些效率問題
    - 6.1999 (RFC 2616)
    - 6.2014
  - 目前主要內容由此而來
  - 主要內容：
    - persistent connection (維持 TCP/IP 連線)
      - Server 可以將 HTTP 的 TCP/IP 持續連線功能關閉。
      - HTTP 可自己設定 TCP/IP timeout，超過時間則自動斷開。(一般 30 s)
      - TCP/IP 數量上限 65535 個
    - Chunked transfer encoding (切塊編碼傳輸)
      - 陳立其: Chunked transfer encoding 在 HTTP/2 已經不支援。([chunk vs range])
    - byte range request
    - cache control
    - request pipelining (一次送出多個 Request)
  - 六大規格：
    - Message Syntax and Routing (RFC 7230)
      - Routing --> 經過多層 proxy
    - **[Semantics and Content (RFC 7231)]**
      - 常見狀態碼：
        - 200：OK
        - 201：已新增成功
        - 202：已接受請求（例如可以多久後再來取得處理好的資料）
        - 3xx：轉向
        - 4xx：Client 錯誤 (400, 403, 404)
        - 5xx：Server 錯誤 (500, 502, 503)
    - Conditional Requests (RFC 7232)
    - Range (RFC 7233)
    - Caching (RFC 7234)
      - Request 會加入 Header:
        `If-Modified-Since: Sat, 29 Oct 2020 19:30:39 GMT`
      - Server 檢查這時間的檔案是否最新
      - 是則回傳 304: Not Modified，直接使用 Cache
    - Authentication (RFC 7235)

- HTTP/2
  - 一次發布：
    - 5.2015 (RFC 7540)
  - 主要內容：
    - 沿用 HTTP/1.1 ，只針對 Message Syntax 強化
      - 傳輸文件內容更有效率
        - 非同步多工
        - binery 傳輸

### 其他

- 每次都要告知 Host，因為一個 ip 可能會有好多個 Host
  - HTTP 有支援 virtual hosting (虛擬主機)：一台 web server 可以提供多個網站 hosting 在 80 port
- HEAD method：獲取該 request 將得到的 response 的資訊
  - 例如可先用 HEAD 得知回傳檔案大小，再決定是否用 Range Request
- HTTP 特性：stateless(無狀態), distributed(分散式架構), collaborative(協作的架構), hypertext
- 分散式架構，建議不用 Session，會出問題

- 推薦書籍：高效能網站開發指南, 高效能網站建置指南, Web 效能優化日誌 Volume 2

### 疑問：

- [每次都要告知 host 的原因]（(https://youtu.be/Taq5TV1K4XU?t=1228)
