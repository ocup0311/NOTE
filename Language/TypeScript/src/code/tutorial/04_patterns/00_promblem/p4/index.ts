import { Swordsman, Warlock, Weapon } from './@class'
import { output } from './@util'

// instance
const instance1 = new Swordsman('Ocup')
output.intro(instance1, 1)

const instance2 = new Warlock('Mike')
output.intro(instance2, 2)

// active
instance1.equipWeapon(new Weapon.BasicSword())
output.attack(instance1, instance2, 6)
