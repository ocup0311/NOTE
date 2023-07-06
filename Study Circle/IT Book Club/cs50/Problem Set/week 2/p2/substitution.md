# [Substitution](https://cs50.harvard.edu/x/2021/psets/2/substitution/)

- 範例

  - key 26 個大寫字母

  ```shell
  $ ./substitution JTREKYAVOGDXPSNCUIZLFBMWHQ
  plaintext:  HELLO
  ciphertext: VKXXN
  ```

# 語法補充

- 初始化 array

  - 沒有初始化值，array 的項目不會被清理過，可能會是殘留的 data

  ```c
  // EX.
  int KEY[52];

  printf("%i", KEY[0]); // 32605
  ```

  - 將所有項目初始化為 0

  ```c
  int store[26] = { 0 };
  ```
