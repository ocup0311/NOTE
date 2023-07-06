# [Caesar’s algorithm](https://cs50.harvard.edu/x/2021/psets/2/caesar/#caesar)

## # 範例

```shell
$ ./caesar 13
plaintext:  HELLO
ciphertext: URYYB
```

## # 語法問題：

- 三個可能 unknown size array 解法：

  - Just define a big array which can take all possible strings you may want to put there
  - Use `realloc` to change the size of the array if you need more space
  - Use a pointer to a string and then change which string that pointer points to

- (X) ~~無法在執行後取得長度，再定義 string 長度~~

  - 可以

  ```c
  string plaintext = get_string("plaintext: ");
  int x = strlen(plaintext);
  char ciphertext[x] = "";
  ```

- 因為是 string 是 pointer，所以是 by ref

  ```c
  string plaintext = get_string("plaintext: ");
  string ciphertext = plaintext;
  // ciphertext 只有賦予 plaintext 的 ref
  ```

- [Array Size](https://stackoverflow.com/questions/37538/how-do-i-determine-the-size-of-my-array-in-c)

- [2D Array 參數定義](https://stackoverflow.com/questions/3911400/how-to-pass-2d-array-matrix-in-a-function-in-c)

- [isdigit( ) 用法](https://stackoverflow.com/questions/20335977/isalpha-and-isdigit-always-return-0)

  - 參數為 `char`，若要判斷多位數，必須分開每個位數做判斷
