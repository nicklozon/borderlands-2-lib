import { Player } from "./domain/player/interface/player";
import { Class } from "./domain/player/value_object/class";
import { Weapon } from "./domain/weapon/interface/weapon";
import { ElementalEffect } from "./domain/weapon/value_object/elemental_effect";
import { Manufacturer } from "./domain/weapon/value_object/manufacturer";
import { Type } from "./domain/weapon/value_object/type";
import { TablePrinterService } from "./domain/utilities/service/table_printer"

// TODO: TVHM and UVHM stats - this will be fairly simple; create a global
// coefficients service and add the mode to the player.

// TODO: player needs COMs/relics/BAR/build
let player: Player = {
  class: Class.Commando
}

// TODO: weapons need elemental DOTs
// TODO: weapons need attributes like grenade, additional elemental damage, etc
// TODO: calculate slag/explosive splash damage
// TODO: calculate things like explosive AR where there is no bullet damage :(
let weapons: Weapon[] = [{
  name: 'Assault Rifle',
  manufacturer: Manufacturer.Jakobs,
  type: Type.AssaultRifle,
  damage: 356,
  fireRate: 14.1,
  reloadSpeed: 4.2,
  magazineSize: 22,
  pellets: 2,
  ammoPerShot: 2,
  elementalEffect: ElementalEffect.Incendiary
},{
  name: 'SMG',
  manufacturer: Manufacturer.Jakobs,
  type: Type.SubmachineGun,
  damage: 227,
  fireRate: 12,
  reloadSpeed: 1.9,
  magazineSize: 33,
  pellets: 1,
  ammoPerShot: 1,
  elementalEffect: ElementalEffect.Corrosive,
}]

let tps = new TablePrinterService(player, weapons)
tps.printWeaponSummary()
tps.printCategoryMaximums()
