import { Type } from "../../weapon/value_object/type";

export interface WeaponSummary {
  name: string,
  type: Type,
  singleShot: number,
  critShot: number,
  dps: number,
  critDps: number,
  fleshShot: number,
  armorShot: number,
  shieldShot: number
  fleshDps: number,
  armorDps: number,
  shieldDps: number
}