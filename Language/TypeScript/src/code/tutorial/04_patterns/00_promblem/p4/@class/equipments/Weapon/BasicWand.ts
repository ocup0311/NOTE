import { Role } from '../../../@type'
import Weapon from '../../../@abstract/Weapon'
import { MagicAttack } from '../../abilities'

export default class BasicWand extends Weapon {
  public readonly name = 'Basic Wand'

  public readonly availableRoles = [Role.Warlock]

  public readonly attackStrategy = new MagicAttack()
}
