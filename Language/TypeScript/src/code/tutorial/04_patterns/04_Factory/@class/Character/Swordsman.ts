import { Role } from '../../@type'
import { Weapon } from '../equipments'
import Character from '../../@abstract/Character'

export default class Swordsman extends Character {
  constructor(public readonly name: string) {
    super()
  }

  public readonly role = Role.Swordsman

  protected weaponRef = new Weapon.BasicSword()
}
