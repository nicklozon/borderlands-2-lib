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
    const { stats, skills } = this.player

    let filteredStats: Stat[] = stats.filter((stat: Stat) => stat.type === statType)
    let statValue = filteredStats.reduce((memo: number, stat: Stat) => memo + stat.value, 0)
    let filteredSkills: number[] = skills.map((skill: Skill) => skill.getStat(statType, weapon))
    let skillValue = filteredSkills.reduce((memo: number, value: number) => memo + value, 0)

    return statValue + skillValue
  }
}