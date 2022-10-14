import { Role } from '../@type'
import Character from './Character'

export default class Warlock extends Character {
  constructor(public readonly name: string) {
    super(name, Role.Warlock)
  }

  public attack(target: Character) {
    console.log(`${this.name} casts a magic to ${target.name}!`)
  }
}
