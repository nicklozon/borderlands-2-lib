import { Class } from "../value_object/class";
import { Stat } from "./stat";
import { Skill } from "../object/skill";

export interface Player {
  class: Class,
  stats: Stat[],
  skills: Skill[]
}