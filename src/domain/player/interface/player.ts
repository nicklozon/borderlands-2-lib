import { Class } from "../value_object/class";
import { Stat } from "./stat";
import { Skill } from "../object/skill";
import { Gear } from "../object/gear/object/gear";
import ClassMod from "../object/gear/object/class_mod";

export interface Player {
  class: Class,
  badAssRanking: Stat[],
  skills: Skill[],
  classMod?: ClassMod,
  relic?: Gear,
}