import { Role } from '../../@type'
import { Weapon } from '../@equipments'
import Character from './Character'

export default class Warlock extends Character {
  constructor(public readonly name: string) {
    super(name, Role.Warlock, { weaponRef: new Weapon.BasicWand() })
  }
}
