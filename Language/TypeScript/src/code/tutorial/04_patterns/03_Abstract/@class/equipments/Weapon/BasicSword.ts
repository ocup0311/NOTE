import { Role } from '../../../@type'
import Weapon from '../../../@abstract/Weapon'
import { MeleeAttack } from '../../abilities'

export default class BasicSword extends Weapon {
  public readonly name = 'Basic Sword'

  public readonly availableRoles = [Role.Swordsman, Role.Highwayman]

  public readonly attackStrategy = new MeleeAttack()
}
