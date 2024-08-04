# # 行前準備

### ## 找題目

- Hacking Room / BOF

### ## 準備

- Database

  - PostgreSQL 與 ClickHouse

- K8s

  - Kubernetes Gateway API
  - Kubernetes operator

- Blockchain

  - Data Availability Sample（DAS）
  - ERC-4337 & AA (Account Abstraction) & smart contract accounts

### ## 小記

- PoWA：可以對使用 postgreSQL 的專案，進行`效能`分析，列出問題點
- Ubuntu Touch：另一個開源的手機 OS
- Diataxis：一種編寫技術文件的`系統方法`，它圍繞著使用者的需求而構建，並以清晰、簡潔和有效的方式編寫每種類型的文件 (分四部分：Tutorials、How-to Guides、Explanations、Reference)
- 大模型＋向量資料庫
- Langchain：開源框架，幫助開發者構建基於 LLMs 的 app
- Gemma：Google 開源的輕量級 LLM
- Sui：高性能的智能合約平台，旨在提供更高的可擴展性和低延遲的交易處理能力 (`Narwhal` + `Tusk` + `Shard` + `Move`) (`Zero Knowledge Login` + `Sponsored Transaction`)

---

# # [CNCF 開源貢獻新人指北](https://hackmd.io/SDxk6VMuTF-JoAEuJZgmMA)

- etcd 的 start 翻譯還很不完全
- openTelemetry 文件的翻譯
- 新版本的更新
- 參考以前的 PR 格式
- 網站

  - CloTributor
  - goodfirstissues.com
  - goodfirstissue.dev

- Good first issue：對初次貢獻者友善的 issue
- lifecyle：stale -> rotten
- 隨時要有做 rebase 的準備

- 建議做法

  - 搶著被指派：有些人會在 prow 輸入 `/assign` 查看有沒有機器人，有些 issue 會有機器人跳出來指定給他做
  - 很多都已經是已經有人提供好想法，只需按照他提供的想法修改即可
  - 只開 PR 很容易被無視，需要主動詢問溝通
  - 暫時無法解決，就果斷放棄

# # Kubernetes 在實務上的 CAP 定理

- 成本、效能、可用性

- SLOs/SLIs

  - SLOs (Service Level Objectives)

    - 服務提供的水準
    - EX. 達到 99% 的 Response time 低於 200ms

  - SLIs (Service Level Indicators)

    - 指標
    - Response time

- 常關注點：微服務 RPS
- PDB
- daemonset 要注意一次同時 pull image

- QoS

- 硬體資源比 VM 更需要巧妙的調度分配

  - CFS

    - CPU throttling
    - 一些人認為不要設定 CPU limit

- HPA vs VPA vs CPA

- KEDA (K8s Even-Drive Autoscalor)

  - 自動化管理 K8s 的策略，例如自動化調整 replicaset 指定的數量

- Kubecost

  - 成本可視化工具

# # DA 模組的核心：Data Availability Sampling 技術介紹 (＊)

- 可看講者的數篇文章

- 主要用來確認資料確實被發布，而不去管是不是能隨時取得

- 架構中的第二點

  - Monolithic
    - sequence + consensus + execute etc
  - ZKSync
    - x + Eth + y
  - MyRollup
    - x + Celestia + y

- 攻擊者可能會想專門攻擊某一小群 light client

  - 著手點可以將 client 的資安做好，讓攻擊者無法辨認出你

- Danksharding

- 三個面向的方法

  - Redundancy

    - Erasure Coding

      - 同比資料，client 多取幾次資料來做驗證，被騙機率就降低。但需要取太多次，成本會太高。因此藉由 Redundancy 使得可以取更少次資料就讓機率降到夠低

    - Commitment schemes

      - Merkle Tree
      - Polynomial Commitment (e.g. KZG)

        - self proving (相比 Merkle Tree 需要全節點幫忙驗證)
        - 成本高
        - 需要可姓任設置

      - 1D Encoding

        - k
        - 需要 50% 資料才能還原

      - 2D Encoding
        - sqrt(k)
        - 需要 75% 資料才能還原

    -

  - Sampling

    - validator: 2 row + 2 col
      - 如果攻擊者隱藏 25%，只有 1/16 個 validator 會上當

  - Network

    - 少人研究 p2p，還有很大的演進空間，大概有：

      - Gossip
      - Distributed Hash Table
      - Replicate

    - 挑戰

      - Robust
      - Privacy

- EigenDA

  - L2 還會再搞回去 L1

    - 用 bridge 的方式
    - 合約辦不到 DAS

  - 單純只用...

    - pure DA layer

  - 每個月固定第三週星期三有 meetup

# # MySQL innodb 如何使用索引

- 查下三層 page
-

# # The Etfereum Cancun Upgrade: A Smart Contract Developer's Perspective

- Transient storage

- ReentrancyGuard

  - 1 & 2 的 gas 比 0 & 1 小

- Beacon root

- EigenLayer's EigenPod

- 必須合約的部署＆取消，在同一筆交易執行，才能刪除已部署的 code

-

# # Argo CD Extension 在 UI 上也能做手工藝

- 藍綠發布

- 可幫忙做 RBAC 的驗證

# # What We Can Do with K8s Custom Controllers (＊)

# # FSFE

# # Adaptive Cluster - K8s Operator 5W1H

- CRD CR

- Runtime Logic

  - 至少要能看到 CR change

- 三種

  - Polling
  - Watch
  - ＊Informer

    - websocket 斷掉會自動重連
    - `sharedInformerFactory`
      - 讓整個共用一個 Informer instance
    - 可做到 cache

- Redhat Operator SDK

  - 幫忙做好架構
  - 只需告知我們想要觀察的資訊
  - CRD (by API Marker..)
  - OLM (operator lifecyle Manager)
  - 關於 HELM 的部分，比較不完全

# # 區塊鏈和加密技術如何使 AI 更去中心化和兼顧隱私安全

- layer 0: 跨鏈橋

- 以 LLM 的應用為例的探討

- 輸入內容沒有隱私 ＋ 無法確認背後是否提供你所選擇的模型

- ZKML & OPML

- 將浮點化為整數，降低 gas

- 研究顯示 GKR zkCNN 較適合

- 成功完成 GPT2 的驗證 --> zkp 可以證明 AI inference 的開頭

- FPVM

- Fully Homomorphic Encryption

  - ZAMA-Concrete ML

# # Shuld You Sitch to the New K8s Gateway API?

- Ingress + CRD -> Gateway API

- v1.0 後

  - Much more cabaple
  -
  -

- 優勢：Expressive (富有表現力)、extensible、role-oriented

- role-oriented -> 更加關注點分離？

- Merging with Service Mesh Interface (SMI) (GAMMA)

- 使用 ingress2gateway 來轉移 (APISIX 的工具)

# # Let's build llama 3: Source code explained from scratch (＊)

- 可以找一下他的影片介紹一些底層解讀

- Decoder only model

- 一次 input 一個 token

- re-scaling 比 re-centering 重要

- KV cache

  - Attention(Q,K,V)

# # WebAssembly 在零知識證明中的應用

- 前記：遠端直播時，微信設備一直有問題，最後改用 Google meet 即可

- 將 web3 需要的 ZKP 等，做成 WebAssembly 模塊，輕鬆移植供使用

- 因為效能好、因為 C 已經有現成的 repo 可以直接用

# # Boost Security in K8s with CIS Security Controls and Benchmarks

- CIS、NIST、ENISA

- GCB

- 可下載 CIS Benchmarks 參考其規定

- CIS Benchmarks

  - 有一條條告訴你每個改版，怎麼改，改的理由

  - Level

    - Level 1 的盡量都過
    - Level 2 的 by 業務場景

- 預設的 namespace 都不使用
- Kube-bench

  - 認為是追 CIS 相關工具追滿緊的一個專案

# # Diataxis

- Quaity

  - Functional quaity

    - 比較硬性的規定
    - EX. 16G mem

  - Deep quaity
    - 主觀的理解
    - EX. 適合用來 coding

- Diataxis 用來提升 Deep quaity

- 是一個 Craft (工藝)

- 從目標為 學習 或 工作 來做思考

- Tutorials、How-to Guides、Explanations、Reference

  - 四個部分，盡量不要在其中一個部分提及太多其他部分的內容，會喪失焦點 (EX. 在 How-to Guides 不要參雜 Explanations)

- How-to Guides (work)

  - 需設想到使用者在看每個步驟時的心理狀態
  - 要幫助使用者在每個步驟都進入心流，而不會又須回到上一步

- Tutorials (study)

  - 只領導使用者去透過做一些操作，自己去領悟
  - 並非把所有內容告知
  - 並非讓使用者完成達到某個 Guides

- Reference (work)

  - 重點在確保：真實、正確、權威
  - 不是讓人閱讀，而是讓人可以查到資訊
  - 讓使用者不需深入其中，但能立刻得到資訊

- Explanations (study)
  - 跟 How-to Guides 一樣，每一個 Explanations 都需先想好主題，讓此時只聚焦在一個主題，不發散

# # 雲端 GPU 共享系統

- K8s + Kubeflow
-

# # Introduction to Threshold signature schemes (＊)

- 可以看一下上一節 MPC 共筆
- MPC 的一個落地應用

- 一些保管私鑰的解方

  - Shamir Secret Sharing：私鑰拆開兩部分保管
  - Multi-keys：需同時需要幾把私鑰一起開
  - MPC(Multi-party Computation)：旨在讓私鑰從來不在 memory 出現過

- MPC + Digital Sibnature

  - 從 Gernerate -> Storage -> Sign，都沒讓私鑰完整出現過，從頭到尾都分開在不同 party

# # A short experience to perform Fuzzing and Formal Verification

- property & invariant

  - property：描述任何東西的行為
  - invariant：更進一步的測試規格

- SMTChecker
- Halmos
