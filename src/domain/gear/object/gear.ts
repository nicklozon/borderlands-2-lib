import { v4 as uuidv4 } from 'uuid'
import { Stat } from "../../build/interface/stat"
import { StatType } from "../../build/value_object/stat_type"
import { Weapon } from "../../weapon/interface/weapon"
import { Context } from "../../context"
import { Type } from "../../weapon"

type Decorator = (weapon: Weapon, context: Context) => boolean

// TODO: We will eventually need to have decorators on more than just gear,
//   some class mods have per stats specific items for example,so this code
//   will need to be moved into it's own namespace.
export function WeaponTypeDecorator(type: Type): Decorator {
  return (weapon: Weapon, context: Context) => type === weapon.type
}

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

    let stat = this.stats.find((stat: Stat) => stat.type === statType)

    if(!stat) return 0

    return stat.value
  }
}