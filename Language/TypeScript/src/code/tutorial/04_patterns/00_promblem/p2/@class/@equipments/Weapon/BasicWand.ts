import { Role, Weapon, Attack } from '../../../@type'
import { MagicAttack } from '../../@abilities'
import { Character } from '../../Character'

export default class BasicWand implements Weapon {
  public name = 'Basic Wand'
  public attackStrategy = new MagicAttack()
  public availableRoles = [Role.Warlock]
  switchAttack(strategy: Attack): void {
    this.attackStrategy = strategy
  }
  attack(self: Character, target: Character): void {
    this.attackStrategy.attack(self, target)
  }
}
