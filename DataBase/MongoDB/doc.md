# MongoDB DOC 隨筆

- 每一個 collection 都有一個 UUID

  - 可用`db.getCollectionInfos()`或是`listCollections`來查詢
  - `listCollections`範例

    - <mark>TODO:bug?</mark> 不知為何 `filter: { 'info.readOnly': false }` 與 `nameOnly: true` 同時使用會沒有任何結果

      ```js
      // 格式：
      db.runCommand(
        {
          listCollections: 1,
          filter: <document>,
          nameOnly: <boolean>,
          authorizedCollections: <boolean>,
          comment: <any>
        }
      )
      ```
