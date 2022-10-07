import { Role } from './@type'
import { Character, Swordsman, Warlock } from './@class'

const instance1 = new Character('Ocup', Role.Swordsman)
instance1.introduce()

const instance2 = new Swordsman('Mike')
instance2.introduce()

const instance3 = new Warlock('Lucy')
instance3.introduce()

instance2.attack(instance1)
instance3.attack(instance1)
