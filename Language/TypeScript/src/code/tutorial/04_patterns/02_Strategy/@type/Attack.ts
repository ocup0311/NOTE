import { Character } from '../@class'

export default interface Attack {
  attack(self: Character, target: Character): void
}
