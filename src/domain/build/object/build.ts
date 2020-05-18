import { v4 as uuidv4 } from 'uuid'
import { Class } from "../value_object/class"
import { Skill } from "./skill"
import { ClassMod } from "../../gear/object/class_mod"

export class Build {
  public id : string
  public clazz : Class 
  public skills : Skill[]
  public classMod? : ClassMod

  constructor(
    clazz: Class,
    skills?: Skill[],
    classMod?: ClassMod
  ) {
    this.id = uuidv4()
    this.clazz = clazz
    this.skills = this.computeSkills(skills, classMod)
    this.classMod =  classMod
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