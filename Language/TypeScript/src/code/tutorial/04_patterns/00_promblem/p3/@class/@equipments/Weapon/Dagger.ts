import { Weapon, Attack } from '../../../@type'
import { StabAttack } from '../../@abilities'
import { Character } from '../../Character'

export default class Dagger implements Weapon {
  public name = 'Dagger'
  public attackStrategy = new StabAttack()
  public availableRoles = []
  switchAttack(strategy: Attack): void {
    this.attackStrategy = strategy
  }
  attack(self: Character, target: Character): void {
    this.attackStrategy.attack(self, target)
  }
}
