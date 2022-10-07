import { Role } from '../@type'
import Character from './Character'

export default class Swordsman extends Character {
  constructor(public readonly name: string) {
    super(name, Role.Swordsman)
  }

  public attack(target: Character) {
    console.log(`${this.name} attacks ${target.name} by SWORD!`)
  }
}
