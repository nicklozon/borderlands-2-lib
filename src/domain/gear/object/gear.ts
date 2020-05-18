import { v4 as uuidv4 } from 'uuid'
import { Stat, getStat } from "../../build/interface/stat"
import { StatType } from "../../build/value_object/stat_type"
import { Weapon } from "../../weapon/interface/weapon"
import { Context } from "../../context"
import { Type } from "../../weapon"
import { Decorator } from './decorator'

/**
 * Represents COMs, Relics, and any other gear that contains stats
 * 
 * Gear will have certain limitations, like the type of weapon that is affected
 */
export class Gear {
  public id: string
  protected stats: Stat[]
  protected decorator?: Decorator

  constructor(stats: Stat[], decorator?: Decorator) {
    this.id = uuidv4()
    this.stats = stats
    this.decorator = decorator
  }

  public getStat(statType: StatType, weapon: Weapon, context: Context): number {
    if(this.decorator && !this.decorator(weapon, context)) {
      return 0
    }

    let stat = getStat(statType, this.stats, weapon, context)

    if(!stat) return 0

    return stat.value
  }
}