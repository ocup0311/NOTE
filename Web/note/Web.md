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

[mdn]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web
[web demystified]: https://www.youtube.com/playlist?list=PLo3w8EB99pqLEopnunz-dOOBJ8t-Wgt2g
[populating the page: how browsers work]: https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work#parsing
[https-ssl-ca]: https://progressbar.tw/posts/96
[web server & nginx]: https://medium.com/starbugs/web-server-nginx-1-cf5188459108
[syn, syn-ack, ack]: https://kknews.cc/zh-tw/code/kn23bzr.html
[tcp slow start]: https://developer.mozilla.org/en-US/docs/Glossary/TCP_slow_start
[rfc 5681]: https://datatracker.ietf.org/doc/html/rfc5681
[congestion control]: https://zh.wikipedia.org/wiki/TCP%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6
[async/defer script]: https://ithelp.ithome.com.tw/articles/10216858
[web accessibility]: https://blog.techbridge.cc/2019/10/13/web-accessibility-intro/
[first meaningful paint]: https://developer.mozilla.org/en-US/docs/Glossary/first_meaningful_paint
[time to interactive]: https://developer.mozilla.org/en-US/docs/Glossary/Time_to_interactive

 <!-- ref -->

# Web

> DATE: 3.2022
> REF: [MDN] | [Web Demystified]

<!-- 工具 -->

- <details close>
     <summary>工具：</summary>

  </details>

---

### [Populating the page: how browsers work]

- 影響網頁效能主因

  - 等待資源加載時間 (Network latency)
  - 大多情況瀏覽器為單線程 (single threaded)

- Navigation

  <div class="imgBox" >
      <img src="../image/Web/Navigation(DNS-TCP-TLS).png" alt="Navigation(DNS-TCP-TLS).png" />
  </div>

  - DNS Lookup

    - If you've never visited this site, a DNS lookup must happen.
    - Server 與其他圖片等資源的抉擇：
      - 資源放 Server？
      - 放 S3，client 直接去 S3 要圖片？
      - 放 S3，client 透過 Server proxy 要圖片？

  - TCP Handshake

    - [SYN, SYN-ACK, ACK]
      - Linux 檢測是否被 Syn 攻擊：`netstat -n -p TCP | grep SYN_RECV`

  - TLS Negotiation

    > 補充 [HTTPS-SSL-CA]

    - HTTPS 時提出 SSL
    - SSL：介於 application layer 與 transport layer 之間
    - SSL 改良為 TLS
    - HTTP/3 強迫使用 **TLS 1.3**

- Response

  - [TCP Slow Start] / 14kb rule (RFC 5681)

    (TTFB = responseStart - navigationStart)

    - The first chunk of content is usually **14kb** of data.
    - 名詞：

      - Time to First Byte (TTFB)：從 Navigation 開始到收到第一個 response 所花的時間

      - congestion window (cwnd)：由傳送方估算
        每次傳輸後，cwnd 以指數成長，直到**逾時**或**超過 ssthresh**。

        1. 達 ssthresh：改為線性成長
        2. 逾時：

        - ssthresh = cwnd/2
        - cwnd = MSS
        - 回到 Slow Start

      - Window Size：由接收方提供

      - slow start threshold (ssthresh)

      - acknowledgment (ACK)：TCP 接收後的回應

      - round-trip time (RTT)：發訊到收訊的時間

      - Maximum segment size (MSS)：預設 536，或是在 TCP SYN 時定義

  - [Congestion control]

- Parsing

  - (1) Building the DOM tree

    - 遇到 css file 時，可繼續解析 DOM，但遇到的 script (特別是 '非 async or defer')，可能會阻塞 (因為可能會用 js 選取 css)

  - Preload scanner

    - 針對 image, css, [async/defer script] 等，在後台先行下載
      - async: 下載完立刻暫停其他動作執行 script

  - (2) Building the CSSOM

    - Building the CSSOM is very, very fast
    - The total time to create the CSSOM is generally less than the time it takes for one DNS lookup.

  - Other Processes

    - JavaScript Compilation

      - 解析成 Abstract Syntax Tree

    - Building the Accessibility Tree

      - [web accessibility]：身心障礙者使用

- Render

  - Style

    - (3) DOM + CSSOM --> Render Tree

  - Layout

    - (4) 從 root 開始計算成幾何圖形
    - layout：第一次計算完成的圖形
    - reflows：layout 形成後，又再次做調整（回流）

  - Paint

    - (5) 將每個 Node 繪製到畫面
    - [First Meaningful Paint] (FMP)
    - 為確保 repainting 甚至可以比初始繪製還快
      --> 需要分層 --> 需要合成 (Compositing)

  - Compositing

    - re-composite：只將需要的部分重繪

  - Interactivity

    - [Time to Interactive] (TTI)

- step:
  1. Building the DOM tree
  2. Building the CSSOM
  3. DOM + CSSOM --> Render Tree
  4. Run Layout on the Render Tree to compute the geometry of each Node
  5. Paint the individual nodes to the screen

<div class="imgBox" >
      <img src="../image/Web/Browser_Waterfall_View.png" alt="Browser_Waterfall_View.png" />
</div>

---

- [Web Server & Nginx]
  - 其實透過 Node.js Golang 這類程式語言起的 Web Server 通常會被稱為 **Application Server**，而 Nginx、Apache 一般來說才會被稱為 **Web Server**。
  - 正向代理隐藏真實 Client，反向代理隱藏真實 Server
