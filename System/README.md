##### <!-- 收起 -->

<!----------- ref start ----------->

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

## # 書籍

- [架構解密：從分散式到微服務（第 2 版）]

## # 工具

- [Moleculer]

  - 基於 Node.js 的分散式框架
