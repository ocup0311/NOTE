import { Role } from '../../@type'
import { Attack } from '../@abilities'
import Character from './Character'

export default class Warlock extends Character {
  constructor(public readonly name: string) {
    super(name, Role.Warlock, { attackRef: new Attack.MagicAttack() })
  }
}
