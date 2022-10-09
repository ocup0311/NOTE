import { Swordsman, Warlock, Weapon } from './@class'

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

instance1.equipWeapon(new Weapon.BasicSword())
instance1.attack(instance2)
instance1.equipWeapon(new Weapon.BasicWand())
instance1.attack(instance2)
instance1.equipWeapon(new Weapon.Dagger())
instance1.attack(instance2)
