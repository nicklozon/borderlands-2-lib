import { Skill } from "../skill";
import { StatType } from "../../value_object/stat_type";
import { Stat } from "../../interface/stat";
import { Weapon } from "../../../weapon/interface/weapon";
import { Type } from "../../../weapon/value_object/type";
import { Context } from "../../../context";

// Gunlust
export class LockedAndLoaded extends Skill {
  name = 'Locked and Loaded'

  protected stats: Stat[] = [{
    type: StatType.FireRate,
    value: 0.05
  }]
}

export class QuickDraw extends Skill {
  name = 'Quick Draw'

  protected stats: Stat[] = [{
    type: StatType.CritHitDamage,
    value: 0.02
  }]
}

export class ImYourHuckleberry extends Skill {
  name = 'I\'m Your Huckleberry'

  protected stats: Stat[] = [{
    type: StatType.GunDamage,
    value: 0.03
  },{
    type: StatType.ReloadSpeed,
    value: 0.03
  }]

  public getStat(statType: StatType, weapon: Weapon, context: Context): number {
    if(weapon.type !== Type.Pistol) return 0

    return super.getStat(statType, weapon, context)
  }
}

export class AllINeedIsOne extends Skill {
  name = 'All I Need Is One'

  protected stats: Stat[] = [{
    type: StatType.GunDamage,
    value: 0.08
  }]
}

export class DivergentLikeness extends Skill {
  name = 'Divergent Likeness'

  protected stats: Stat[] = [{
    type: StatType.GunDamage,
    value: 0.06
  }]
}

export class MoneyShot extends Skill {
  name = 'Money Shot'

  protected stats: Stat[] = [{
    type: StatType.GunDamage,
    value: 0.08
  }]

  public getStat(statType: StatType, weapon: Weapon, context: Context): number {
    let stat = super.getStat(statType, weapon, context) * weapon.magazineSize

    return stat > 0.8 ? 0.8 : stat
  }
}

export class LayWaste extends Skill {
  name = 'Lay Waste'

  protected stats: Stat[] = [{
      type: StatType.FireRate,
      value: 0.08
    },{
      type: StatType.CritHitDamage,
      value: 0.05
    }]

  public getStat(statType: StatType, weapon: Weapon, context: Context): number {
    if(weapon.type !== Type.RocketLauncher) return 0

    return super.getStat(statType, weapon, context)
  }
}

export class KeepItPipingHot extends Skill {
  name = 'Keep It Piping Hot'

  protected stats: Stat[] = [{
    type: StatType.GunDamage,
    value: 0.05
  }]
}

// Rampage
export class Inconceivable extends Skill {
  name = 'Inconceivable'

  protected stats: Stat[] = [{
    type: StatType.MagazineSize,
    value: 0.10
  }]

  // We need to know the health and shield of the player to know the %
}

// Brawn