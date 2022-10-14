import { Role } from '../@type'
import Character from './Character'

export default class Highwayman extends Character {
  constructor(public readonly name: string) {
    super(name, Role.Highwayman)
  }

  public attack(target: Character) {
    console.log(`${this.name} attacks ${target.name} by GUN!`)
  }
}
