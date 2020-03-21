import { Skill } from "../skill";
import { StatType } from "../../value_object/stat_type";
import { Stat } from "../../interface/stat";
import { Weapon } from "../../../weapon/interface/weapon";

export class DutyCalls extends Skill {
  protected stats: Stat[]

  constructor(level: number) {
    super(level)

    this.stats = [{
      type: StatType.GunDamage,
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

export class Ranger extends Skill {
  protected stats: Stat[]

  constructor(level: number) {
    super(level)

    this.stats = [{
      type: StatType.GunDamage,
      value: 0.01
    },{
      type: StatType.CritHitDamage,
      value: 0.01
    },{
      type: StatType.FireRate,
      value: 0.01
    },{
      type: StatType.MagazineSize,
      value: 0.01
    },{
      type: StatType.ReloadSpeed,
      value: 0.01
    }]
  }
}

export class Impact extends Skill {
  protected stats: Stat[]

  constructor(level: number) {
    super(level)

    this.stats = [{
      type: StatType.GunDamage,
      value: 0.04
    }]
  }
}