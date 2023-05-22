import { Role } from '../../@type'
import { Weapon } from '../equipments'
import Character from '../../@abstract/Character'

export default class Highwayman extends Character {
  constructor(public readonly name: string) {
    super()
  }

  public readonly role = Role.Highwayman

  protected weaponRef = new Weapon.Dagger()
}
