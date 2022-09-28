// 1. class 基本
;(() => {
  class CustomPersonInfo {
    // name: string
    age: number
    hasPet: boolean
    hasCar: boolean = true
    mobile: string
    private static test: number = 1

    //建構子函式
    constructor(name: string, age: number, hasPet: boolean = true) {
      this.name = name
      this.age = age
      this.hasPet = hasPet
    }

    printInfo() {
      console.log(
        `Name: ${this.name}. Age: ${this.age}. Owns a pet? ${this.hasPet}.`
      )
    }
  }

  const obj1 = new CustomPersonInfo('Ocup', 23)
  const obj2 = new CustomPersonInfo('Ocup')
})()

// 2. class implements
;(() => {
  type T = {
    m1(): void
    m2(): number
  }

  class C implements T {
    m1() {
      return '1'
    }

    m2() {
      return '1'
    }
  }

  const fn = (): void => {
    return 1
  }
})()

// 3. class Access Modifiers: 若繼承至 interface，則只能為 public
;(() => {
  // EX.
  interface I1 {
    fn1(p1: string): void
  }
  class C1 implements I1 {
    fn1(p1: string): void {}
    private fn2(p1: string): void {}
    protected fn3(p1: string): void {}
  }

  // Error1: 不能在 interface 設定 public、private、protected
  interface I2 {
    public fn1(p1: string): void
    private fn2(p1: string): void
    protected fn3(p1: string): void
  }

  // Error2: 繼承至 interface 的 method 不能被定為 private、protected
  class C3 implements I1 {
    private fn1(p1: string): void {}
  }

  // 繼承至 interface 的 method 只能被定為 public
  class C4 implements I1 {
    public fn1(p1: string): void {}
  }
})()

// 4. class Access Modifiers: private ＆ protected 都只是 TS 在編譯時做檢查，依然可以被繞過存取
;(() => {
  class C1 {
    protected a: string
    public b: string
    private c: string
    #d: string

    constructor(a: string, b: string, c: string, d: string) {
      this.a = a
      this.b = b
      this.c = c
      this.#d = d
    }
  }

  const x = new C1('a', 'b', 'c', 'd')
  console.log(x.a) // error
  console.log(x.b) // b
  console.log(x.c) // error
  console.log(x.#d) // error

  const y = JSON.parse(JSON.stringify(x))
  console.log(y.a) // a
  console.log(y.b) // b
  console.log(y.c) // c
  console.log(y.#d) // error

  // class CashMachine implements TransactionSystem, AccountSystem {}
})()

// 5. class Access Modifiers: 自動綁定 this
;(() => {
  class C1 {
    constructor(private a: string) {}
  }

  class C2 {
    private a: string

    constructor(a: string) {
      this.a = a
    }
  }
})()

// 6. static
;(() => {
  // static（靜態）
  class CircleS {
    private static readonly PI = 3.14

    static calArea(radius: number): number {
      return CircleS.PI * radius ** 2
    }
  }

  const circle1 = new CircleS()
  const area11 = circle1.calArea(100) // [error]
  const area12 = CircleS.calArea(100) // 31400

  // 一般（動態）
  class Circle {
    private readonly PI = 3.14

    constructor(public radius: number) {}

    public calArea(): number {
      return this.PI * this.radius ** 2
    }
  }

  const circle2 = new Circle(100)
  const area21 = circle2.calArea() // 31400
  const area22 = Circle.calArea(100) // [error]
})()

// 7.
;(() => {
  // 1.
  class Circle1 {
    private readonly PI = 3.14

    constructor(public radius: number) {}

    get area(): number {
      return this.PI * this.radius ** 2
    }
  }

  const circle = new Circle1(100)
  const area11 = circle.area
  circle.radius = 200
  const area12 = circle.area
  console.log(area11, area12) // 31400, 125600

  // circle.area = 123 // [error]

  // 2.
  class Circle2 {
    private readonly PI = 3.14

    constructor(public radius: number) {}

    get area() {
      return this.PI * this.radius ** 2
    }

    set area(value) {
      this.radius = (value / this.PI) ** 0.5
    }
  }

  const circle2 = new Circle2(100)
  const area21 = circle2.area
  circle2.area = 70650
  const area22 = circle2.area
  const radius = circle2.radius
  console.log(area21, area22, radius) // 31400, 70650, 150

  circle2.area = '70650' // [error]
})()

// 其他------------------------
;(() => {
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
})()
