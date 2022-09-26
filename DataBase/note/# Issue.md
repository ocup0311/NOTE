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

[mongodb create index]: https://stackoverflow.com/questions/31991710/mongodb-auto-create-index-for-new-collections
[龐大資料庫分頁方案 cursor-based pagination]: https://tec.xenby.com/36-%E9%BE%90%E5%A4%A7%E8%B3%87%E6%96%99%E5%BA%AB%E5%88%86%E9%A0%81%E6%96%B9%E6%A1%88-cursor-based-pagination
[mongodb pagination, fast & consistent]: https://medium.com/swlh/mongodb-pagination-fast-consistent-ece2a97070f3
[why token-based pagination performs better than offset based?]: https://betterprogramming.pub/why-token-based-pagination-performs-better-than-offset-based-465e1139bb33

<!-- ref -->

<!-- 1. Why Token-based Pagination Performs Better Than Offset Based? -->

- <details close>
    <summary>1. Why Token-based Pagination Performs Better Than Offset Based?</summary>

  > DATE: 9.2022

  > REF:
  >
  > 1. [Why Token-based Pagination Performs Better Than Offset Based?]
  > 2. [MongoDB Pagination, Fast & Consistent]
  > 3. [龐大資料庫分頁方案 Cursor-based pagination]

  - In MongoDB, when the find() method is used to find the documents present in the given collection, then this method returned a pointer which will points to the documents of the collection, now this pointer is known as cursor.

  - In MongoDB parlance, a cursoris an object that you can use to iterate through the results of a query. If you execute a query against a MongoDB server directly, the result is a cursor rather than a bunch of documents. Similarly, the MongoDB Node.js driver will return a cursor from find () . In most cases the cursor API is overkill, so mongoose hides it from you by default.

  - [Mongodb create index]

    - But don't be afraid to call createIndex too often. The documentation guarantees that when an index with the same settings already exists, nothing will happen. So you can attach it to some common database operations executed by new users.

    </details>
