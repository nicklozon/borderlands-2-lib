import { Player } from "../interface/player"
import { StatType } from "../value_object/stat_type"
import { Stat } from "../interface/stat"
import { ValueType } from "../value_object/value_type"

export class PlayerDamageService {
  private player: Player
  // temporary
  private stats = {
    [StatType.CritHitDamage]: 0,
    [StatType.ReloadSpeed]: 0,
    [StatType.WeaponDamage]: 0
  }

  constructor(player: Player) {
    this.player = player
  }

  public getStat(type: StatType) : number {
    return this.stats[type]
  }
}