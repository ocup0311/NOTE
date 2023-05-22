import { Character } from '../@abstract'

const intro = (self: Character, count: number) => {
  console.log(`---- INTRO ${count} -----`)
  self.introduce()
  console.log()
}
const attack = (self: Character, target: Character, count: number) => {
  console.log(`---- ATTACK ${count} -----`)
  self.attack(target)
  console.log()
}

export { attack as outputAttack, intro as outputIntro }
export default { attack, intro }
