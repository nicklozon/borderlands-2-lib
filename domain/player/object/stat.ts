import { ValueType } from "../value_object/value_type";
import { StatType } from "../value_object/stat_type";

export interface Stat {
  type: StatType,
  value: number,
  value_type: ValueType
}