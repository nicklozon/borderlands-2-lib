import { Skill } from "../../skill";
import { StatType } from "../../../value_object/stat_type";
import { Stat } from "../../../interface/stat";
import { Weapon } from "../../../../weapon/interface/weapon";

export class DutyCalls extends Skill {
  protected stats: Stat[]

  constructor(level: number) {
    super(level)

    this.stats = [{
      type: StatType.WeaponDamage,
      value: 0.05
    },{
      type: StatType.FireRate,
      value: 0.03
    }]
  }

  public getStat(statType: StatType, weapon: Weapon): number {
    // Duty Calls only applies to non elemental weapons
    if(weapon.elementalEffect !== undefined) return 0

    return super.getStat(statType, weapon)
  }
}