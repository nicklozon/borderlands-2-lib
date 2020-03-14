import { Type } from "../../weapon/value_object/type";

export interface WeaponSummary {
  name: string,
  type: Type,
  singleShot: number,
  critShot: number,
  dps: number,
  critDps: number,
  fleshDps: number,
  armorDps: number,
  shieldDps: number
}