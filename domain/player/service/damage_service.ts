import { Player } from "../object/player"
import { StatType } from "../value_object/stat_type"
import { Stat } from "../object/stat"
import { ValueType } from "../value_object/value_type"

export class PlayerDamageService {
  private player: Player
  // temporary
  private stats = {
    [StatType.CritHitDamage]: .75,
    [StatType.ReloadSpeed]: .33,
    [StatType.WeaponDamage]: 0.6
  }

  constructor(player: Player) {
    this.player = player
  }

  public getStat(type: StatType) : number {
    return this.stats[type]
  }
}