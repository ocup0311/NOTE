import { Swordsman, Warlock, Weapon, Attack } from './@class'
import { Character } from './@abstract'

// function
const outputIntro = (self: Character, count: number) => {
  console.log(`---- INTRO ${count} -----`)
  self.introduce()
  console.log()
}
const outputAttack = (self: Character, target: Character, count: number) => {
  console.log(`---- ATTACK ${count} -----`)
  self.attack(target)
  console.log()
}

// instance
const instance1 = new Swordsman('Ocup')
outputIntro(instance1, 1)

const instance2 = new Swordsman('Mike')
outputIntro(instance2, 2)

const instance3 = new Warlock('Lucy')
outputIntro(instance3, 3)

// active
outputAttack(instance2, instance1, 1)

outputAttack(instance3, instance1, 2)

outputAttack(instance1, instance2, 3)

instance1.equipWeapon(new Weapon.BasicWand())
outputAttack(instance1, instance2, 4)

const stabingSword = new Weapon.BasicSword()
const stabing = new Attack.StabAttack()
stabingSword.switchAttack(stabing)
instance1.equipWeapon(stabingSword)
outputAttack(instance1, instance2, 5)

instance1.equipWeapon(new Weapon.BasicSword())
outputAttack(instance1, instance2, 6)
