# # 島嶼遲早連結成一片宇宙：ActivityPub 協議入門及基礎實作攻略

- ActivityPub 基於 HTTP
- `/well-known`
- 通常按需溝通，而不是同步所有內容 (例如 追蹤、被追蹤)

---

# # Unveiling etcd: Architecture and Source Code Deep Dive

- 強一致性、分散 key-value store、reliable
- 一般用途：儲存設定檔、服務發現
- HTTP API、gRPC server
- 10000 writes/sec (fast)
- Leader-Follower

  - Leader 負責全部的寫入

- MVCC store

  - Tree Index (Etcd Server)
  - BoltDB (Storage)

- WAL: persist log

- Raft

  - 設計目標是要比 Paxos 好懂
  - 不能解決拜占庭問題 (不能有人說謊)
  - timeout 預設 1000 ~ 2000 ms
  - Leader 會同步到所有 Follower，同步時，會至少帶一個該 Follower 已有的 log

---

# # 剖析 KIND(Kubernetes IN Docker) 的實作原理

- 目的：提供一個方便且快速的 K8s 測試環境 (image 搞定一切 爽)
- 內部用 Containerd
- 東西都在 `/kind` 中
- 在 contianer 中遇到的小問題：

  - machine-id

    - `systemd-machine-id-setup`

  - Product_UUID

    - 需將每台改成不同

  - Certificate

    - 每次重開就讀一次 ip，有改變就重新產生 Certificate
    - `fix_certificate`

  - DNS

    - `127.0.0.11` (docker 中 DNS 的 ip?)

    - CoreDNS (K8s 的)

  - cGroup

---

# # 可升級 Solidity 智能合約講解

- 需求：修 bug、新增小功能 (大功能已重新部署為主)
- proxy contract / logic contract

- `delegatecall()`、`fallback()`

- Storage Slot : 按照順序存放

- ERC1967

- Storage Collision

---

# # 初探 Kafka broker 原始碼

- 削峰、解耦合

- - AbstractIndex
  - mmap
  - OS page cache
  - Binary Search + Page Cache

- Offset Index

  - Kafaka Offset Type Long(8 byte) + 8888

- warm : 最近寫入的 log

- makeLeader 在 inWriteLock 狀態，外面不要再用 lock

- ControllerChannelContext

- server 會起一個 worker 去監聽，當 config 更改就會整個重啟？
- server 會建一個 pool 去處理 Kafka API Request

---

# # 設計 Kubernetes Controller 與 CRD 的實踐 - 以網路為例

- 推薦：Config-Based controller

---

# # Strengthening Kubernetes Security

- [簡報](https://docs.google.com/presentation/d/1wlKbUzvf_Gcyb-fC1pbAKdtfbA7GdkBY/edit#slide=id.p1)

- m9SWeeper

- Kubernetes 常見的安全性問題：

  - 60% 的問題出自 部署設定錯誤
  - container image 有弱點
  - 少於 30% 的 cluster 通過 CIS Benchmark 測試。
  - 76 % 因為 secret 的存取權限
  - 82% 因為 access-related issue( ?
  - Falco 專案可以解決 80% 的安全性議題

- 常見的安全性 tool

  - Gatekeeper/Kyverno (Open Policy Agent)
  - KubeSec
  - Kube-Hunter
  - Kube-Bench
  - Falco
  - Trivy

---

# # Multi-Tenant ArgoCD with security and isolation

---

# # 超越監控：Grafana K6 帶你探索應用程式的深淵

- 講者認為 K6 的優勢

  - Load Impact
  - Developer
  - Engine
  - Testing tool

- 官方文件很弱，而且他們正在重構中

---

# # Stealth Address 如何保護你的鏈上資產隱私

- 幾種隱私的面向

  - Unlinkability

    - Transfer Privacy
      - EX. Tornado Cash (混幣器)

  - Anonymity

    - Asset Privacy
      - EX. Stealth Address：問題出在 receiver 使用該資產時

- 會先產生一個一次性的地址，該私鑰只有 sender & receiver 可以控制？

- 為啥不直接給一個新地址？

  - 每次都需要互動，sender 需要等 receiver 提供新地址
  - receiver 需要自己追蹤所有地址

- Umbra

  - 目前有上線的使用 Stealth Address 的服務
  - 以 Contract + Relayer 來將該筆交易讓 receiver 可以使用

---

# # 區塊鏈錢包的 Recovery 機制探索

- 遺失私鑰後，恢復私鑰

  - 狹義：取回私鑰 (EX. SSS)
  - 廣義：重新取得帳戶所有權 (EX. 合約錢包)

- 2 steps: 驗證＋執行

- 分類：以「是否需要第三方節點介入」

  - self
  - 3rd

- SSS (Shamir's Secret Sharing)

  - 多人共同管理 Secret，可決定需要 x 人即可解開 share secret，可超過 x 人擁有各自的 part secret

- MPC 為進階使用 SSS，在使用過程中，都不會有人知道真正的私鑰

- Social Recovery：利用 SSS 或 合約
  - guardian：被選上可以來幫你進行 Social Recovery 的人。若是隨機選不認識的人，可以避免同謀背叛，但得自己記得這些人的清單
  - SSS：用數學方法，透過 guardian 實質上得到遺失的私鑰
  - 合約錢包：以合約方式，讓 guardian 可以換一把新的私鑰給你用

---

# # Exploiting the Profanity Flaw: Wintermute Hack Reproduction

- REF: [Exploiting the Profanity Flaw](https://medium.com/amber-group/exploiting-the-profanity-flaw-e986576de7ab)

- Profanity

  - 一個 vanity address generator
  - 優勢：產生的速度很快

- vanity address

  - 特殊樣貌的地址
  - EX.「10 幾個 0 開頭」「1234 開頭」的地址..等等

- 用途：

  - msg.data 中，0 byte 可以省比較多 gas (地址多一個 0 可少 12 gas)
  - 相同開頭的地址，建立一個品牌

- ETH 的地址是取 公鑰 後面的 20 byte

- d0 種子私鑰，Q0 種子公鑰

  - d 跟 Q 是相關的等差級數，可輕易回推
  - dn = d0 + n (?)
  - Qn = Q0 + G \* n

- 問題：

  - 可能使用 Profanity 的算法，快速找出某個公鑰所在的規律數列，破解橢圓算法？

---

# # Faster Image Pulling with IPFS Cache and eStargz Lazy Pulling

- 因為 pull image 佔啟動 container，非常大比例的時間 (約 70%)

- 使用 IPFS，使得可以直接透過 p2p 從已經 pull 好的 node 那裡抓取

- IPFS 透過 CID(Content-addressable id) 來辨別

  - 使用 ipfs add 時，會產生一個 CID

- 一個 AZ 開一台 IPFS Node 專門放 IPFS Cache，用來避免每天 Node 重開機，又需要再次 pull 一次

- containerd 使用 eStargz
  - eStargz: Extensible Stargz
  - Stargz: seekable tar.gz

---

# # TornadoCashV2: Privacy Pool Design

- 使用「收據」概念，憑收據領錢

- 收據：Hash(secret, nullifier)

  - nullifier 防止雙花

- 但不能直接用收據去領，而是用零知識證明你有收據，則發錢給你

- 有用一個 map 記錄 nullifier 是否已領過

- proof of innocence：證明領取的「不是髒錢」或「乾淨的錢」

- pricacy pool 裡時做的 proof of innocence

  - 用「白名單」的方式
  - 所有人可以各自做自己的 Allow tree，但會紀錄你是以哪個 allow tree 來計算

---

# # Cryptography of Secret Sharing Scheme

---

# # Highly Perfrmant Dataflow in Stream-Orientd Programming in Rust

- pipeline + parallel + async

---
