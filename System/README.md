##### <!-- 收起 -->

<!----------- ref start ----------->

[論文解讀：深入討論 Bloom Filter]: https://www.evanlin.com/BloomFilter/
[SSTable (Sorted String Table)]: https://www.igvita.com/2012/02/06/sstable-and-log-structured-storage-leveldb/
[Architecture of Cassandra]: https://cassandra.apache.org/doc/latest/cassandra/architecture/
[Anti-Entropy 步驟]: https://blog.csdn.net/zhangxinrun/article/details/9347263
[Database Papers: Anti-Entropy without Merkle Trees, Deletes without Tombstones]: https://medium.com/@ifesdjeen/database-papers-anti-entropy-without-merkle-trees-deletes-without-tombstones-a47d2b1608f3
[向量時鐘]: https://zhuanlan.zhihu.com/p/56886156
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

---

- Trade-Off

  - Read vs Write vs Memory usage
  - Consistency vs Availability

- Distributed key-value store

  ![Distributed_key_value_store.png](./src/image/Distributed_key_value_store.png)

  - 分散式系統 CAP theorem

    - Consistency, Availability, Partition Tolerance
    - 目前為止，CAP 只能取其二
    - 目前為止，網路故障無法完全避免，所以一定無法捨棄 P，因此需在 C & A 上斟酌

  - Data partition

    - 需求：

      - 公平分配
      - Partition Tolerance 能有最小移動量

    - 解法：

      - Consistent hashing

        - 優點：

          - 解決 公平分配＋最小移動量
          - Automatic scaling
          - Heterogeneity
            - 指可以針對不同 node 有不同處理。例如某個 node 所使用的硬體較差，那麼就分配較少 virtual nodes 給他

        - 缺點：

          - 無法依照特殊條件分區

  - Data replication

    - 備份 --> 依照順時針存進 N 個 virtual nodes
    - 重複同個 node --> 順延直到 N 個不重複的 nodes
    - 單點故障 --> 放在不同 data centers 並以 high-speed networks 連結

  - Consistency

    - Quorum consensus

      - 鴿巢理論
      - W/R 代表 coordinator 至少需要收到幾個 W/R 的回應後，認定已完成 W/R
      - 幾種分類：`R = 1 & W = N`, `W = 1 & R = N`, `W + R > N`, `W + R <= N`

    - Consistency models：Strong、Weak、Eventual

    - Eventual consistency (最終一致性)

      - 本次推薦
      - 需協調衝突

  - Inconsistency resolution: Versioning

    - Vector clocks ([向量時鐘])

      - 可以用來判斷事件順序，或是判斷出有衝突 (需另外想辦法解衝突)
      - 基於 Lamport Logical Clock

        - 初始：timestamp = 0
        - 做事：timestamp++
        - 發送：timestamp++ 並把 timestamp 附上
        - 接收：timestamp = Max(本地 timestamp, 接收 timestamp)+1

      - 分開記錄每個 server 的 Lamport Logical Clock

      - 缺點：

        - client 必須解衝突，使 client 變更複雜
        - `[server: version] pairs` 會增長太快，很佔空間
          - 解法是將舊的移除，很少因此造成問題

  - Handling failures

    - 偵測方法

      - Gossip protocol

        - [P2P 網絡核心技術：Gossip 協議]

        - 兩種方式傳遞：

          - Anti-Entropy（反熵）：定時傳遞所有資訊
          - Rumor-Mongering（謠言傳播）：只在更新時，傳遞新的資訊，並確認所有已更新

        - 問題：
          - 一般多久傳一次心跳？
          - 一般多久沒更新算失聯？

    - 處理方法

      - Gossip protocol 偵測到失聯，則開一台 new server 頂上 (只能寫入)
      - 若是使用 strict quorum，可能就會暫停等 new server 備好

      - 暫時失聯

        - Hinted handoff：當 down server 恢復後，再將 new server 新增的資料，同步回 down server

      - 永久失聯

        - Anti-Entropy protocol

          - 命名解釋：降低混亂程度 (增加一致性)
          - 兩種狀態：Suspective、Infective
          - 使用 Merkle tree 快速偵測 inconsistency

            - 樹的葉子是 buckets
            - 實作可能一棵：十億 keys / 百萬 buckets

          - REF: [Anti-Entropy 步驟]
          - 延伸：[Database Papers: Anti-Entropy without Merkle Trees, Deletes without Tombstones]

  - System architecture diagram

  - Write/Read path

    - [Bloom filter]

      - 可以快速判斷是否「不存在」某個 SSTable，快速找到所在的 SSTable
      - 可能會偽陽
      - 原理：

        - 一般

          - 存入時將一個 key 做數個 hash，每個 hash 對應到的地方改為 1
          - 讀取時一樣做 hash，若其中一個是 0，則不存在
          - 不能從 Bloom filter 中刪除，所以用越久，失誤率越高

        - 改良版

          - 改用計數器
          - 但是存 int，所用空間大很多，進而影響到查詢速度

        - cuckoo filter

      - REF: [論文解讀：深入討論 Bloom Filter]

    - REF
      - [Architecture of Cassandra] 有提供建議的 Write/Read path 設計
      - [SSTable (Sorted String Table)]

- 問題：

  - Consistent hashing 無法依照特殊條件分區？這個需求就要換其他方法嗎？

  - Fig. 6-5：

    - Consistent hashing 要怎麼讓 replica 可以按照不同資料區且高速網路連接？
    - 如果插入的資料的 hash 在 N 台 replica 的 hash 中間，怎麼辦？

  - Quorum consensus 中，`W + R <= N` 方案，通常會用多少比例的 W/R？

  - Vector clocks 呈現衝突後，怎麼解衝突？呈現給 client 後，就是業務問題了？

  - Gossip protocol

    - 一般多久傳一次心跳？
    - 一般多久沒更新算失聯？
    - 主動傳給所有機器，還是每台機器自己去輪詢？

  - 永久失聯使用 Anti-Entropy protocol 時，有沒有可能再拆成好幾棵 Merkle tree 傳遞？還是只會直接全部包成一棵？

## # 書籍

- [架構解密：從分散式到微服務（第 2 版）]

## # 工具

- [Moleculer]

  - 基於 Node.js 的分散式框架
