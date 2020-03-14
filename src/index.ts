import { Class } from "./domain/player/value_object/class";
import { DamageService } from "./domain/weapon/service/damage_service";
import { Manufacturer } from "./domain/weapon/value_object/manufacturer";
import { Player } from "./domain/player/interface/player";
import { Type } from "./domain/weapon/value_object/type";
import { Weapon } from "./domain/weapon/interface/weapon";

let player: Player = {
  class: Class.Commando
}

let weapon: Weapon = {
  manufacturer: Manufacturer.Jakobs,
  type: Type.AssaultRifle,
  damage: 356,
  fireRate: 14.1,
  reloadSpeed: 4.2,
  magazineSize: 22,
  pellets: 2,
  ammoPerShot: 2
}

let ds = new DamageService(weapon, player)

console.log(ds.getDamage())
console.log(ds.getCritDamage())
console.log(ds.getDps())
console.log(ds.getCritDps())