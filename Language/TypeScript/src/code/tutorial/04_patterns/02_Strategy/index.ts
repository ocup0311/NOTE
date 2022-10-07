import { Swordsman, Warlock } from './@class'

// instance
const instance1 = new Swordsman('Ocup')
instance1.introduce()

const instance2 = new Swordsman('Mike')
instance2.introduce()

const instance3 = new Warlock('Lucy')
instance3.introduce()

// active
instance2.attack(instance1)
instance3.attack(instance1)

console.log(instance1)
