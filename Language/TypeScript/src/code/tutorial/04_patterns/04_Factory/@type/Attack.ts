import { Character } from '../@abstract'

export default interface Attack {
  attack(self: Character, target: Character): void
}
