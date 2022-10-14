import { Attack } from '../../../@type'
import { Character } from '../../Character'

export default class StabAttack implements Attack {
  public attack(self: Character, target: Character) {
    console.log(`${self.name} stab through ${target.name}.`)
  }
}
