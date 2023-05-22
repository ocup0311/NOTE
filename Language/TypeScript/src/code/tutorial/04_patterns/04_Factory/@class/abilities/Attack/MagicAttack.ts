import { Attack } from '../../../@type'
import { Character } from '../../../@abstract'

export default class MagicAttack implements Attack {
  public attack(self: Character, target: Character) {
    console.log(`${self.name} casts a magic to ${target.name}!`)
  }
}
