import { Type } from "../../weapon/value_object/type";

export interface WeaponSummary {
  name: string,
  type: Type,
  singleShot?: number,
  dps?: number,
  critShot?: number,
  critDps?: number,
  fleshShot?: number,
  fleshDps?: number,
  fleshCritShot?: number,
  fleshCritDps?: number,
  armorShot?: number,
  armorDps?: number,
  armorCritShot?: number,
  armorCritDps?: number,
  shieldShot?: number
  shieldDps?: number
  shieldCritShot?: number,
  shieldCritDps?: number,
}