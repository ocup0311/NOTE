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
  interface I {
    m1(): void
    m2(): number
  }

  class C implements I {
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

// 6. class static
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

  // static this
  class Test {
    constructor(private x: object) {}

    private static x: object = {}

    static staticMethod() {
      console.log(Test.x === this.x) // true
    }

    method() {
      console.log(Test.x === this.x) // false
    }
  }

  const test = new Test({})
  Test.staticMethod()
  test.method()
})()

// 7. class getter/setter
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

// 8. singleton
;(() => {
  // 1. 範例 1
  ;(() => {
    const Singleton = (() => {
      let instance: Object

      function createInstance() {
        const object = new Object('I am the instance')
        return object
      }

      return {
        getInstance: () => {
          if (!instance) {
            instance = createInstance()
          }
          return instance
        },
      }
    })()

    const run = () => {
      const instance1 = Singleton.getInstance()
      const instance2 = Singleton.getInstance()

      console.log('Same instance? ' + (instance1 === instance2))
    }

    run()
  })()

  // 2. 範例 2
  ;(() => {
    class Singleton {
      private constructor() {}

      private static instance: Singleton = new Singleton()

      static getInstance(): Singleton {
        return this.instance
      }
    }

    const a = Singleton.getInstance()
    const b = Singleton.getInstance()
    console.log('a===b? ', a === b)
  })()

  // 3. 範例 3
  ;(() => {
    class Singleton {
      private constructor() {}

      static readonly instance: Singleton = new Singleton()
    }

    const a = Singleton.instance
    const b = Singleton.instance
    console.log('a===b? ', a === b)
  })()

  // 4. 範例 4
  ;(() => {
    class Singleton {
      private constructor(
        public readonly name: string,
        public readonly age: number
      ) {}

      private static instance: Singleton = new Singleton('Ocup', 18)

      static getInstance(): Singleton {
        return Singleton.instance
      }
    }

    const a = Singleton.getInstance()
    const b = Singleton.getInstance()
    console.log('a===b? ', a === b)
    console.log('a? ', a)
  })()
})()

// 9. Lazy Initialization in Singleton
;(() => {
  class LazySingleton {
    private constructor(
      public readonly name: string,
      public readonly age: number
    ) {}

    private static instance: LazySingleton

    static getInstance(): LazySingleton {
      if (!LazySingleton.instance) {
        LazySingleton.instance = new LazySingleton('Ocup', 18)
      }

      return LazySingleton.instance
    }
  }

  const a = LazySingleton.getInstance()
  const b = LazySingleton.getInstance()
  console.log('a===b? ', a === b)
  console.log('a? ', a)
})()

// 10. class type 判定
;(() => {
  enum Color {
    White,
    Black,
    Brown,
    Grey,
    Rainbow,
  }

  class Horse {
    constructor(
      public name: string,
      public color: Color,
      public readonly type: string,
      private noise: string = 'Laaaaaaaa~~'
    ) {}

    public makeNoise() {
      console.log(this.noise)
    }

    public info() {
      console.log(this.infoText())
    }

    protected infoText(): string {
      return `The ${this.color} horse ${this.name} is a ${this.type} horse.`
    }
  }

  const horse1 = new Horse('Bubu', Color.Rainbow, 'B')

  horse1.info()

  //
  class Unicorn extends Horse {
    constructor(name: string) {
      super(
        name,
        Color.Rainbow,
        'Mystical Unicorn',
        'Nheeeeeeheeehehé~hehé~hehé~hehé~n~'
      )
    }

    protected infoText(): string {
      return `It's a mystical unicorn! Its name is ${this.name}!`
    }

    public puke(): void {
      console.log('Puking rainbow vomit!')
    }
  }

  const unicorn1 = new Unicorn('Ocup')

  unicorn1.info()

  //
  class Stallion extends Horse {
    constructor(name: string) {
      super(name, Color.Brown, 'Mystical Stallion', 'Stallion~~~')
    }
  }

  const unicorn2: Unicorn = new Horse('Bubu', Color.Rainbow, 'B')
  const stallion1: Stallion = new Horse('Bubu', Color.Rainbow, 'B')

  const horse2: Horse = new Unicorn('Unier')
  const horse3: Horse = new Stallion('Staller')
  const horse4: Unicorn = horse3
  const horse5: Stallion = horse3

  console.log(stallion1 instanceof Horse) // true
  console.log(stallion1 instanceof Stallion) // false
  console.log(horse3 instanceof Horse) // true
  console.log(horse3 instanceof Stallion) // true

  // 1.
  ;(() => {
    class A {
      constructor(public name: string) {}
    }

    class C {
      constructor(public name: string) {}
    }

    class D {
      constructor(public name: string, public age: number) {}
    }

    const c1: C = new A('Ocup')
    const d1: D = new A('Ocup')
  })()

  // 2.
  ;(() => {
    class A {
      constructor(public name: string) {}
    }

    class B extends A {
      constructor(name: string) {
        super(name)
      }
    }

    class C {
      constructor(public name: string) {}
    }

    const a1: A = new B('Ocup')
    const b1: B = new A('Ocup')
    const c1: C = new A('Ocup')

    console.log(a1 instanceof A) // true
    console.log(a1 instanceof B) // true
    console.log(b1 instanceof A) // true
    console.log(b1 instanceof B) // false
    console.log(c1 instanceof A) // true
    console.log(c1 instanceof B) // false
  })()

  // 3.
  ;(() => {
    class A {
      constructor(public name: string) {}
    }

    const a1: A = { name: 'Ocup' }
    const a2: A = { name: 'Ocup', age: 18 }
    const a3: A = {}
  })()

  // 4.
  ;(() => {
    class A {
      constructor(public name: string, private age: number) {}
    }

    class B extends A {
      constructor(name: string, age: number) {
        super(name, age)
      }
    }

    class C {
      constructor(public name: string, private age: number) {}
    }

    const a1: A = new B('Ocup', 18)
    const b1: B = new A('Ocup', 18)
    const c1: C = new A('Ocup', 18)
  })()

  // 5.
  ;(() => {
    class A {
      constructor(public name: string) {}
    }

    class D {
      constructor(public name: string, public age: number) {}
    }

    const a3: A = new D('Ocup', 12)
    const d3: D = new A('Ocup')

    console.log(a3)
    // D: {
    //   "name": "Ocup",
    //   "age": 12
    // }

    type X = { name: string; age: number }
    const x: X = { name: 'Ocup', age: 18 }
  })()
})()

// 11. class implements
;(() => {
  interface I1 {
    m1(): number
  }

  interface I2 {
    m2(): number
  }

  class C1 implements I1 {
    m1() {
      return 1
    }
  }

  class C2 implements I2 {
    m2() {
      return 1
    }
  }

  class C3 implements I1, I2 {
    m1() {
      return 1
    }

    m2() {
      return 1
    }
  }

  class C4 extends C3 {}

  class C5 implements C1, C2 {
    m1() {
      return 1
    }

    m2() {
      return 1
    }
  }

  // Would be Error:
  // class C6 extends C1, C2 {}
})()

// 12. implements VS extends
;(() => {
  // 1.
  ;(() => {
    // 不能 implements 有 protected, private 的 class (只能用 extends)
    class A1 {
      constructor(protected name: string) {}
    }

    class B1 extends A1 {
      constructor(protected name: string) {
        super(name)
      }
    }

    class C1 implements A1 {
      constructor(protected name: string) {}
    }

    // 可以 implements 只有 public 的 class
    class A2 {
      constructor(public name: string) {}
    }

    class B2 extends A2 {
      constructor(public name: string) {
        super(name)
      }
    }

    class C2 implements A2 {
      constructor(public name: string) {}
    }
  })()

  // 2. extends 已擁有 parent 的一切，可以不用再實作。而 implements 需要實作
  ;(() => {
    class A2 {
      constructor(public name: string) {}
      public m1(): void {}
    }

    class B2 extends A2 {
      constructor() {
        super('Ocup')
      }
    }

    class C2 implements A2 {
      constructor(public name: string) {}
      public m1(): void {}
    }

    class C3 implements A2 {
      constructor(public name: string) {}
    }
  })()
})()
