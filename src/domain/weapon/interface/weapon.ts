import { Manufacturer } from "../value_object/manufacturer";
import { Type } from "../value_object/type";
import { ElementalEffect } from "../value_object/elemental_effect";

export interface Weapon {
  manufacturer: Manufacturer,
  type: Type,
  level?: number,
  damage: number,
  fire_rate: number,
  reload_speed: number,
  magazine_size: number,
  elemental_effect?: ElementalEffect, 
  accuracy?: number,
  //pellets: number
  //ammo_consumed: number
}