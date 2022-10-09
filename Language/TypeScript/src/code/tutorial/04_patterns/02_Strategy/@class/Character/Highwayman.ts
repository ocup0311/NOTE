import { Role } from '../../@type'
import { Weapon } from '../@equipments'
import Character from './Character'

export default class Highwayman extends Character {
  constructor(public readonly name: string) {
    super(name, Role.Highwayman, { weaponRef: new Weapon.Dagger() })
  }
}
