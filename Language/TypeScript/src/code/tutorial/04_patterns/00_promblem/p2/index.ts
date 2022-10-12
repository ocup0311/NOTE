import { Swordsman, Warlock, Weapon, Attack, Character } from './@class'

// function
const outputAttack = (self: Character, target: Character, count: number) => {
  console.log(`---- ATTACK ${count}-----`)
  self.attack(target)
}

// instance
const instance1 = new Swordsman('Ocup')
instance1.introduce()

const instance2 = new Swordsman('Mike')
instance2.introduce()

const instance3 = new Warlock('Lucy')
instance3.introduce()

// active
outputAttack(instance2, instance1, 1)
// instance2.attack(instance1)

outputAttack(instance3, instance1, 2)
// instance3.attack(instance1)

outputAttack(instance1, instance2, 3)
// instance1.attack(instance2)

instance1.equipWeapon(new Weapon.BasicWand())
outputAttack(instance1, instance2, 4)
// instance1.attack(instance2)

const stabingSword = new Weapon.BasicSword()
const stabing = new Attack.StabAttack()
stabingSword.switchAttack(stabing)
instance1.equipWeapon(stabingSword)
outputAttack(instance1, instance2, 5)
// instance1.attack(instance2)

instance1.equipWeapon(new Weapon.BasicSword())
outputAttack(instance1, instance2, 6)
// instance1.attack(instance2)
