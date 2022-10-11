> Promblem1 解法為： [Strategy](../../02_Strategy/README.md)

- 問題：

  - 1. 每產生新職業，則須重新覆蓋以下程式碼，即便使用相同 attack 方式
       (只能選一種寫在原始 class (Character.ts)，不用重複寫)
       (@class/)

    ```typescript
    public attack(target: Character) {
      // ...
    }
    ```

  - 2.
