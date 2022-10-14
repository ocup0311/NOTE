import { Swordsman, Warlock, Weapon } from './@class'

// instance
const instance1 = new Swordsman('Ocup')
const instance2 = new Swordsman('Mike')
const instance3 = new Warlock('Lucy')

// active
instance1.introduce()
instance2.introduce()
instance3.introduce()

instance2.attack(instance1)
instance3.attack(instance1)

instance1.equipWeapon(new Weapon.BasicSword())
instance1.attack(instance2)

instance1.equipWeapon(new Weapon.BasicWand())
instance1.attack(instance2)

instance1.equipWeapon(new Weapon.Dagger())
instance1.attack(instance2)
