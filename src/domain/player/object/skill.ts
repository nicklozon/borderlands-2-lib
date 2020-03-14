import { StatType } from "../value_object/stat_type";
import { Stat } from "../interface/stat";
import { Weapon } from "../../weapon/interface/weapon";

export abstract class Skill {
  protected level: number 
  protected abstract stats: Stat[]

  constructor(level: number) {
    this.level = level
  }

  public getStat(statType: StatType, weapon: Weapon): number {
    let stat = this.stats.find((stat: Stat) => stat.type === statType)

    if(!stat) return 0

    return stat.value * this.level
  }
}