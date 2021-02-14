import { Skill } from "../skill";
import { Stat } from "../../interface";
import { StatType } from "../../value_object";
import { EffectType } from "../../../effect";

export class HeadSh0t extends Skill {
  name = 'Head Sh0t'

  protected stats: Stat[] = [{
    type: StatType.CritHitDamage,
    value: 0.04
  }]
}

export class Optics extends Skill {
  name = 'Optics'

  protected stats: Stat[] = []
}

export class Killer extends Skill {
  name = 'Killer'

  protected stats: Stat[] = []
}

export class Precisi0n extends Skill {
  name = 'Precisi0n'

  protected stats: Stat[] = []
}


export class OneSh0tOneKill extends Skill {
  name = 'One Sh0t One Kill'

  protected stats: Stat[] = [{
    type: StatType.FirstShotGunDamage,
    value: 0.12
  }]
}

export class B0re extends Skill {
  name = 'B0re'

  protected stats: Stat[] = []
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

export class KillConfirmed extends Skill {
  name = 'KillConfirmed'

  protected stats: Stat[] = []
}

export class AtOneWithTheGun extends Skill {
  // We need a way to increase magazine sizes by whole numbers
  name = 'AtOneWithTheGun'

  protected stats: Stat[] = [{
    type: StatType.ReloadSpeed,
    value: 0.1
  }]
}

export class CriticalAscensi0n extends Skill {
  name = 'CriticalAscensi0n'

  protected stats: Stat[] = []
}


export class FastHands extends Skill {
  name = 'Fast Hands'

  protected stats: Stat[] = [{
    type: StatType.ReloadSpeed,
    value: 0.05
  }]
}

export class C0unterStrike extends Skill {
  name = 'C0unterStrike'

  protected stats: Stat[] = []
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

//Unf0rseen

export class Innervate extends Skill {
  name = 'Innervate'

  protected stats: Stat[] = [{
    type: StatType.GunDamage,
    value: 0.02
  }]

  protected effectType = EffectType.ActionSkill
}

export class TwoFang extends Skill {
  name = 'TwoFang'

  protected stats: Stat[] = []
}

export class DeathBl0ss0m extends Skill {
  name = 'DeathBl0ss0m'

  protected stats: Stat[] = []
}

export class KillingBl0w extends Skill {
  name = 'KillingBl0w'

  protected stats: Stat[] = []
}

export class Ir0nHand extends Skill {
  name = 'Ir0nHand'

  protected stats: Stat[] = []
}

export class Grim extends Skill {
  name = 'Grim'

  protected stats: Stat[] = []
}

export class BeLikeWater extends Skill {
  name = 'BeLikeWater'

  protected stats: Stat[] = []
}

export class F0llowthr0ugh extends Skill {
  name = 'F0llowthr0ugh'

  protected stats: Stat[] = []
}

export class Execute extends Skill {
  name = 'Execute'

  protected stats: Stat[] = []
}

export class Backstab extends Skill {
  name = 'Backstab'

  protected stats: Stat[] = []
}

export class Resurgence extends Skill {
  name = 'Resurgence'

  protected stats: Stat[] = []
}

export class LikeTheWind extends Skill {
  name = 'LikeTheWind'

  protected stats: Stat[] = []
}

export class ManyMustFall extends Skill {
  name = 'ManyMustFall'

  protected stats: Stat[] = []
}