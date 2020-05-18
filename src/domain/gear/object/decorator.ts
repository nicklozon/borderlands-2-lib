import { Weapon, Type } from "../../weapon";
import { Context } from "../../context";

export type Decorator = (weapon: Weapon, context: Context) => boolean

export function WeaponTypeDecorator(type: Type): Decorator {
  return (weapon: Weapon, context: Context) => type === weapon.type
}