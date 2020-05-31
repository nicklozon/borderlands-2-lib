import { Skill } from "../skill";
import { Stat } from "../../interface";
import { StatType } from "../../value_object";
import { EffectType } from "../../../effect";
import { Context } from "vm";

export class FastHands extends Skill {
  protected stats: Stat[] = [{
    type: StatType.ReloadSpeed,
    value: 0.05
  }]
}

export class Fearless extends Skill {
  protected stats: Stat[] = [{
    type: StatType.FireRate,
    value: 0.05
  },{
    type: StatType.GunDamage,
    value: 0.03
  }]

  protected effectType = EffectType.ShieldDepleted
}

export class Ambush extends Skill {
  // Assuming this is gun damage
  protected stats: Stat[] = [{
    type: StatType.GunDamage,
    value: 0.04
  }]

  protected effectType = EffectType.Ambush
}

export class RisingSh0t extends Skill {
  // Note: procs occur on the primary projectile, so the buff affects the
  //  splash damage on the intial shot meaning this calculator won't be super
  //  accurate for Maliwan bonus damage or torgue explosive weapons
  protected stats: Stat[] = [{
    type: StatType.GunDamage,
    value: 0.02
  }]

  protected effectType = EffectType.RisingSh0t
}

export class DeathMark extends Skill {
  protected stats: Stat[] = [{
    type: StatType.GunDamage,
    value: 0.8
  }]

  protected effectType = EffectType.DeathMark
}

export class Innervate extends Skill {
  protected stats: Stat[] = [{
    type: StatType.GunDamage,
    value: 0.02
  }]

  protected effectType = EffectType.ActionSkill
}