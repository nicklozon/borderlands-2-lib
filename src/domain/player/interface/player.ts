import { Class } from "../value_object/class";
import { Stat } from "./stat";
import { Skill } from "../object/skill";
import { Gear } from "../object/gear/object/gear";

export interface Player {
  class: Class,
  badAssRanking: Stat[],
  skills: Skill[],
  classMod?: Gear,
  relic?: Gear,
}