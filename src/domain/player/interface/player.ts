import { Class } from "../value_object/class";
import { Stat } from "./stat";

export interface Player {
  class: Class,
  stats: Stat[]
}