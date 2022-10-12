import { Role } from '../@type'
import Weapon from './Weapon'

export default abstract class Character {
  public abstract readonly name: string

  public abstract readonly role: Role

  protected abstract weaponRef: Weapon

  public introduce() {
    console.log(`Hi, I'm ${this.name} the ${this.role}!`)
  }

  public attack(target: Character) {
    if (target === this) throw Error('Attack Target Error!')

    this.weaponRef.attack(this, target)
  }

  public equipWeapon(weapon: Weapon) {
    const roles = weapon.availableRoles
    const isAnyRole = roles.length === 0
    const isFitRole = roles.includes(this.role)

    if (!isAnyRole && !isFitRole) {
      console.log(`${this.name} can not equip ${weapon.name}!`)
      return
    }

    this.weaponRef = weapon

    console.log(`${this.name} has equiped ${weapon.name}!`)
  }
}
