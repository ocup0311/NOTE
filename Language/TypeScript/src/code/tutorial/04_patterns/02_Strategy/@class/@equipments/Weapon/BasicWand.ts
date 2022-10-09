import { Role, Weapon } from '../../../@type'
import { Attack } from '../../@abilities'

export default class BasicWand implements Weapon {
  public name = 'Basic Wand'
  public attackStrategy = new Attack.MagicAttack()
  public availableRoles = [Role.Warlock]
}
