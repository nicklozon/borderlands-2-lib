import { Class } from "../value_object/class";
import { Stat } from "../interface/stat";
import { Skill } from "./skill";
import { Gear } from "../../gear/object/gear";
import { ClassMod } from "../../gear/object/class_mod";

export class Player {
  public clazz : Class 
  public skills : Skill[]
  public badAssRanking : Stat[]
  public classMod? : ClassMod
  public relic? : Gear
  public shield? : Gear // should just merge all gear

  constructor(
    clazz: Class,
    skills?: Skill[],
    badAssRanking?: Stat[],
    classMod?: ClassMod,
    relic?: Gear,
    shield?: Gear,
  ) {
    this.clazz = clazz
    this.skills = this.computeSkills(skills, classMod)
    this.badAssRanking = badAssRanking ?? []
    this.classMod = classMod
    this.relic = relic
    this.shield = shield
  }

  private computeSkills(skills?: Skill[], classMod?: ClassMod): Skill[] {
    if(!skills) return []
    if(!classMod) return skills
    let classModSkills = classMod.getSkills()

    // merge class mod skills into skills
    return skills.map((skill: Skill) => {
      let classModSkill = classModSkills.find((classModSkill: Skill) => classModSkill.constructor.name === skill.constructor.name )
      let classModLevel = classModSkill?.level ?? 0
      return skill.constructor(skill.level + classModLevel)
    })
  }
}