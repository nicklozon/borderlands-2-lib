import { Skill } from "../../skill";
import { StatType } from "../../../value_object/stat_type";
import { Stat } from "../../../interface/stat";

export class Impact extends Skill {
  protected stats: Stat[]

  constructor(level: number) {
    super(level)

    this.stats = [{
      type: StatType.WeaponDamage,
      value: 0.04
    }]
  }
}