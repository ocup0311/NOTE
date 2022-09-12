// 1. class 基本
;(() => {
  class CustomPersonInfo {
    // name: string
    age: number
    hasPet: boolean
    hasCar: boolean = true
    mobile: string

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
    m(): void
  }

  class C implements T {
    m() {
      return '1'
    }
  }
})()
