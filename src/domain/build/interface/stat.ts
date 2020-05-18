import { StatType } from "../value_object/stat_type";
import { Decorator } from "../../gear";
import { Context } from "../../context";
import { Weapon } from "../../weapon/interface/weapon"

export interface Stat {
  type: StatType,
  value: number,
  decorator?: Decorator
}


// Stat should really be a class...
export function getStat(statType: StatType, stats: Stat[], weapon: Weapon, context: Context) : Stat|void {
  return stats.find(stat => {
    if(stat.decorator && !stat.decorator(weapon, context)) {
      return false
    }

    return stat.type === statType
  })
}