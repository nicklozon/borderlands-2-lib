import { Skill } from "../../skill";
import { StatType } from "../../../value_object/stat_type";
import { Stat } from "../../../interface/stat";

export class Ranger extends Skill {
  protected stats: Stat[]

  constructor(level: number) {
    super(level)

    this.stats = [{
      type: StatType.GunDamage,
      value: 0.01
    },{
      type: StatType.CritHitDamage,
      value: 0.01
    },{
      type: StatType.FireRate,
      value: 0.01
    },{
      type: StatType.MagazineSize,
      value: 0.01
    },{
      type: StatType.ReloadSpeed,
      value: 0.01
    }]
  }
}