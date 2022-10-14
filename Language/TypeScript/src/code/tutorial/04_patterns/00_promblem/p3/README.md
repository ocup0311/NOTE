> Promblem2 解法為： [Abstract](../../03_Abstract/README.md)

- 問題：
  - 1. 每產生新武器，則會有以下重複程式碼
       (@class/@equipments/Weapon/)
    ```typescript
    switchAttack(strategy: Attack): void {
      this.attackStrategy = strategy
    }
    attack(self: Character, target: Character): void {
      this.attackStrategy.attack(self, target)
    }
    ```
  - 2.
