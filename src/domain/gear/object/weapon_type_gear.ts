import { Gear } from "./gear";
import { Type } from "../../weapon/value_object/type";
import { Stat } from "../../build/interface/stat";
import { StatType } from "../../build/value_object/stat_type";
import { Weapon } from "../../weapon/interface/weapon";

// TODO: Don't use polymorphism, use decorator pattern in Gear object

export class WeaponTypeGear extends Gear {
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