### Q1: include

- `#include`的使用，只要 parent 有 #include，則 child 也可使用

  - EX. `main.c #include "lib1.h"` & `lib1.h #include "lib2.h"`，則 main.c 中也可使用 lib2

### Q2: lib.h vs lib.c

- lib.c 與 lib.h 的關係

  - 可用兩種方式來進行綁定：

    - (1)以相同檔案名稱來綁定 (EX. lib.h & lib.c)
    - (2) 使用`#include` (EX. 在 lib2.c 中 #include "lib1.h")

  - 而欲使用該 lib，則只需 #include "lib.h" 即可使用

  ![](https://i.imgur.com/1wd2J4f.jpg)

  - <mark>TODO:</mark> 研究 lib.o 是什麼

- lib.c 與 lib.h 分離測試：

  - 測試結果：

    - 是否分離，memory 的配置並無差異
    - 看似都是在編譯時，無論使用 fn 與否，都已將該內容放進 text

  - main 未調用 fn()

    - 全寫在 lib.h

    ```sh
    text    data     bss     dec     hex filename
    1245     544       8    1797     705 mm1
    ```

    - 使用 lib.c 分離

    ```sh
    text    data     bss     dec     hex filename
    1245     544       8    1797     705 mm1
    ```

  - main 調用 fn()

    - 全寫在 lib.h

    ```sh
    text    data     bss     dec     hex filename
    1261     544       8    1813     715 mm1
    ```

    - 使用 lib.c 分離

    ```sh
    text    data     bss     dec     hex filename
    1261     544       8    1813     715 mm1
    ```

  - 2, 3 次調用 fn()

    ```sh
    text    data     bss     dec     hex filename
    1277     544       8    1829     725 mm1
    ```

  - 4, 5 次調用 fn()

    ```sh
    text    data     bss     dec     hex filename
    1293     544       8    1845     735 mm1
    ```

### Q3: bmp scanlines

- scanlines 的 padding 需要兩次`% 4`，是因為第一次的結果會有`0`的情況。

![](https://i.imgur.com/8xfSpzB.png)
![](https://i.imgur.com/5QlajZx.png)

### Q4: fseek()

- 用來移動某個已開啟的 file 的 pointer。(i.e. SEEK_CUR)
  - 文件頭（SEEK_SET）
  - 當前位置（SEEK_CUR）
  - 文件尾（SEEK_END）

### Q5: `__attribute__` & `__packed__`

- 範例：

  ```c
  // EX.
  typedef struct
  {
    BYTE  rgbtBlue;
    BYTE  rgbtGreen;
    BYTE  rgbtRed;
  } __attribute__((__packed__))
  RGBTRIPLE;

  // 也可寫作：
  typedef struct __attribute__((__packed__))
  {
    BYTE  rgbtBlue;
    BYTE  rgbtGreen;
    BYTE  rgbtRed;
  }
  RGBTRIPLE;
  ```

- `__attribute__`可用來設定一些參數 ( EX.`__packed__` )。是 GCC 編譯器的一個擴展，可以用於指定結構體、聲明或函數的特殊屬性。它可以用於設置結構體的佈局、設置函數的傳參方式、設置函數的不可覆蓋性、設置函數的優化級別等。
- `__packed__`：指定結構體中的成員按照在程式碼中出現的順序進行實際佈局，而不進行字體對齊。

  ![](https://i.imgur.com/2qgOYVO.png)

### Q6: 為什麼可以 fread 到 BITMAPFILEHEADER 中?

- C 語言的 struct 是整塊在同一空間的，並按照順序存在。
- 以上述範例`RGBTRIPLE`的情況為例，假設該變數的起點為 0x7ff7be000000，那麼 `rgbtBlue` 存在 0x7ff7be000000 ~ 0x7ff7be000007，`rgbtGreen` 存在 0x7ff7be000008 ~ 0x7ff7be00000f，`rgbtRed` 存在 0x7ff7be000010 ~ 0x7ff7be000017

### Q7: `optind` & `getopt()`

- `optind`

  - `option index` 的縮寫
  - 不是 `getopt()` 的產物，是原本就存在的全域變數
  - 指向目前正在解析的命令行參數 (初始為 `1`)

- `getopt()`

  - 每調用一次`getopt()` --> optind++
  - 若回傳 -1 不加
  - 若該 filter 有冒號(:)：代表該 opt 後有一個專用參數，並且再次 optind++ (EX. "b:grs"，則使用 -b 時，後面需再加一個 arg)
  - 回傳值：

    - `-1`：表示 optind 所指並非 opt （EX. 並非下列形式： -a, -g, -d..）
    - `?`：表示所得 opt 並未符合指定選項
    - opt：若符合指定選項，則回傳該 opt

    ![](https://i.imgur.com/0hkVauD.png)
