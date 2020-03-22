import { Manufacturer } from "../value_object/manufacturer";
import { Type } from "../value_object/type";
import { ElementalEffect } from "../value_object/elemental_effect";
import { Stat } from "../../player/interface/stat";

export interface Weapon {
  name: string,
  manufacturer: Manufacturer,
  type: Type,
  level?: number,
  damage: number,
  fireRate: number,
  reloadSpeed: number,
  magazineSize: number,
  elementalEffect?: ElementalEffect, 
  accuracy?: number,
  pellets: number,
  ammoPerShot: number,
  dealsBonusElementalDamage?: boolean,
  stats?: Stat[],
  elementalChance?: number,
  elementalDps?: number
}