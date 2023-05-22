import { Role, Attack } from '../@type'
import Character from './Character'

export default abstract class Weapon {
  public abstract readonly name: string

  public abstract attackStrategy: Attack

  public availableRoles: readonly Role[] = []

  public switchAttack(strategy: Attack): void {
    this.attackStrategy = strategy
  }

  public attack(self: Character, target: Character): void {
    this.attackStrategy.attack(self, target)
  }
}
