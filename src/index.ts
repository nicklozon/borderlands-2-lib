import { Player } from "./domain/player/interface/player";
import { Class } from "./domain/player/value_object/class";
import { Weapon } from "./domain/weapon/interface/weapon";
import { ElementalEffect } from "./domain/weapon/value_object/elemental_effect";
import { Manufacturer } from "./domain/weapon/value_object/manufacturer";
import { Type } from "./domain/weapon/value_object/type";
import { TablePrinterService } from "./domain/utilities/service/table_printer"
import { StatType } from "./domain/player/value_object/stat_type";
import { DutyCalls, Impact, MetalStorm, Ranger, LastDitchEffort, Steady } from "./domain/player/object/skills/commando";
import { WeaponTypeGear } from "./domain/player/object/gear/object/weapon_type_gear";
import { RedTextEnum } from "./domain/player/object/red_text";
import ClassMod from "./domain/player/object/gear/object/class_mod";

// TODO: TVHM and UVHM stats - this will be fairly simple; create a global
// coefficients service and add the mode to the player.

// TODO: Other class skills...tried this, gunzerker broke me

// TODO: Profiles which will encapsulate the player object and allow for "Scenarios"
// where you can set things like "fight for your life", "turret deployed",
// "percentage of health", etc.

// TODO: weapons need attributes like grenade reloads
// TODO: calculate explosive splash damage
// TODO: calculate things like explosive AR where there is no bullet damage :(

let badAssRanking = [{
  type: StatType.GunDamage,
  value: 0.084
},{
  type: StatType.FireRate,
  value: 0.084
},{
  type: StatType.ReloadSpeed,
  value: 0.084
},{
  type: StatType.CritHitDamage,
  value: 0.08
},{
  type: StatType.ElementalEffectChance,
  value: 0.084
},{
  type: StatType.ElementalEffectDamage,
  value: 0.076
},{
  type: StatType.GrenadeDamage,
  value: 0.084
}]

let relic = new WeaponTypeGear([{
  type: StatType.GunDamage,
  value: 0.181
},{
  type: StatType.FireRate,
  value: 0.49
}], Type.Pistol)

let classModA = new ClassMod([{
  type: StatType.ReloadSpeed,
  value: 0.26
},{
  type: StatType.MagazineSize,
  value: 0.24
}],[
  new Steady(4),
  new LastDitchEffort(3)
])

let skillsA = [
  new Impact(5),
  new DutyCalls(5),
  new Steady(1),
//  new MetalStorm(5)
]

let players: Player[] = [
  new Player(
    Class.Commando,
    skillsA,
    badAssRanking,
    classModA,
    relic
  ),
]

let weapons: Weapon[] = [{
  name: 'Huntin\' Twister',
  manufacturer: Manufacturer.Jakobs,
  type: Type.Shotgun,
  damage: 1592,
  pellets: 17,
  fireRate: 1.8,
  reloadSpeed: 3.1,
  magazineSize: 6,
},{
  name: 'Redundant Lady Fist',
  manufacturer: Manufacturer.Hyperion,
  type: Type.Pistol,
  damage: 389,
  pellets: 2,
  fireRate: 3.6,
  reloadSpeed: 2.0,
  magazineSize: 34,
  redText: RedTextEnum.LadyFist
},{
  name: 'Dva TMP',
  manufacturer: Manufacturer.Vladof,
  type: Type.Pistol,
  damage: 1388,
  fireRate: 6.2,
  reloadSpeed: 2.4,
  magazineSize: 38,
  ammoPerShot: 2,
  pellets: 2
},{
  name: 'Twin Magnum',
  manufacturer: Manufacturer.Maliwan,
  type: Type.Pistol,
  damage: 1195,
  fireRate: 9,
  reloadSpeed: 2.3,
  magazineSize: 29,
  ammoPerShot: 2,
  pellets: 2
},{
  name: 'Loaded Dahlminator',
  manufacturer: Manufacturer.Dahl,
  type: Type.Pistol,
  damage: 761,
  ammoPerShot: 2,
  fireRate: 6.9,
  reloadSpeed: 1.6,
  magazineSize: 38,
  elementalDps: 245.1,
  elementalChance: 0.144,
  elementalEffect: ElementalEffect.Corrosive,
  isEtech: true
},{
  name: 'Rightsizing Presence',
  manufacturer: Manufacturer.Hyperion,
  type: Type.SubmachineGun,
  damage: 950,
  fireRate: 8.7,
  reloadSpeed: 2.1,
  magazineSize: 37,
},{
  name: 'Cutting Edge Yellow Jacket',
  manufacturer: Manufacturer.Hyperion,
  type: Type.SubmachineGun,
  damage: 1030,
  fireRate: 8.7,
  reloadSpeed: 2.7,
  magazineSize: 56,
  isEtech: true,
},{
  name: 'Rigorous Spitter',
  manufacturer: Manufacturer.Torgue,
  type: Type.AssaultRifle,
  damage: 1580,
  fireRate: 5.7,
  reloadSpeed: 3.7,
  magazineSize: 29,
  elementalEffect: ElementalEffect.Explosive,
},{
  name: 'Siah-siah Muckamuck',
  manufacturer: Manufacturer.Jakobs,
  type: Type.SniperRifle,
  damage: 4521,
  fireRate: 0.6,
  reloadSpeed: 5,
  magazineSize: 7,
},{
  name: 'Rocket Speed launcher',
  manufacturer: Manufacturer.Tediore,
  type: Type.RocketLauncher,
  damage: 11149,
  fireRate: 1.1,
  reloadSpeed: 2.4,
  magazineSize: 3,
  elementalEffect: ElementalEffect.Slag,
  elementalChance: 0.3,
  dealsBonusElementalDamage: true
}]

players.forEach((player) => {
  let tps = new TablePrinterService(player, weapons)
  tps.printWeaponSummary()
  //tps.printCategoryMaximums()
})