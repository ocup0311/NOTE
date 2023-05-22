import Weapon from '../../../@abstract/Weapon'
import { StabAttack } from '../../abilities'

export default class Dagger extends Weapon {
  public readonly name = 'Dagger'

  public readonly attackStrategy = new StabAttack()
}
