import { Role } from '../../@type'
import { Attack } from '../@abilities'
import Character from './Character'

export default class Swordsman extends Character {
  constructor(public readonly name: string) {
    super(name, Role.Swordsman, { attackRef: new Attack.MeleeAttack() })
  }
}
