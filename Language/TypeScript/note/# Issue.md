<style> 
.imgBox{
  display: flex; 
  flex-direction: column; 
  margin: 5%; 
  justify-content: center;
  border: 2px solid black;
}
</style>

<!--  style  -->

###### <!-- ref -->

[type_vs_interface 文件]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
[type_vs_interface 鐵人]: https://ithelp.ithome.com.tw/articles/10216626
[type_vs_interface 1]: https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript
[多重繼承]: https://zh.wikipedia.org/wiki/%E5%A4%9A%E9%87%8D%E7%BB%A7%E6%89%BF
[虛繼承]: https://zh.wikipedia.org/wiki/%E8%99%9A%E7%BB%A7%E6%89%BF
[javascript 中的 proxy 與 reflect]: https://blog.techbridge.cc/2018/05/27/js-proxy-reflect/

<!-- ref -->

# # 討論

<!-- Type vs Interface -->

- <details close>
  <summary>Type vs Interface</summary>

  > REF: [Type_vs_Interface 文件] | [Type_vs_Interface 鐵人] | [Type_vs_Interface 1]

  </details>

<!-- 鑽石問題 -->

- <details close>
  <summary>鑽石問題</summary>

  > REF: [多重繼承] | [虛繼承]

  - 以下是否有可能會有`鑽石問題`

  ```typescript
  // type
  type UserAccount = {
    account: string
    password: string
    money: number
  }

  // interface
  interface AccountSystem {
    signIn(account: string, password: string): void
    signOut(): void
  }

  interface TransactionSystem {
    deposit(amount: number): void
    withdraw(amount: number): void
  }

  interface CashMachineSystem extends TransactionSystem, AccountSystem {}

  class CashMachine implements CashMachineSystem {
    // private users: UserAccount[]
    private currentUser: UserAccount | undefined

    constructor(private users: UserAccount[]) {
      // this.users = users
      this.currentUser = { account: '', password: '', money: 1 }
    }

    signIn(account: string, password: string): void {
      console.log(this.users, this.currentUser, this.x)
    }
    signOut(): void {}

    deposit(amount: number): void {}
    withdraw(amount: number): void {}
  }

  // class CashMachine implements TransactionSystem, AccountSystem {}
  ```

  </details>

<!-- Javascript 中的 Proxy 與 Reflect -->

- <details close>
  <summary>Javascript 中的 Proxy 與 Reflect</summary>

  > REF: [Javascript 中的 Proxy 與 Reflect]

  - 待研究群組中的問題（關鍵字搜尋：typescript typeof）

  </details>

<!-- class、type.. 等，是不是應該比較適合以全域處理，而不是以 module 處理？ -->

- <details close>
  <summary>class、type.. 等，是不是應該比較適合以全域處理，而不是以 module 處理？</summary>

  </details>

<!--  -->

- <details close>
  <summary></summary>

  </details>

---
