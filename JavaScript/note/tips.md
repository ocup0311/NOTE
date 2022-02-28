# [When to use new Array](https://coderwall.com/p/h4xm0w/why-never-use-new-array-in-javascript)

> DATE: 2.2022

**[ 改變 ]** 此篇討論串改變我的想法：

永遠使用 `[ ]` 建立 array

---> 只在建立已知長度，各項相同的 array 使用 `new Array(length).fill(item)`，其他時機依然使用 `[ ]`

- 建立 [ ] 後再 push 會不斷擴容造成浪費
- 較為乾淨

![](/JavaScript/image/When_to_use_new_Array.png)
