import Role from './Role'
import Attack from './Attack'

export default interface Weapon {
  readonly name: string
  availableRoles: Role[]
  attackStrategy: Attack
}
