import { Gear } from "./gear";
import { Skill } from "../../skill";
import { Stat } from "../../../interface/stat";

export default class ClassMod extends Gear {
  protected skills: Skill[]

  constructor(stats: Stat[], skills?: Skill[]) {
    super(stats)

    this.skills = skills ?? []
  }

  public getSkills() : Skill[] {
    return this.skills
  }
}