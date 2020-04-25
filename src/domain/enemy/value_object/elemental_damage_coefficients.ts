import { ElementalEffect } from "../../weapon/value_object/elemental_effect"
import { TargetType } from "./target_type"

export enum GameModeEnum {
  NormalMode,
  TrueVaultHunterMode,
}

let coefficients = {
  [GameModeEnum.NormalMode]:  {
    [ElementalEffect.Explosive]: {
      [TargetType.Shield]: 0.8
    },
    [ElementalEffect.Incendiary]: {
      [TargetType.Flesh]: 1.5,
      [TargetType.Armor]: 0.75,
      [TargetType.Shield]: 0.75
    },
    [ElementalEffect.Shock]: {
      [TargetType.Shield]: 2
    },
    [ElementalEffect.Corrosive]: {
      [TargetType.Flesh]: 0.9,
      [TargetType.Armor]: 1.5,
      [TargetType.Shield]: 0.75
    }
  },
  [GameModeEnum.TrueVaultHunterMode]:  {
    [ElementalEffect.Explosive]: {
      [TargetType.Shield]: 0.8
    },
    [ElementalEffect.Incendiary]: {
      [TargetType.Flesh]: 1.75,
      [TargetType.Armor]: 0.4,
      [TargetType.Shield]: 0.4
    },
    [ElementalEffect.Shock]: {
      [TargetType.Shield]: 2.5
    },
    [ElementalEffect.Corrosive]: {
      [TargetType.Flesh]: 0.6,
      [TargetType.Armor]: 1.75,
      [TargetType.Shield]: 0.4
    }
  }
}

export function ElementalDamageCoefficients(mode: GameModeEnum) {
  return coefficients[mode]
}