import { Stat } from "../../../interface/stat"
import { StatType } from "../../../value_object/stat_type"
import { Weapon } from "../../../../weapon/interface/weapon"

export class Com {
  protected stats: Stat[]

  constructor(stats: Stat[]) {
    this.stats = stats
  }

  public getStat(statType: StatType, weapon: Weapon): number {
    let stat = this.stats.find((stat: Stat) => stat.type === statType)

    if(!stat) return 0

    return stat.value
  }
}