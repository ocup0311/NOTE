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

[筆記：從零開始學架構]: https://hackmd.io/@Rance/r1suwS-4H
[書籍：從零開始學架構：照著做，你也能成為架構師]: https://www.books.com.tw/products/CN11583557
[課程：從 0 開始學架構]: https://time.geekbang.org/column/intro/81
[筆記：高性能 DB 架構設計(RDBMS / NoSQL / Cache)]: https://godleon.github.io/blog/Architecture_Design/Architecture-Design-High-Performance-db-nosql-cache/
[Unlocking the Power of JunoDB: PayPal’s Key-Value Store Goes Open-Source]: https://medium.com/paypal-tech/unlocking-the-power-of-junodb-paypals-key-value-store-goes-open-source-ee85f935bdc1
[How PayPal Built a Database that serves 350 Billion Requests Per Day]: https://blog.quastor.org/p/paypal-built-database-serves-350-billion-requests-per-day
[Github-junodb]: https://github.com/paypal/junodb
[implementing api pagination with nodejs, mongoose]: https://cloudnweb.dev/2021/04/pagination-nodejs-mongoose/
[fast and efficient pagination in mongodb]: https://www.codementor.io/@arpitbhayani/fast-and-efficient-pagination-in-mongodb-9095flbqr
[mongoose - what does the exec function do?]: https://stackoverflow.com/questions/31549857/mongoose-what-does-the-exec-function-do
[mongoose .exec()]: https://mongoosejs.com/docs/promises.html
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

    - 2. [mongoose .exec()]

      > REF: [Mongoose - What does the exec function do?]

      - As far as functionality is concerned, these two are equivalent. However, we recommend using `.exec()` because that gives you better stack traces.

    - 3. Pagination: offset VS token

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

<!-- 2. 高性能 DB 架構設計(RDBMS / NoSQL / Cache) -->

- <details close>
  <summary>2. 高性能 DB 架構設計(RDBMS / NoSQL / Cache)</summary>

  - [課程：從 0 開始學架構]
  - [書籍：從零開始學架構：照著做，你也能成為架構師]
  - [筆記：高性能 DB 架構設計(RDBMS / NoSQL / Cache)]
  - [筆記：從零開始學架構]

  </details>

<!-- 3. 實作 shard 時，一致性問題 -->

- <details close>
  <summary>3. 實作 shard 時，JOIN 問題</summary>

  - 可參考 microservices 的 API gateway ，by domain 區分的 data 間整合不會有 JOIN 這件事

  - 若不能 by domain 區分，可往兩個方向探討為什麼要 JOIN (aggregation) ：

    - OLTP? 那可以去尋求 `trino`, `clickhouse` 這種方案
    - API or any client...的像是 `pinterest` 就是用 `hbase` 丟了一大多東西做 cache 之類

  </details>

# News

<!-- 1. How PayPal Built a Database that serves 350 Billion Requests Per Day -->

- <details close>
  <summary>1. How PayPal Built a Database that serves 350 Billion Requests Per Day</summary>

  - [How PayPal Built a Database that serves 350 Billion Requests Per Day]
  - [Unlocking the Power of JunoDB: PayPal’s Key-Value Store Goes Open-Source]
  - [Github-junodb]

  </details>
