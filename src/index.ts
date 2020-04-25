import { Player } from "./domain/player/interface/player";
import { Class } from "./domain/player/value_object/class";
import { Weapon } from "./domain/weapon/interface/weapon";
import { ElementalEffect } from "./domain/weapon/value_object/elemental_effect";
import { Manufacturer } from "./domain/weapon/value_object/manufacturer";
import { Type } from "./domain/weapon/value_object/type";
import { TablePrinterService } from "./domain/utilities/service/table_printer"
import { StatType } from "./domain/player/value_object/stat_type";
import { DutyCalls, Impact, MetalStorm, LastDitchEffort, Steady, Pressure } from "./domain/player/object/skills/commando";
import { WeaponTypeGear } from "./domain/player/object/gear/object/weapon_type_gear";
import ClassMod from "./domain/player/object/gear/object/class_mod";

// TODO: Other class skills...tried this, gunzerker broke me

// TODO: Profiles which will encapsulate the player object and allow for "Scenarios"
// where you can set things like "fight for your life", "turret deployed",
// "percentage of health", etc.

// TODO: weapons need attributes like grenade reloads
// TODO: calculate things like explosive AR where there is no bullet damage :(

let badAssRanking = [{
  type: StatType.GunDamage,
  value: 0.084
},{
  type: StatType.FireRate,
  value: 0.084
},{
  type: StatType.ReloadSpeed,
  value: 0.087
},{
  type: StatType.CritHitDamage,
  value: 0.08
},{
  type: StatType.ElementalEffectChance,
  value: 0.091
},{
  type: StatType.ElementalEffectDamage,
  value: 0.080
},{
  type: StatType.GrenadeDamage,
  value: 0.087
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
  value: 0.27
},{
  type: StatType.MagazineSize,
  value: 0.26
}],[
  new Pressure(4),
  new LastDitchEffort(3)
])

let skillsA = [
  new Impact(5),
  new DutyCalls(5),
  new Steady(1),
  new MetalStorm(5),
  new Pressure(3)
]

let players: Player[] = [
  new Player(
    Class.Commando,
    skillsA,
    badAssRanking,
    classModA,
    relic,
  ),
]

let weapons: Weapon[] = [{
  name: 'Original Double Barrels!', 
  manufacturer: Manufacturer.Tediore,
  type: Type.Shotgun,
  damage: 2374,
  pellets: 10,
  fireRate: 1.5,
  reloadSpeed: 2.5,
  magazineSize: 6,
  ammoPerShot: 2
},{
  name: 'Purging TMP',
  manufacturer: Manufacturer.Vladof,
  type: Type.Pistol,
  damage: 4621,
  fireRate: 8.0,
  reloadSpeed: 2.2,
  magazineSize: 29,
},{
  name: 'Jam Packed Handgun',
  manufacturer: Manufacturer.Tediore,
  type: Type.Pistol,
  damage: 4171,
  fireRate: 4.8,
  reloadSpeed: 1.5,
  magazineSize: 26,
},{
  name: 'Action Leverage',
  manufacturer: Manufacturer.Hyperion,
  type: Type.Pistol,
  damage: 3984,
  fireRate: 3.7,
  reloadSpeed: 1.6,
  magazineSize: 20,
  elementalChance: 0.12,
  elementalDps: 1732,
  elementalEffect: ElementalEffect.Corrosive
},{
  name: 'Apt Plasma Caster',
  manufacturer: Manufacturer.Maliwan,
  type: Type.SubmachineGun,
  damage: 3092,
  fireRate: 8,
  reloadSpeed: 2.1,
  magazineSize: 52,
  elementalChance: 0.169,
  elementalDps: 2078.4,
  elementalEffect: ElementalEffect.Incendiary,
  ammoPerShot: 2,
  isEtech: true,
  dealsBonusElementalDamage: true
},{
  name: 'Dandy Snider',
  manufacturer: Manufacturer.Maliwan,
  type: Type.SniperRifle,
  damage: 7335,
  fireRate: 1.4,
  reloadSpeed: 4,
  magazineSize: 6,
  elementalChance: 0.375,
  elementalDps: 1732.2,
  elementalEffect: ElementalEffect.Shock,
  dealsBonusElementalDamage: true
},{
  name: 'Deep a Duuurp!',
  manufacturer: Manufacturer.Torgue,
  type: Type.RocketLauncher,
  damage: 134575,
  fireRate: 1.1,
  reloadSpeed: 8.4,
  magazineSize: 5,
  elementalEffect: ElementalEffect.Explosive
}]

players.forEach((player) => {
  let tps = new TablePrinterService(player, weapons)
  tps.printWeaponSummary()
  //tps.printCategoryMaximums()
})