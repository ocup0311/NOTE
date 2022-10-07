import { Attack } from '../../../@type'
import { Character } from '../../Character'

export default class MeleeAttack implements Attack {
  public attack(self: Character, target: Character) {
    console.log(`${self.name} attacks ${target.name} by SWORD!`)
  }
}
