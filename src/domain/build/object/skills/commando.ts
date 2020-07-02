import { Skill } from "../skill";
import { StatType } from "../../value_object/stat_type";
import { Stat } from "../../interface/stat";
import { Weapon } from "../../../weapon/interface/weapon";
import { Type } from "../../../weapon/value_object/type";
import { Context } from "../../../context";
import { EffectType } from "../../../effect";

// Geurilla
export class Ready extends Skill {
  name = 'Ready'

  protected stats: Stat[] = [{
    type: StatType.ReloadSpeed,
    value: 0.08
  }]
}

export class Onslaught extends Skill {
  name = 'Onslaught'

  protected stats: Stat[] = [{
    type: StatType.GunDamage,
    value: 0.06
  }]
  protected effectType = EffectType.Onslaught
}

export class CrisisManagement extends Skill {
  name = 'Crisis Management'

  protected stats: Stat[] = [{
    type: StatType.GunDamage,
    value: 0.07
  }]
}

// Gunpowder
export class Impact extends Skill {
  name = 'Impact'

  protected stats: Stat[] = [{
      type: StatType.GunDamage,
      value: 0.04
    }]
}

export class Overload extends Skill {
  name = 'Overload'

  protected stats: Stat[] = [{
      type: StatType.MagazineSize,
      value: 0.1
    }]

  public getStat(statType: StatType, weapon: Weapon, context: Context): number {
    if(weapon.type !== Type.AssaultRifle) return 0

    return super.getStat(statType, weapon, context)
  }
}

export class MetalStorm extends Skill {
  name = 'Metal Storm'

  protected stats: Stat[] = [{
      type: StatType.FireRate,
      value: 0.12
    }]
  protected effectType = EffectType.MetalStorm
}

export class Steady extends Skill {
  name = 'Steady'

  protected stats: Stat[] = [{
      type: StatType.GunDamage,
      value: 0.12
    },{
      type: StatType.GrenadeDamage,
      value: 0.05
    }]

  public getStat(statType: StatType, weapon: Weapon, context: Context): number {
    if(weapon.type !== Type.RocketLauncher && statType !== StatType.GrenadeDamage) return 0

    return super.getStat(statType, weapon, context)
  }
}

export class Battlefront extends Skill {
  name = 'Battlefront'

  protected stats: Stat[] = [{
      type: StatType.GunDamage,
      value: 0.06
    }]
  protected effectType = EffectType.Battlefront
}

export class DutyCalls extends Skill {
  name = 'Duty Calls'

  protected stats: Stat[] = [{
      type: StatType.GunDamage,
      value: 0.05
    },{
      type: StatType.FireRate,
      value: 0.03
    }]

  public getStat(statType: StatType, weapon: Weapon, context: Context): number {
    if(weapon.elementalEffect !== undefined) return 0

    return super.getStat(statType, weapon, context)
  }
}

export class DoOrDie extends Skill {
  name = 'Do or Die'

  protected stats: Stat[] = [{
      type: StatType.GunDamage,
      value: 0.1
    }]

  public getStat(statType: StatType, weapon: Weapon, context: Context): number {
    if(weapon.type !== Type.RocketLauncher) return 0

    return super.getStat(statType, weapon, context)
  }
}

export class Ranger extends Skill {
  name = 'Ranger'

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
  name = 'Last Ditch Effort'

  protected stats: Stat[] = [{
      type: StatType.GunDamage,
      value: 0.08
    }]

  public getEffectiveness(context: Context): number {
    if(!context.effects) return 0

    let crippledEffect = context.getEffect(EffectType.Crippled)
    return crippledEffect ? 1 : 0
  }
}
  
export class Pressure extends Skill {
  name = 'Pressure'

  protected stats: Stat[] = [{
      type: StatType.ReloadSpeed,
      value: 0.14
    }]

  protected getEffectiveness(context: Context): number {
    if(!context.effects) return 0

    let crippledEffect = context.getEffect(EffectType.Crippled)
    if(crippledEffect) return 1

    let healthEffect = context.getEffect(EffectType.Health)
    let healthLost = healthEffect ? 1 - healthEffect.multiplier.getValue() : 0
    return healthLost
  }
}