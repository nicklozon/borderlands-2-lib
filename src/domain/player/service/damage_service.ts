import { Player } from "../interface/player"
import { StatType } from "../value_object/stat_type"
import { Stat } from "../interface/stat"

export class PlayerDamageService {
  private player: Player

  constructor(player: Player) {
    this.player = player
  }

  public getStat(type: StatType) : number {
    const { stats } = this.player

    let result: Stat[] = stats.filter((stat: Stat) => stat.type === type)
    return result.reduce((memo: number, stat: Stat) => memo + stat.value, 0)
  }
}