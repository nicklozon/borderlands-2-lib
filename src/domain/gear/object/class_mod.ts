import { Gear } from "./gear";
import { Skill } from "../../build/object/skill";
import { Stat } from "../../build/interface/stat";

// this kind of sucks because the Weapon Specific Gear object is now
// possible here.

// polymorphism is great, but we have a tree of scenarios that could be
// possible...we'll need to use a strategy or fly weight pattern
export class ClassMod extends Gear {
  protected skills: Skill[]

  constructor(stats: Stat[], skills?: Skill[]) {
    super(stats)

    this.skills = skills ?? []
  }

  public getSkills(): Skill[] {
    return this.skills
  }
}