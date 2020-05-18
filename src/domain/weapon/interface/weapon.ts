import { Manufacturer } from "../value_object/manufacturer";
import { Type } from "../value_object/type";
import { ElementalEffect } from "../value_object/elemental_effect";
import { Stat } from "../../build/interface/stat";
import { RedTextEnum } from "../../build/object/red_text";

export interface Weapon {
  id?: string,
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
  pellets?: number,
  unlistedPellets?: number,
  ammoPerShot?: number,
  dealsBonusElementalDamage?: boolean,
  stats?: Stat[],
  elementalChance?: number,
  elementalDps?: number,
  isEtech?: boolean,
  redText?: RedTextEnum
}