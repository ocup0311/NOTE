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

- scanlines 的 padding 需要兩次 %4，是因為第一次的結果會有 0 的情況。

![](https://i.imgur.com/8xfSpzB.png)
![](https://i.imgur.com/5QlajZx.png)
