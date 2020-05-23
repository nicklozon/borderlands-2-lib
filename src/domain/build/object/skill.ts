import { StatType } from "../value_object/stat_type";
import { Stat } from "../interface/stat";
import { Weapon } from "../../weapon/interface/weapon";
import { Context } from "../../context";
import { EffectType } from "../../effect";

export abstract class Skill {
  public level: number 
  protected abstract stats: Stat[]
  protected effectType?: EffectType

  constructor(level: number) {
    this.level = level
  }

  public getStat(statType: StatType, weapon: Weapon, context: Context): number {
    let stat = this.stats.find((stat: Stat) => stat.type === statType)

    if(!stat) return 0

    return stat.value * this.level * this.getEffectiveness(context)
  }
  
  protected getEffectiveness(context: Context): number {
    if(!this.effectType) return 1

    if(context.effects?.find(effect => effect.getEffectType() === this.effectType)) {
      return 1
    }

    return 0
  }

  public getEffectType(): EffectType|void {
    return this.effectType
  }
}