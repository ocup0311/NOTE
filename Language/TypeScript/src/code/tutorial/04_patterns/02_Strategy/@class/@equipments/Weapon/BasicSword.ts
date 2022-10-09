import { Role, Weapon } from '../../../@type'
import { Attack } from '../../@abilities'

export default class BasicSword implements Weapon {
  public name = 'Basic Sword'
  public attackStrategy = new Attack.MeleeAttack()
  public availableRoles = [Role.Swordsman, Role.Highwayman]
}
