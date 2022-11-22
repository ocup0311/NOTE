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

[mongodb limits and thresholds]: https://www.mongodb.com/docs/manual/reference/limits/
[everything you know about mongodb is wrong!]: https://www.mongodb.com/developer/products/mongodb/everything-you-know-is-wrong/
[bson1]: https://www.mongodb.com/docs/manual/reference/bson-types/
[bson2]: https://www.mongodb.com/basics/bson

 <!-- ref -->

# MongoDB

### 簡介

- Build for Speed
- Rich Document based queries
- Full index support
- Map/reduce for aggregation
- Replication and Failover
- Auto Sharding

### BSON

> REF: [BSON1] | [BSON2]

- binary encoded Javascript Object Notation (JSON)

- 官網範例

  ```javascript
  // JSON:
  {"hello": "world"} →

  // BSON:
  \x16\x00\x00\x00           // total document size
  \x02                       // 0x02 = type String
  hello\x00                  // field name
  \x06\x00\x00\x00world\x00  // field value
  \x00                       // 0x00 = type EOO ('end of object')
  ```

- 測試範例

  ```javascript
  // 範例處理：
  const BSON = require('bson')
  const json = JSON.stringify(data)
  const bson = BSON.serialize(data)
  ```

  - `0x02`: String

    ```javascript
    const data = 'ab'
    // [17 00 00 00] [02] [30 00] [02 00 00 00] [61 00] [02] [31 00] [02 00 00 00] [62 00] [00]
    // [full size]  [str]  [k:0]  [value size]  [v:"a"] [str] [k:1]  [value size]  [v:"b"][end]

    const data = ['a', 'b']
    // [17 00 00 00] [02] [30 00] [02 00 00 00] [61 00] [02] [31 00] [02 00 00 00] [62 00] [00]
    ```

  - `0x03`: Object

    ```javascript
    const data = { ab: 'ab' }
    // [10 00 00 00] [02] [61 62 00] [03 00 00 00] [61 62 00] [00]
    // [full size]  [str]  [key:ab]  [value size] [value:"ab"] [end]
    ```

  - `0x04`: Array

    ```javascript
    const data = { ab: ['ab'] }
    // [18 00 00 00] [04] [61 62 00] [0f 00 00 00] [02] [30 00] [03 00 00 00] [61 62 00] [00] [00]
    // [full size]   [obj]  [k:ab] [obj value size][str] [k:0] [arr value size][v:"ab"] [end] [end]
    ```

  - `0x07`: ObjectId

    ```javascript
    const data = { a: new mongoose.Types.ObjectId('61360a570af2d32e2c7c55d5') }
    // [14 00 00 00] [07] [61 00] [61 36 0a 57 0a f2 d3 2e 2c 7c 55 d5] [00]
    // [full size]   [id] [key:a] [value: id(61360a570af2d32e2c7c55d5)] [end]
    ```

  - `0x09`: Date

    ```javascript
    const data = { ab: new Date(1) }
    // [11 00 00 00] [09] [61 62 00] [01 00 00 00 00 00 00 00] [00]
    // [full size]  [date]  [key:ab]     [value: 1]            [end]

    const data = { ab: new Date(MAX_DATE) }
    // [11 00 00 00] [09] [61 62 00] [00 00 dc c2 08 b2 1e 00] [00]
    // [full size]  [date]  [key:ab] [value: 8640000000000000] [end]
    ```

  - `0x10`: Number

    ```javascript
    const data = { ab: 1 }
    // [0d 00 00 00] [10] [61 62 00] [01 00 00 00] [00]
    // [full size]  [num]  [key:ab]   [value:1]    [end]
    ```

### 其他

- Within a single `mongod` instance, `timestamp` values are always unique.
- 新增時，若 `_id` 已存在該 `collection`，則新增失敗
- `mongosh` 是以 `TS` 撰寫的專案

- `atomic operators`

  - 如 `$set`, `$gt`.. 等等

  ```shell
  # EX.
  > db.user.updateOne({ _id: 1 }, { $set: { name: 'B' } })
  ```

- `projection`

  - 設定需要獲取的欄位 ( `_id` 默認 1 )

  ```shell
  # EX.
  > db.user.find({})
  [{ _id: 1, name: 'A', age: 30 }]
  > db.user.find({},{name: 1})
  [{ _id: 1, name: 'A' }]
  > db.user.find({},{name: 1, _id: 0})
  [{ name: 'A' }]
  ```

- [MongoDB Limits and Thresholds]
  - 16 MB / doc
  - 100 levels of nesting

### 延伸閱讀

- [Everything You Know About MongoDB is Wrong!]

# 暫存 Linux

- `ps`
  - Process Status
- `grep`
  - g/re/p（globally search a regular expression and print)
  - `grep xxxx`：過濾出 xxxx
  - `grep -v yyyy`：反向過濾 xxxx （去除 yyyy）
  - `grep -v grep`：去除掉 `grep` 本身產生的 `precess`
