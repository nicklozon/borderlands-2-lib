import { Skill } from "../skill";
import { StatType } from "../../value_object/stat_type";
import { Stat } from "../../interface/stat";
import { Weapon } from "../../../weapon/interface/weapon";
import { Type } from "../../../weapon/value_object/type";

// Geurilla
export class Ready extends Skill {
  protected stats: Stat[] = [{
    type: StatType.ReloadSpeed,
    value: 0.08
  }]
}

export class Onslaught extends Skill {
  protected stats: Stat[] = [{
    type: StatType.GunDamage,
    value: 0.06
  }]
}

export class CrisisManagement extends Skill {
  protected stats: Stat[] = [{
    type: StatType.GunDamage,
    value: 0.07
  }]
}

// Gunpowder
export class Impact extends Skill {
  protected stats: Stat[] = [{
      type: StatType.GunDamage,
      value: 0.04
    }]
}

export class Overload extends Skill {
  protected stats: Stat[] = [{
      type: StatType.MagazineSize,
      value: 0.1
    }]

  public getStat(statType: StatType, weapon: Weapon): number {
    if(weapon.type !== Type.AssaultRifle) return 0

    return super.getStat(statType, weapon)
  }
}

export class MetalStorm extends Skill {
  protected stats: Stat[] = [{
      type: StatType.FireRate,
      value: 0.12
    }]
}

export class Steady extends Skill {
  protected stats: Stat[] = [{
      type: StatType.GunDamage,
      value: 0.12
    },{
      type: StatType.GrenadeDamage,
      value: 0.05
    }]

  public getStat(statType: StatType, weapon: Weapon): number {
    if(weapon.type !== Type.RocketLauncher && statType !== StatType.GrenadeDamage) return 0

    return super.getStat(statType, weapon)
  }
}

export class Battlefront extends Skill {
  protected stats: Stat[] = [{
      type: StatType.GunDamage,
      value: 0.06
    }]
}

export class DutyCalls extends Skill {
  protected stats: Stat[] = [{
      type: StatType.GunDamage,
      value: 0.05
    },{
      type: StatType.FireRate,
      value: 0.03
    }]

  public getStat(statType: StatType, weapon: Weapon): number {
    if(weapon.elementalEffect !== undefined) return 0

    return super.getStat(statType, weapon)
  }
}

export class DoOrDie extends Skill {
  protected stats: Stat[] = [{
      type: StatType.GunDamage,
      value: 0.1
    }]

  public getStat(statType: StatType, weapon: Weapon): number {
    if(weapon.type !== Type.RocketLauncher) return 0

    return super.getStat(statType, weapon)
  }
}

export class Ranger extends Skill {
  protected stats: Stat[] = [{
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

// Survival
export class LastDitchEffort extends Skill {
  protected stats: Stat[] = [{
      type: StatType.GunDamage,
      value: 0.08
    }]
}
  
export class Pressure extends Skill {
  protected stats: Stat[] = [{
      type: StatType.ReloadSpeed,
      value: 0.14
    }]

  // The value is the % of lost health - 0 at full health, 100% at zero or in
  // fight for your life. This skill will have a custom getStat() method when
  // Scenarios become a thing.
}