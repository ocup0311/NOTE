// GPT 給的範例：
// 怪怪的，不懂為什麼 AnimalFactory 會需要是 Animal，為什麼 AnimalFactory 需要實作 Animal?
// 我覺得是一個錯誤的舉例
enum Pet {
  cat = 'cat',
  dog = 'dog',
}

abstract class Animal {
  abstract makeSound(): void
}

interface AnimalFactory extends Animal {
  createAnimal(type: Pet): Animal
}

class Dog extends Animal {
  makeSound(): void {
    console.log('Woof!')
  }
}

class Cat extends Animal {
  makeSound(): void {
    console.log('Meow!')
  }
}

class AnimalFactoryImpl implements AnimalFactory {
  createAnimal(type: Pet): Animal {
    if (type === Pet.dog) return new Dog()
    if (type === Pet.cat) return new Cat()
    throw Error()
  }

  makeSound(): void {
    console.log('Factory making sound...')
  }
}

const factory: AnimalFactory = new AnimalFactoryImpl()
const animal: Animal = factory.createAnimal(Pet.dog)
animal.makeSound() // 輸出 "Woof!"
