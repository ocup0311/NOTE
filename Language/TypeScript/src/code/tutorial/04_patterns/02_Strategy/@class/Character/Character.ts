import { Role, Attack } from '../../@type'

export default class Character {
  private attackRef: Attack

  constructor(
    public readonly name: string,
    public readonly role: Role,
    ref: { attackRef: Attack }
  ) {
    this.attackRef = ref.attackRef
  }

  public introduce() {
    console.log(`Hi, I'm ${this.name} the ${this.role}!`)
  }

  public attack(target: Character) {
    this.attackRef.attack(this, target)
  }
}
