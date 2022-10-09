import { Role, Attack, Weapon } from '../../@type'

export default class Character {
  private attackRef: Attack
  private weaponRef: Weapon

  constructor(
    public readonly name: string,
    public readonly role: Role,
    ref: { weaponRef: Weapon }
  ) {
    this.weaponRef = ref.weaponRef
    this.attackRef = ref.weaponRef.attackStrategy
  }

  public introduce() {
    console.log(`Hi, I'm ${this.name} the ${this.role}!`)
  }

  public attack(target: Character) {
    if (target === this) throw Error('Attack Target Error!')

    this.attackRef.attack(this, target)
  }

  public switchAttack(type: Attack) {
    this.attackRef = type
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
    this.attackRef = this.weaponRef.attackStrategy

    console.log(`${this.name} has equiped ${weapon.name}!`)
  }
}
