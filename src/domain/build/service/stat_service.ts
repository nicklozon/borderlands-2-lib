import { StatType } from "../value_object/stat_type"
import { Stat } from "../interface/stat"
import { Skill } from "../object/skill"
import { Weapon } from "../../weapon/interface/weapon"
import { Context } from "../../context"
import { Memoize } from "typescript-memoize"

export class StatService {
  protected weapon: Weapon
  protected context: Context

  constructor(weapon: Weapon, context: Context) {
    this.weapon = weapon
    this.context = context
  }

  @Memoize((statType: StatType) => statType)
  public getStat(statType: StatType): number {
    const weapon = this.weapon
    const context = this.context
    const { badassRanking = [], classMod, relic, shield } = context
    const skills = context.getSkills()

    let filteredStats: Stat[] = badassRanking.filter((stat: Stat) => stat.type === statType)
    let statValue = filteredStats.reduce((memo: number, stat: Stat) => memo + stat.value, 0)

    let filteredSkills: number[] = skills.map((skill: Skill) => skill.getStat(statType, weapon, context))
    let skillValue = filteredSkills.reduce((memo: number, value: number) => memo + value, 0)

    let classModValue = classMod ? classMod.getStat(statType, weapon, context): 0
    let relicValue = relic ? relic.getStat(statType, weapon, context): 0
    let shieldValue = shield ? shield.getStat(statType, weapon, context): 0

    return statValue + skillValue + classModValue + relicValue + shieldValue
  }
}