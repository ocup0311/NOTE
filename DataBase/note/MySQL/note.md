##### <!-- 收起 -->

<style> 
.imgBox{
  display: flex; 
  flex-direction: column; 
  margin: 5%; 
  justify-content: center;
  border: 2px solid black;
}
</style>

<!------------  style  ------------>

<!----------- ref start ----------->

<!------------ ref end ------------>

# MySQL

### # 簡介

- 定義：一般會把 `DBMS + Database` 這兩部分合稱 Database

  - DBMS (Database Management System)

    - RDBMS： MySQL、Oracle、Microsoft SQL Server 等
    - NoSQL DBMS：MongoDB、Cassandra、Redis 等

  - SQL (Structured Query Language)
    - 用於溝通 Relational database 的標準語言

  <br>

  ![](https://i.imgur.com/KydSI1d.png)

- 安裝

  - 以`Homebrew`安裝
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
    ![](https://i.imgur.com/vmIzzV0.png)

  - ## **Docker** 安裝的解法：
    - <mark>TODO:</mark> 待解決，如何不使用 desktop 在 mac 上使用 docker

### # 慣用方法

| O   | X   | 原因 |
| --- | --- | ---- |

### # 注意默認值

### # 延伸閱讀

### # 待解決問題集中區

# TODO
