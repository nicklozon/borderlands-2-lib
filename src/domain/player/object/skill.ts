import { StatType } from "../value_object/stat_type";
import { Stat } from "../interface/stat";
import { Weapon } from "../../weapon/interface/weapon";
import { Context } from "../../context";
import { EffectType } from "../../effect";

export abstract class Skill {
  public level: number 
  protected abstract stats: Stat[]

  constructor(level: number) {
    this.level = level
  }

  public getStat(statType: StatType, weapon: Weapon, context: Context): number {
    if(!this.isActivated(context)) return 0
    let stat = this.stats.find((stat: Stat) => stat.type === statType)

    if(!stat) return 0

    return stat.value * this.level * this.getEffectiveness(context)
  }
  
  // Are there any skills that have more than one effect?
  public getEffectType(): EffectType|void {

  }

  protected isActivated(context: Context): boolean {
    if(!this.getEffectType() || !context.effects) return true

    let found = context.effects.find(effect => effect === this.getEffectType())
    return !!found
  }

  protected getEffectiveness(context: Context): number {
    return 1
  }
}