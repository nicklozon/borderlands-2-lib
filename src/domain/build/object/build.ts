import { v4 as uuidv4 } from 'uuid'
import { Class } from "../value_object/class"
import { Skill } from "./skill"

export class Build {
  public id : string
  public clazz : Class 
  public skills : Skill[]
  public name? : string

  constructor(
    clazz: Class,
    skills: Skill[],
    name?: string
  ) {
    this.id = uuidv4()
    this.clazz = clazz
    this.skills = skills
    this.name = name
  }
}