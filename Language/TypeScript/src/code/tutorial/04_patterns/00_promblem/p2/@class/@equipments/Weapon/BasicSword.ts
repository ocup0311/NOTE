import { Attack, Role, Weapon } from '../../../@type'
import { MeleeAttack } from '../../@abilities'
import { Character } from '../../Character'

export default class BasicSword implements Weapon {
  public name = 'Basic Sword'
  public attackStrategy = new MeleeAttack()
  public availableRoles = [Role.Swordsman, Role.Highwayman]
  switchAttack(strategy: Attack): void {
    this.attackStrategy = strategy
  }
  attack(self: Character, target: Character): void {
    this.attackStrategy.attack(self, target)
  }
}
