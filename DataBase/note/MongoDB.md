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

[full text search engines]: https://www.mongodb.com/basics/full-text-search
[nosql 數據建模技術]: https://coolshell.cn/articles/7270.html
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

### 慣用方法

| O                         | X            | 原因               |
| ------------------------- | ------------ | ------------------ |
| `updateMany`, `updateOne` | ~~`update`~~ | Ｘ會覆蓋掉整個 doc |
| `replaceOne`              | ~~`update`~~ | Ｏ一次覆蓋一筆 doc |
| `insertMany`, `insertOne` | ~~`insert`~~ | Ｏ返回 insertID    |

### 注意默認值

- `insertMany`(`{ordered:true}`)：照順序 insert，遇到 err 則後半段停止

### Index

- 系統預設會建立一個以`_id`排序的 index

- `unique`：所有的 doc，該 `index key` 的 `value` 不能有重複

  ```shell
  # EX.
  # 若有重複 title + year 組合，則無法建立此 index
  # index 建立後，若給他重複的 title + year 組合，則插入或更新會失敗
  > db.movie.createIndex({ title: 1, year:1 }, { unique: true })

  # EX. 重複 title + year 組合：
  # A: { _id: 1, title: "La vita è bella", year:"1997" }
  # B: { _id: 2, title: "La vita è bella", year:"1997" }
  # --> A, B 重複
  ```

- TTL Indexes

  - `expireAfterSeconds`

  ```shell
  # 當超過該 doc 的 createAt 10 秒後，會自動刪除該 doc
  > db.people.createIndex({ createAt: 1 }, { expireAfterSeconds: 10 })
  ```

- <mark>Q: 如何查詢某個更新，需要維護幾個 index?</mark>
- <mark>Q: 為何當回傳資料數量太多筆時，使用 index 反而變慢？因為分頁的關係，導致去找 index 的次數變多？因為 index 並非複製一份 doc，所以每筆都需再回 collection 撈？</mark>

- 範例：

- 建立：`db.movie.createIndex({ year: 1 })`
- 刪除：`db.movie.dropIndex({ year: 1 })`
- 查詢：`db.movie.getIndexes()`

  - 未建立 index

  ```shell
  > db.movie.explain('executionStats').find({ year: { $gte: 2015 } })
  {
    ...,
    executionStats: {
      executionSuccess: true,
      nReturned: 747,
      executionTimeMillis: 16,
      totalKeysExamined: 0,
      totalDocsExamined: 28795,
      executionStages: {
        stage: 'COLLSCAN',      # --> 直接去 collection 查詢
        filter: { year: { '$gte': 2015 } },
        nReturned: 747,
        executionTimeMillisEstimate: 0,
        works: 28797,
        advanced: 747,
        needTime: 28049,
        needYield: 0,
        saveState: 28,
        restoreState: 28,
        isEOF: 1,
        direction: 'forward',
        docsExamined: 28795
      }
    },
    ...
  }
  ```

  - 建立以 year 排序的 index

  ```shell
  > db.movie.createIndex({ year: 1 })
  year_1

  > db.movie.explain('executionStats').find({ year: { $gte: 2015 } })
  {
    ...,
    executionStats: {
      executionSuccess: true,
      nReturned: 747,
      executionTimeMillis: 1,
      totalKeysExamined: 747,
      totalDocsExamined: 747,
      executionStages: {
        stage: 'FETCH',
        nReturned: 747,
        executionTimeMillisEstimate: 0,
        works: 748,
        advanced: 747,
        needTime: 0,
        needYield: 0,
        saveState: 0,
        restoreState: 0,
        isEOF: 1,
        docsExamined: 747,
        alreadyHasObj: 0,
        inputStage: {
          stage: 'IXSCAN',        # --> 改用 index 查詢
          nReturned: 747,
          executionTimeMillisEstimate: 0,
          works: 748,             # --> 所需步驟變少
          advanced: 747,
          needTime: 0,
          needYield: 0,
          saveState: 0,
          restoreState: 0,
          isEOF: 1,
          keyPattern: { year: 1 },
          indexName: 'year_1',
          isMultiKey: false,
          multiKeyPaths: { year: [] },
          isUnique: false,
          isSparse: false,
          isPartial: false,
          indexVersion: 2,
          direction: 'forward',
          indexBounds: { year: [ '[2015, inf.0]' ] },
          keysExamined: 747,
          seeks: 1,
          dupsTested: 0,
          dupsDropped: 0
        }
      }
    },
    ...
  }
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

- `mongoimport`

  - `-d`：database
  - `-c`：collection
  - `--jsonArray`：檔案裡的資料為多筆 doc
  - `--drop`：先 drop 該 collection 再重建

  ```shell
  # EX.
  $ mongoimport < .json 路徑 > -d < database name > -c < collection name > --jsonArray --drop
  ```

- `$size`+`$gt`

  - `$size`：array length
  - `$gt`：大於
  - `$expr`：用於 aggregation expressions

  ```shell
  # EX.

  # 尋找有 2 個 actors 的
  > db.movie.find({ actors: { $size: 2 } })

  # 尋找大於 2 個 actors 的
  # 1. 錯誤寫法
  > db.movie.find({ actors: { $size: { $gt: 2 } } })
  # 2. 正確寫法
  > db.movie.find({ $expr: { $gt: [{ $size: '$actors' }, 2] } })
  ```

- `sort` 是對 `find` 結果進行排序，即便放在 `limit` 之後也一樣

  ```shell
  # EX. 以下兩者結果相同
  > db.movie.find().sort({ imdb_score: 1 }).limit(3)
  > db.movie.find().limit(3).sort({ imdb_score: 1 })

  # 使用 aggregate 才會依照順序執行
  # 先 { $limit: 3 } 再進行 { $sort: { imdb_score: 1 } }
  > db.movie.aggregate([{ $limit: 3 }, { $sort: { imdb_score: 1 } }])
  ```

- `$`：update 時，find 出來的 `$` 為第一層 array 的 index

  ```shell
  # data
  # {
  #   _id: 8,
  #   B: [
  #     { _id: 16, C: [ { _id: 15 }, { _id: 39 } ] },
  #     { _id: 14, C: [ { _id: 37 }, { _id: 34 } ] }
  #   ]
  # }

  # 下列的 $ = 1
  # 因為 "B.C._id":37 在 B[1]
  > db.test.updateOne({ 'B.C._id': 37 }, { $set: { 'B.$.C.2.catch': true } })
  {
    _id: 8,
    B: [
      { _id: 16, C: [ { _id: 15 }, { _id: 39 } ] },
      { _id: 14, C: [ { _id: 37 }, { _id: 34 }, {catch: true} ] }
    ]
  }
  ```

- `db.test.explain("executionStats")`

```shell
# 可回傳 DB 執行的相關資訊，如執行時間等
> db.movie.explain('executionStats').find({ year: { $gte: 2015 } })
{
  ...,
  executionStats: {
    executionSuccess: true,
    nReturned: 747,
    executionTimeMillis: 16,
    totalKeysExamined: 0,
    totalDocsExamined: 28795,
    executionStages: {
      stage: 'COLLSCAN',
      filter: { year: { '$gte': 2015 } },
      nReturned: 747,
      executionTimeMillisEstimate: 0,
      works: 28797,
      advanced: 747,
      needTime: 28049,
      needYield: 0,
      saveState: 28,
      restoreState: 28,
      isEOF: 1,
      direction: 'forward',
      docsExamined: 28795
    }
  },
  ...
}
```

### 延伸閱讀

- [Everything You Know About MongoDB is Wrong!]
- [NOSQL 數據建模技術]
  - `Document database` group indexes by field `names`, as opposed to [Full Text Search Engines] that group indexes by field `values`.

# 暫存 Linux

- `ps`
  - Process Status
- `grep`
  - g/re/p（globally search a regular expression and print)
  - `grep xxxx`：過濾出 xxxx
  - `grep -v yyyy`：反向過濾 xxxx （去除 yyyy）
  - `grep -v grep`：去除掉 `grep` 本身產生的 `precess`
