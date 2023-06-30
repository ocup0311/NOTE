##### <!-- 收起 -->

<!----------- ref start ----------->

[Consistent Hashing]: https://tom-e-white.com/2007/11/consistent-hashing.html
[系統架構之 BASE 原則和 CAP 原則]: https://zhuanlan.zhihu.com/p/386699641
[P2P 網絡核心技術：Gossip 協議]: https://zhuanlan.zhihu.com/p/41228196
[Hash Slot vs. Consistent Hashing in Redis]: https://severalnines.com/blog/hash-slot-vs-consistent-hashing-redis/
[架構解密：從分散式到微服務（第 2 版）]: https://www.books.com.tw/products/CN11716142?loc=P_0001_085
[Deep dive into Redis Clustering]: https://medium.com/@pubuduboteju95/deep-dive-into-redis-clustering-1d71484578a9

<!------------ ref end ------------>

# <mark>TODO: 未整理</mark>

- Consistent hashing

  - 一般的 Consistent Hashing

    - 使用 Hash space and hash ring 解決 rehashing problem。使用 virtual nodes 達到平均分散
    - [Consistent Hashing]

  - Redis 使用另一種稱作 `Hash Slots`

    - 每個分區都是固定的 Hash 範圍，以 Master-Slave 方式來處理故障轉移
    - [Hash Slot vs. Consistent Hashing in Redis]
    - [Deep dive into Redis Clustering]

- Gossip protocol

  - [P2P 網絡核心技術：Gossip 協議]

- BASE 原則

  - [系統架構之 BASE 原則和 CAP 原則]

## 書籍

- [架構解密：從分散式到微服務（第 2 版）]
