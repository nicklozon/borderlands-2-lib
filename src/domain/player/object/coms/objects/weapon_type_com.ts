import { Com } from "./com";
import { Type } from "../../../../weapon/value_object/type";
import { Stat } from "../../../interface/stat";
import { StatType } from "../../../value_object/stat_type";
import { Weapon } from "../../../../weapon/interface/weapon";

export class WeaponTypeCom extends Com {
  protected weaponType: Type

  constructor(stats: Stat[], weaponType: Type) {
    super(stats)
    this.weaponType = weaponType
  }

  public getStat(statType: StatType, weapon: Weapon): number {
    if(weapon.type !== this.weaponType) return 0
    return super.getStat(statType, weapon)
  }
}