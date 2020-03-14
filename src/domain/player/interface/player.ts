import { Class } from "../value_object/class";
import { Stat } from "./stat";
import { Skill } from "../object/skill";
import { Com } from "../object/coms/objects/com";

export interface Player {
  class: Class,
  stats: Stat[],
  skills: Skill[],
  com?: Com
}