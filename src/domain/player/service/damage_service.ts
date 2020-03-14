import { Player } from "../interface/player"
import { StatType } from "../value_object/stat_type"
import { Stat } from "../interface/stat"

export class PlayerDamageService {
  private player: Player

  constructor(player: Player) {
    this.player = player
  }

  public getStat(type: StatType) : number {
    let stats: Stat[] = this.player.stats.filter((stat: Stat) => stat.type === type)
    return stats.reduce((memo: number, stat: Stat) => memo + stat.value, 0)
  }
}