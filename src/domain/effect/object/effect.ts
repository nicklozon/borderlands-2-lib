export enum EffectType {
  Pimpernel = 'Pimpernel',
  ActionSkill = 'ActionSkill',
  Crippled = 'Crippled',
  Health = 'Health',
  MetalStorm = 'MetalStorm',
  Onslaught = 'Onslaught',
  Battlefront = 'Battlefront',
}

// This would treat effects a binary states...but effects could vary
//   health can be a %, pimpernel can stack crit shots
class Multiplier {
  public value: number = 1

  public getValue(): number {
    return this.value
  }

  public setValue(value: number): void {
    this.value = value
  }
}

class PercentageMultiplier extends Multiplier {

}

class RangeMultiplier extends Multiplier {
  public max: number
  public step: number

  constructor(max: number, step: number = 1) {
    super()
    this.max = max
    this.step = step
  }
}

export abstract class Effect {
  public multiplier: Multiplier = new Multiplier()
  protected abstract effectType: EffectType

  public getEffectType(): EffectType {
    return this.effectType
  }
}

export class PimpernelEffect extends Effect {
  protected effectType = EffectType.Pimpernel
  public multiplier: Multiplier = new RangeMultiplier(7)
}

export class ActionSkillEffect extends Effect {
  protected effectType = EffectType.ActionSkill
}

export class CrippledEffect extends Effect {
  protected effectType = EffectType.Crippled
}

export class HealthEffect extends Effect {
  protected effectType = EffectType.Health
  public multiplier: Multiplier = new PercentageMultiplier()

  constructor(health?: number) {
    super()
    if(health != undefined) this.multiplier.setValue(health)
  }
}

export class MetalStormEffect extends Effect {
  protected effectType = EffectType.MetalStorm
}

export class OnslaughtEffect extends Effect {
  protected effectType = EffectType.Onslaught
}

export class BattlefrontEffect extends Effect {
  protected effectType = EffectType.Battlefront
}