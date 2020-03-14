import { Player } from "./domain/player/interface/player";
import { Class } from "./domain/player/value_object/class";
import { Weapon } from "./domain/weapon/interface/weapon";
import { ElementalEffect } from "./domain/weapon/value_object/elemental_effect";
import { Manufacturer } from "./domain/weapon/value_object/manufacturer";
import { Type } from "./domain/weapon/value_object/type";
import { TablePrinterService } from "./domain/utilities/service/table_printer"
import { StatType } from "./domain/player/value_object/stat_type";

// TODO: TVHM and UVHM stats - this will be fairly simple; create a global
// coefficients service and add the mode to the player.

// TODO: player needs COMs/relics/BAR/build
let player: Player = {
  class: Class.Commando,
  stats: [{
    type: StatType.CritHitDamage,
    value: 0
  },{
    type: StatType.ReloadSpeed,
    value: 0
  },{
    // impact * 5
    type: StatType.WeaponDamage,
    value: 0.2
  },{
    // ranger * 1
    type: StatType.WeaponDamage,
    value: 0.01
  },{
    // ranger * 1
    type: StatType.CritHitDamage,
    value: 0.01
  },{
    // duty calls * 5
    type: StatType.WeaponDamage,
    //value: 0.25
    value: 0.25
  }]
}

// TODO: weapons need elemental DOTs
// TODO: weapons need attributes like grenade, additional elemental damage, etc
// TODO: calculate slag/explosive splash damage
// TODO: calculate things like explosive AR where there is no bullet damage :(
let weapons: Weapon[] = [{
  name: 'Evisceration Umbrage',
  manufacturer: Manufacturer.Maliwan,
  type: Type.Pistol,
  damage: 226,
  fireRate: 3.2,
  reloadSpeed: 2.1,
  magazineSize: 10,
  pellets: 1,
  ammoPerShot: 2,
  elementalEffect: ElementalEffect.Slag,
  dealsBonusElementalDamage: true
},{
  name: 'Miss Moxxi\'s Bad Touch',
  manufacturer: Manufacturer.Maliwan,
  type: Type.SubmachineGun,
  damage: 84,
  fireRate: 8,
  reloadSpeed: 3.2,
  magazineSize: 27,
  pellets: 1,
  ammoPerShot: 1,
  elementalEffect: ElementalEffect.Corrosive,
},{
  name: 'Flush Rifle',
  manufacturer: Manufacturer.Jakobs,
  type: Type.AssaultRifle,
  damage: 356,
  fireRate: 14.1,
  reloadSpeed: 4.2,
  magazineSize: 22,
  pellets: 1,
  ammoPerShot: 1
}]

let tps = new TablePrinterService(player, weapons)
tps.printWeaponSummary()
tps.printCategoryMaximums()
