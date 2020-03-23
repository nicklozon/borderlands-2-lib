import { Class } from "../value_object/class";
import { Stat } from "./stat";
import { Skill } from "../object/skill";
import { Gear } from "../object/gear/object/gear";

export interface Player {
  class: Class,
  stats: Stat[],
  skills: Skill[],
  com?: Gear,
  relic?: Gear,
}