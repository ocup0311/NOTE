###### <!-- ref -->

[rxjs with redux?]: https://blog.techbridge.cc/2017/12/08/rxjs/
[is redux still necessary with apollo graphql?]: https://leapgraph.com/graphql-Redux-apollo/
[graphql with redux]: https://medium.com/nerd-for-tech/how-to-use-graphql-with-Redux-50ad20ec051f
[what is the difference between promises and observables?]: https://stackoverflow.com/questions/37364973/what-is-the-difference-between-promises-and-observables
[網站前端打 API 時把密碼加密，有意義嗎？]: https://blog.huli.tw/2023/01/10/security-of-encrypt-or-hash-password-in-client-side/

 <!-- ref -->

# 前端議題

> DATE: 4 (2022)

<!-- RxJS with Redux? -->

- <details close>
  <summary>RxJS with Redux?</summary>

  - REF:

    - [What is the difference between Promises and Observables?]
    - [RxJS with Redux?]

  - 初略了解後，目前覺得 Redux 處理的部分跟 RxJS 不太一樣。
    Redux 是處理前端的狀態流，但非同步的資料要如何整合進 Redux 依然需要處理。
    所以有各種方案用來處理這個部分。而其中一種就是整合了 RxJS 的 `redux-observable`。

  - pull vs push system

  </details>

<!-- IS Redux STILL NECESSARY WITH APOLLO GRAPHQL? -->

- <details close>
  <summary>IS Redux STILL NECESSARY WITH APOLLO GRAPHQL?</summary>

  - REF:

    - [GraphQL with Redux]
    - [IS Redux STILL NECESSARY WITH APOLLO GRAPHQL?]

  - 不能說用了 GraphQL 就不需要 Redux。但是用了 Appollo Client，他就把原本 Redux 在管理狀態的事情也接來做了，所以就不需要 Redux 了

  </details>

<!-- 網站前端打 API 時把密碼加密，有意義嗎？ -->

- <details close>
  <summary>網站前端打 API 時把密碼加密，有意義嗎？</summary>

  - REF:
    - [網站前端打 API 時把密碼加密，有意義嗎？]

  </details>
