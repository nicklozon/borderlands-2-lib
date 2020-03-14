import { Player } from "../interface/player"
import { StatType } from "../value_object/stat_type"
import { Stat } from "../interface/stat"

export class PlayerDamageService {
  private player: Player
  // temporary
  private stats: Stat[] = [{
    type: StatType.CritHitDamage,
    value: 0
  },{
    type: StatType.ReloadSpeed,
    value: 0
  },{
    type: StatType.WeaponDamage,
    value: 0
  }]

  constructor(player: Player) {
    this.player = player
  }

  public getStat(type: StatType) : number {
    let stats: Stat[] = this.stats.filter((stat: Stat) => stat.type === type)
    return stats.reduce((memo: number, stat: Stat) => memo + stat.value, 0)
  }
}