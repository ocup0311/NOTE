import Role from './Role'
import Attack from './Attack'
import { Character } from '../@class'

export default interface Weapon {
  readonly name: string
  availableRoles: Role[]
  attackStrategy: Attack
  switchAttack(type: Attack): void
  attack(self: Character, target: Character): void
}
