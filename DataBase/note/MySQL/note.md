##### <!-- 收起 -->

<!----------- ref start ----------->

[MySQL 覆蓋索引詳解]: https://juejin.cn/post/6844903967365791752
[MySQL 面試：談談你對聚簇索引的理解]: https://blog.csdn.net/zhizhengguan/article/details/120834883?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522168785250216800182784361%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=168785250216800182784361&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-2-120834883-null-null.142^v88^koosearch_v1,239^v2^insert_chatgpt&utm_term=%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95&spm=1018.2226.3001.4187
[詳解聚簇索引]: https://blog.csdn.net/crazzy_lp/article/details/84650621?ops_request_misc=&request_id=&biz_id=102&utm_term=%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-1-84650621.142^v88^koosearch_v1,239^v2^insert_chatgpt&spm=1018.2226.3001.4187
[MySQL 底層為什麼要選用 B+樹作為索引的數據結構呢？]: https://blog.csdn.net/cckevincyh/article/details/119003282?spm=1001.2014.3001.5501
[平衡二叉樹、B 樹、B+樹、B*樹理解其中一種你就都明白了]: https://zhuanlan.zhihu.com/p/27700617
[資料庫層的核心 - 索引結構演化論 B+樹]: https://mark-lin.com/posts/20190911/
[聚簇索引]: https://blog.csdn.net/taoqilin/article/details/121230649?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522168785250216800182784361%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=168785250216800182784361&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-121230649-null-null.142^v88^koosearch_v1,239^v2^insert_chatgpt&utm_term=%E8%81%9A%E7%B0%87%E7%B4%A2%E5%BC%95&spm=1018.2226.3001.4187
[MySQL 開發規範參考]: https://mp.weixin.qq.com/s?__biz=MzUzNzAzMTc3MA==&mid=2247484130&idx=1&sn=4bae9fdac414a5ee3157b2f9d94f5592&scene=21#wechat_redirect
[Should You Run Your Database in Docker?]: https://vsupalov.com/database-in-docker/

<!------------ ref end ------------>

# MySQL

## # <mark>待整理筆記區</mark>

- 快速回憶

  - 指令

    - `SELECT DATABASE();`：查詢目前正在 use 的 DB

    - `DELIMITER symbol`：更改結尾的符號

      - 當前環境生效，若 exit 再回來則回覆成 `;`

      ```sql
      # EX. 原本用 ; 結尾
      > SELECT * FROM users;

      # 改成用 # 結尾
      > DELIMITER #
      > SELECT * FROM users#

      # exit 後恢復 ;
      > exit
      $ mysql -r root -p
      > SELECT * FROM users;
      ```

    - `DESCRIBE table;`：秀出該 table 的樣貌

    - `SHOW WARNINGS;`：列出上一個操作所造成的 Error 或 Warning

    -

  - 常識

    - **Column** 欄位、**Row** 資料
    - Type 三大類：**Numeric**、**String**、**Date**

  - 注意

    - `INSERT INTO`

      - `INSERT INTO table(col1, col2) VALUES(col1, col2);`，是按照順序來進行配對 column
      - 可一次 INSERT 多筆

    - `AUTO_INCREMENT` & `PRIMARY KEY`

      - 只能有一個 column 設置 `AUTO_INCREMENT`，並且一定要設置為 KEY (PRIMARY 或 UNIQUE)
      - 若沒有其他 column 被設置為 PK，則此 column 就會直接成為 PK
      - 可以使用 `PRIMARY KEY(col1, col2)`，跟其他 column 一起成為 Composite Primary Keys

    - `UNIQUE`

      - 允許多筆資料都是 NULL

  ![](./src/image/SQL_cheat_sheet.jpeg)

-

## # 簡介

- 定義：一般會把 `DBMS + Database` 這兩部分合稱 Database

  - DBMS (Database Management System)

    - RDBMS： MySQL、Oracle、Microsoft SQL Server 等
    - NoSQL DBMS：MongoDB、Cassandra、Redis 等

  - SQL (Structured Query Language)
    - 用於溝通 Relational database 的標準語言

  <br>

  ![](https://i.imgur.com/KydSI1d.png)

## # 安裝

<mark>TODO:</mark> 再修改整理

<!-- - 以`Homebrew`安裝
- 以`docker`啟動
- `mysql_secure_installation`進行安全設置

  - 設定每次連線所需的密碼
  - 設定是否開放遠端連線 --NO-> 只能在本機連線
  - 設定是否開放 test user --NO-> 只能用 root 連線

- `mysql -u root -p`進入 MySQL 介面

  - `-u <user>`：以該 user 身份執行
  - `-p`：輸入密碼

- chatGPT ref
  ![](https://i.imgur.com/1uue1fp.png)
  ![](https://i.imgur.com/58eyRt2.png)
  ![](https://i.imgur.com/vmIzzV0.png) -->

## # 慣用方法

| O   | X   | 原因 |
| --- | --- | ---- |

## # 注意默認值

## # 問題集中區

<!-- Composite Primary Keys -->

- <details close>
  <summary>Composite Primary Keys</summary>

  <!-- AUTO_INCREMENT VS Composite Primary Keys -->

  - <details close>
    <summary>在使用 <code>AUTO_INCREMENT</code> 情況下，再設置 <b>Composite Primary Keys</b> 似乎沒有意義？</summary>

    - 是，因為 `AUTO_INCREMENT` 的 column 的每筆資料一定會不同

    </details>

  <!-- 電商限購商品 VS Composite Primary Keys -->

  - <details close>
    <summary>電商希望客戶只能購買一件同商品時，會用 <b>Composite Primary Keys</b> 來達成嗎？</summary>

    - 多：通常會在後端處理，因為這類型活動很難在一開始就設定好 DB

    </details>

  </details>

<!-- 生產環境 VS DELETE  -->

- <details close>
  <summary>生產環境，有什麼情況還是會用<code>DELETE</code>嗎？</summary>

  - 可能有些資料沒必要被救回，且資料庫資源有限，就會直接用 `DELETE`

  </details>

<!-- Table 應該都用複數？ -->

- <details close>
  <summary>Table 應該都用複數？</summary>

  - 是，MongoDB 還會自動幫你改成複數

  </details>

---

## # 其他補充

<!-- 注意事項 -->

- 注意事項：

<!-- 小技巧 -->

- 小技巧：

  <!-- UPDATE 技巧 -->

  - <details close>
    <summary><code>UPDATE</code>技巧</summary>

    - 可以先 `SELECT` 查看 `WHERE` 的條件是否符合需求，再將其改為 `UPDATE`

    </details>

<!-- 小工具 -->

- 小工具：

  <!-- 學習工具 -->

  - <details close>
    <summary>學習工具</summary>

    </details>

  <!-- 開發工具 -->

  - <details close>
    <summary>開發工具</summary>

    </details>

<!-- 補充學習 -->

- 補充學習：

  <!-- 文件 -->

  - <details close>
    <summary>文件</summary>

    </details>

  <!-- 範例研究 -->

  - <details close>
    <summary>範例研究</summary>

    </details>

---

## # 踩雷實錄

---

## # 延伸討論

<!-- Database in Docker? -->

- <details close>
  <summary>Database in Docker?</summary>

  - [Should You Run Your Database in Docker?]

  </details>

<!-- MySQL 開發規範研究 -->

- <details close>
  <summary>MySQL 開發規範研究</summary>

  - [MySQL 開發規範參考]

    - B+ Tree

      - [資料庫層的核心 - 索引結構演化論 B+樹]
      - [平衡二叉樹、B 樹、B+樹、B*樹理解其中一種你就都明白了]
      - [MySQL 底層為什麼要選用 B+樹作為索引的數據結構呢？]

    - Clustered Index

      - 一個 table 只能有一個 Clustered Index，所以應該慎選要給哪個 key 用，以發揮最大效能利益
      - REF

        - [聚簇索引]
        - [詳解聚簇索引]
        - [MySQL 面試：談談你對聚簇索引的理解]

    - Covering Index

      - 前提要是 Clustered Index
      - REF

        - [MySQL 覆蓋索引詳解]

  </details>

---
