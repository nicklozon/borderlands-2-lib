import { Type } from "../../weapon/value_object/type";

export interface WeaponSummary {
  name: string,
  type: Type,
  singleShot?: number,
  critShot?: number,
  critShotFlesh?: number,
  critShotArmor?: number,
  critDpsFlesh?: number,
  critDpsArmor?: number,
  dps?: number,
  critDps?: number,
  fleshShot?: number,
  armorShot?: number,
  shieldShot?: number
  fleshDps?: string,
  armorDps?: string,
  shieldDps?: string
}