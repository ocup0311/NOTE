##### <!-- 收起 -->

<!----------- ref start ----------->

[xid]: https://github.com/rs/xid
[UUID Versions Explained]: https://www.uuidtools.com/uuid-versions-explained
[UUID 原理與實作分析]: https://yuanchieh.page/posts/2020/2020-12-01-uuid-%E5%8E%9F%E7%90%86%E8%88%87%E5%AF%A6%E4%BD%9C%E5%88%86%E6%9E%90-%E8%A9%B2%E5%A6%82%E4%BD%95%E6%8C%91%E9%81%B8%E9%81%A9%E5%90%88%E7%9A%84-uuid-%E7%89%88%E6%9C%AC/
[Actor 模型和 CSP 模型的區別]: https://www.jdon.com/concurrent/actor-csp.html
[系統吞吐量（TPS）、使用者併發量、效能測試概念和公式]: https://www.796t.com/content/1542356104.html
[服務器性能測試中有哪些常用的性能指標？]: https://www.zhihu.com/question/50176445/answer/119975361
[常見性能測試指標]: https://zhuanlan.zhihu.com/p/38253500
[Moleculer]: https://moleculer.services/docs/0.14/balancing.html#Sharding-strategy
[Consistent Hashing]: https://tom-e-white.com/2007/11/consistent-hashing.html
[系統架構之 BASE 原則和 CAP 原則]: https://zhuanlan.zhihu.com/p/386699641
[P2P 網絡核心技術：Gossip 協議]: https://zhuanlan.zhihu.com/p/41228196
[Hash Slot vs. Consistent Hashing in Redis]: https://severalnines.com/blog/hash-slot-vs-consistent-hashing-redis/
[架構解密：從分散式到微服務（第 2 版）]: https://www.books.com.tw/products/CN11716142?loc=P_0001_085
[Deep dive into Redis Clustering]: https://medium.com/@pubuduboteju95/deep-dive-into-redis-clustering-1d71484578a9

<!------------ ref end ------------>

## <mark># TODO: 未整理</mark>

- Consistent hashing

  - 一般的 Consistent Hashing

    - 使用 Hash space and hash ring 解決 rehashing problem。使用 virtual nodes 達到平均分散
    - [Consistent Hashing]

  - Redis 使用另一種稱作 `Hash Slots`

    - 每個分區都是預先給定固定的 Hash 範圍，以 Master-Slave 方式來處理故障轉移
    - [Hash Slot vs. Consistent Hashing in Redis]
    - [Deep dive into Redis Clustering]

- Gossip protocol

  - [P2P 網絡核心技術：Gossip 協議]

- BASE 原則

  - [系統架構之 BASE 原則和 CAP 原則]

---

- Throughput (吞吐量)

  - `TPS = U_concurrent / ( T_response + T_think )`
  - 將壓測數據，用以計算出目前系統承受的 TPS (觀察其他數據在增加 U_concurrent 時的變化)
  - 某一環節達到極限值，T_response 會指數上升，TPS 則會下降

  - REF

    - [系統吞吐量（TPS）、使用者併發量、效能測試概念和公式]
    - [服務器性能測試中有哪些常用的性能指標？]
    - [常見性能測試指標]

  - 工具

    - Loadrunner

---

- 並行運算

  - 前提條件

    - 多個邏輯 CPU
    - 任務需可拆分執行

  - process VS thread

    - process：「資源分配」的最小單位，並且是「操作單位」
    - thread：最小的「操作單位」，且包含在 process 中

  - thread 的共享資源，產生 Race condition

    - lock
    - 不共享模型：Do not communicate by sharing memory; instead, share memory by communicating.

      - Actor：EX. Java/Scala 的 Akka 庫
      - CSP （Communicating Sequential Processes）：EX. Golang
      - REF: [Actor 模型和 CSP 模型的區別]

---

- DISTRIBUTED UNIQUE ID

  - UUID v1 ~ v5

    - [UUID 原理與實作分析]、[UUID Versions Explained]

    - UUID 中，v1 ~ v5 都保留一段記錄 version

    - version 介紹

      - 1. v4: 完全隨機
      - 2. v1: timestamp + clock sequence + NodeID(IEEE 802 MAC address)

        - 當 timestamp 比之前的小，則產生新的 clock sequence 來使用，以減少碰撞

      - 3. v5: 加入 Namespace (16 byte) + Name 再以 SHA1 做 Hash
      - 4. v3: 加入 Namespace (16 byte) + Name 再以 MD5 做 Hash
      - 5. v2: 不被採用 (X) (只有 64 個 / 7 mins)

  - MongoDB ID (12 byte)

    - 4 btye，Unix 紀元以來的秒數
    - 3 btye 的 Machine ID
    - 2 btye 的 Process ID
    - 3 btye 的計數器，以隨機值開始

  - [xid] (12 byte)

    - 將 MongoID 再以 base32hex 編碼 (24 char -> 20 char)
    - 生成一個 ID 的效率很快

  - snowflake

    - Sequence number 的部分，會以 AtomicInteger 或 lock 來防止 process 競爭

    - UTC 時間

    - NTP (Network Time Protocol)

      - 解決「分散式時間同步」問題
      - Marzullo's algorithm
      - 階層的上限為 15

  - 用在 PK 的話，用 int 會比 string 好

    - 空間小
    - 有排序

## # 書籍

- [架構解密：從分散式到微服務（第 2 版）]

## # 工具

- [Moleculer]

  - 基於 Node.js 的分散式框架
