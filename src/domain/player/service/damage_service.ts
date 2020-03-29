import { Player } from "../interface/player"
import { StatType } from "../value_object/stat_type"
import { Stat } from "../interface/stat"
import { Skill } from "../object/skill"
import { Weapon } from "../../weapon/interface/weapon"

export class PlayerDamageService {
  private player: Player

  constructor(player: Player) {
    this.player = player
  }

  public getStat(statType: StatType, weapon: Weapon) : number {
    const { badAssRanking, classMod, relic } = this.player

    let filteredStats: Stat[] = badAssRanking.filter((stat: Stat) => stat.type === statType)
    let statValue = filteredStats.reduce((memo: number, stat: Stat) => memo + stat.value, 0)

    let skills = this.getSkills()
    let filteredSkills: number[] = skills.map((skill: Skill) => skill.getStat(statType, weapon))
    let skillValue = filteredSkills.reduce((memo: number, value: number) => memo + value, 0)

    let classModValue = classMod ? classMod.getStat(statType, weapon) : 0
    let relicValue = relic ? relic.getStat(statType, weapon) : 0

    return statValue + skillValue + classModValue + relicValue
  }

  protected getClassModSkills() : Skill[] {
    const { classMod } = this.player

    if(!classMod) return []

    return classMod.getSkills()
  }

  protected getSkills() : Skill[] {
    const { skills } = this.player

    // TODO: merge class mod skills with player skills
    let classModSkills = this.getClassModSkills()
    return skills
  }
}