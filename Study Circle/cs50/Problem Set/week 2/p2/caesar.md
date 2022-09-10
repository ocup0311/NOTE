# [Caesar’s algorithm](https://cs50.harvard.edu/x/2021/psets/2/caesar/#caesar)

- 範例

  ```shell
  $ ./caesar 13
  plaintext:  HELLO
  ciphertext: URYYB
  ```

- 語法問題：

  - 無法在執行後取得長度，再定義 string 長度
    - 三個可試解法：
      - Just define a big array which can take all possible strings you may want to put there
      - Use `realloc` to change the size of the array if you need more space
      - Use a pointer to a string and then change which string that pointer points to

  ```c
  string plaintext = get_string("plaintext: ");
  int x = strlen(plaintext);
  char ciphertext[x] = "";
  // Error：不能用變數
  ```

  - 因為是 string 是 pointer，所以是 by ref

  ```c
  string plaintext = get_string("plaintext: ");
  string ciphertext = plaintext;
  // ciphertext 只有賦予 plaintext 的 ref
  ```
