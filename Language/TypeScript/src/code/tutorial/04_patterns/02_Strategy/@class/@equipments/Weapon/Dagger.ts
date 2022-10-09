import { Weapon } from '../../../@type'
import { Attack } from '../../@abilities'

export default class Dagger implements Weapon {
  public name = 'Dagger'
  public attackStrategy = new Attack.StabAttack()
  public availableRoles = []
}
