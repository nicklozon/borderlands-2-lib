import { v4 as uuidv4 } from 'uuid'
import { Stat, getStat } from "../../build/interface/stat"
import { StatType } from "../../build/value_object/stat_type"
import { Weapon } from "../../weapon/interface/weapon"
import { Context } from "../../context"
import { Decorator } from './decorator'
import { RedTextEnum } from '../../build'
import { GearType } from './gear_type'

/**
 * Represents COMs, Relics, and any other gear that contains stats
 * 
 * Gear will have certain limitations, like the type of weapon that is affected
 */
export class Gear {
  public id: string
  public type: GearType
  public name?: string
  protected stats: Stat[]
  protected decorator?: Decorator
  protected redText?: RedTextEnum

  constructor(type: GearType, stats: Stat[], decorator?: Decorator, redText?: RedTextEnum) {
    this.id = uuidv4()
    this.type = type
    this.stats = stats
    this.decorator = decorator
    this.redText = redText
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