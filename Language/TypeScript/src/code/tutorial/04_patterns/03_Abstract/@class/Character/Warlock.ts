import { Role } from '../../@type'
import { Weapon } from '../equipments'
import Character from '../../@abstract/Character'

export default class Warlock extends Character {
  constructor(public readonly name: string) {
    super()
  }

  public readonly role = Role.Warlock

  protected weaponRef = new Weapon.BasicWand()
}
