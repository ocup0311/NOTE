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

[implementing api pagination with nodejs, mongoose]: https://cloudnweb.dev/2021/04/pagination-nodejs-mongoose/
[fast and efficient pagination in mongodb]: https://www.codementor.io/@arpitbhayani/fast-and-efficient-pagination-in-mongodb-9095flbqr
[mongoose - what does the exec function do?]: https://stackoverflow.com/questions/31549857/mongoose-what-does-the-exec-function-do
[mongoose .exec()]: https://mongoosejs.com/docs/promises.html
[mongoose index]: https://mongoosejs.com/docs/guide.html#indexes
[mongodb create index]: https://stackoverflow.com/questions/31991710/mongodb-auto-create-index-for-new-collections
[龐大資料庫分頁方案 cursor-based pagination]: https://tec.xenby.com/36-%E9%BE%90%E5%A4%A7%E8%B3%87%E6%96%99%E5%BA%AB%E5%88%86%E9%A0%81%E6%96%B9%E6%A1%88-cursor-based-pagination
[mongodb pagination, fast & consistent]: https://medium.com/swlh/mongodb-pagination-fast-consistent-ece2a97070f3
[why token-based pagination performs better than offset based?]: https://betterprogramming.pub/why-token-based-pagination-performs-better-than-offset-based-465e1139bb33

<!-- ref -->

# DataBase Issue:

<!-- 1. Why Token-based Pagination Performs Better Than Offset Based? -->

- <details close>
  <summary>1. Why Token-based Pagination Performs Better Than Offset Based?</summary>

  > DATE: 9 (2022)

  > REF:
  >
  > 1. [Why Token-based Pagination Performs Better Than Offset Based?]
  > 2. [MongoDB Pagination, Fast & Consistent]
  > 3. [龐大資料庫分頁方案 Cursor-based pagination]
  > 4. [Fast and Efficient Pagination in MongoDB]
  > 5. [Implementing API Pagination with NodeJS, Mongoose]

  <!-- 參考內容 -->

  - <details close>
    <summary>參考內容</summary>

    - 1. MongoDB cursor

      - cursor 都是發送端(my server)自己產生的 object
      - `.find()`

        - mongoDB:

          - 回傳 cursor，再以`iterate`方式取得資料
          - 或直接以 `.toArray()` 撈資料，會直接回傳`所有資料`

          ```javascript
          // mongodb
          ;(async () => {
            const { MongoClient } = require('mongodb')
            const client = new MongoClient(MONGODB_URI)

            await client.connect()
            const db = client.db('collectionName')

            const x1 = db.collection('books').find()
            const y1 = await x1.toArray()
          })()
          ```

        - mongoose:

          - 回傳 data
          - 以 `.cursor()` 產生 cursor

          ```javascript
          ;(async () => {
            const Book = require('./models/book')
            const mongoose = require('mongoose')

            mongoose.connect(MONGODB_URI, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            })
            const db = mongoose.connection

            // 正常：
            const a = Book.find().cursor()

            // 正常：
            const b = await Book.find()
            const c = Book.find().cursor()

            // d.cursor is not a function：
            const d = await Book.find().exec()
            const e = d.cursor()
          })()
          ```

      > In MongoDB, when the find() method is used to find the documents present in the given collection, then this method returned a pointer which will points to the documents of the collection, now this pointer is known as cursor.

      > Note: If a cursor inactive for 10 min then MongoDB server will automatically close that cursor.

      > In MongoDB parlance, a cursor is an object that you can use to iterate through the results of a query. If you execute a query against a MongoDB server directly, the result is a cursor rather than a bunch of documents. Similarly, the MongoDB Node.js driver will return a cursor from find () . In most cases the cursor API is overkill, so mongoose hides it from you by default.

    - 2. [Mongodb create index]

      > REF: [mongoose index]

      - index VS 臨時 index

        - code 設定： 臨時 index

          - mongodb `db.collection.createIndex()`
          - mongoose `Schema.index()`：啟動時自動 `createIndex()`

        - 平台設定：index

      > But don't be afraid to call createIndex too often. The documentation guarantees that when an index with the same settings already exists, nothing will happen. So you can attach it to some common database operations executed by new users.

      - When your application starts up, Mongoose automatically calls createIndex for each defined index in your schema.

    - 3. [mongoose .exec()]

      > REF: [Mongoose - What does the exec function do?]

      - As far as functionality is concerned, these two are equivalent. However, we recommend using `.exec()` because that gives you better stack traces.

    - 4. Pagination: offset VS token

      - TODO: 在閱讀一次 [Implementing API Pagination with NodeJS, Mongoose]
      - offset:

        - 也就是 mongodb 中的 skip
        - 如 `cursor.skip(<offset>)`, `$skip`

      - token:

        - 以 `$gt` 或 `$lt` 來實作
        - 如 `.find({ _id: { $gt: ObjectId(ID) } })`

    </details>

  <!-- 問題集 -->

  - <details close>
    <summary>問題集</summary>

    - how mongodb cursor work
    - what is mongodb cursor
    - do i need to create a cursor or just find in mongodb
    - does mongoose schema.find() return a cursor
    - best practice of mongoose mongodb token pagination
    - mongoose document to data
    - mongodb, what's difference between temporary index & index
    - mongodb auto index

    </details>

  </details>
