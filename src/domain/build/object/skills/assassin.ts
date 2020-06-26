import { Skill } from "../skill";
import { Stat } from "../../interface";
import { StatType } from "../../value_object";
import { EffectType } from "../../../effect";

export class FastHands extends Skill {
  name = 'Fast Hands'

  protected stats: Stat[] = [{
    type: StatType.ReloadSpeed,
    value: 0.05
  }]
}

export class Fearless extends Skill {
  name = 'Fearless'

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
  name = 'Ambush'

  // Assuming this is gun damage
  protected stats: Stat[] = [{
    type: StatType.GunDamage,
    value: 0.04
  }]

  protected effectType = EffectType.Ambush
}

export class RisingSh0t extends Skill {
  name = 'Rising Sh0t'

  // Note: procs occur on the primary projectile, so the buff affects the
  //  splash damage on the intial shot meaning this calculator won't be super
  //  accurate for Maliwan bonus damage or torgue explosive weapons
  // If we wanted this to be super accurate we could have damage calculations
  //  identify if they are secondary projectiles which stacking skills like
  //  this one know how to...aas
  protected stats: Stat[] = [{
    type: StatType.GunDamage,
    value: 0.02
  }]

  protected effectType = EffectType.RisingSh0t
}

export class DeathMark extends Skill {
  name = 'Death Mark'

  protected stats: Stat[] = [{
    type: StatType.GunDamage,
    value: 0.8
  }]

  protected effectType = EffectType.DeathMark
}

export class Innervate extends Skill {
  name = 'Innvervate'

  protected stats: Stat[] = [{
    type: StatType.GunDamage,
    value: 0.02
  }]

  protected effectType = EffectType.ActionSkill
}

export class HeadSh0t extends Skill {
  name = 'Head Sh0t'

  protected stats: Stat[] = [{
    type: StatType.CritHitDamage,
    value: 0.04
  }]
}

export class Vel0city extends Skill {
  name = 'Vel0city'

  protected stats: Stat[] = [{
    type: StatType.CritHitDamage,
    value: 0.03
  },{
    type: StatType.GunDamage,
    value: 0.02
  }]
}

export class OneSh0tOneKill extends Skill {
  name = 'One Sh0t One Kill'

  protected stats: Stat[] = [{
    type: StatType.FirstShotGunDamage,
    value: 0.12
  }]
}