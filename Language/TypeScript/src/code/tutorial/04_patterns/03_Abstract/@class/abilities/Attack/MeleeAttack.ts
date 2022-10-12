import { Attack } from '../../../@type'
import { Character } from '../../../@abstract'

export default class MeleeAttack implements Attack {
  public attack(self: Character, target: Character) {
    console.log(`${self.name} rushes in and attacks ${target.name}!`)
  }
}
