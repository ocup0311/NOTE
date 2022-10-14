import { Role } from '../../@type'
import { Weapon } from '../@equipments'
import Character from './Character'

export default class Swordsman extends Character {
  constructor(public readonly name: string) {
    super(name, Role.Swordsman, { weaponRef: new Weapon.BasicSword() })
  }
}
