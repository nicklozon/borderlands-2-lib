import { Build } from "./domain/build/object/build";
import { Class } from "./domain/build/value_object/class";
import { Weapon } from "./domain/weapon/interface/weapon";
import { ElementalEffect } from "./domain/weapon/value_object/elemental_effect";
import { Manufacturer } from "./domain/weapon/value_object/manufacturer";
import { Type } from "./domain/weapon/value_object/type";
import { TablePrinterService } from "./domain/utilities/service/table_printer"
import { StatType } from "./domain/build/value_object/stat_type";
import { DutyCalls, Impact, MetalStorm, LastDitchEffort, Steady, Pressure, Onslaught, Ranger, Battlefront, Ready } from "./domain/build/object/skills/commando";
import { ClassMod } from "./domain/gear/object/class_mod";
import { RedTextEnum } from "./domain/build/object/red_text";
import { GameModeEnum } from "./domain/enemy/value_object/elemental_damage_coefficients";
import { Context } from "./domain/context";
import { Gear, WeaponTypeDecorator, HealthEffect, CrippledEffect } from "./domain";

// TODO: Other class skills...tried this, gunzerker broke me
// TODO: weapons need attributes like grenade reloads
//       EDIT: grenade reloads are based on remaining ammo...so calculating
//       this damage would be a one off value? magazine size minus one?
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
  value: 0.084
},{
  type: StatType.ElementalEffectChance,
  value: 0.091
},{
  type: StatType.ElementalEffectDamage,
  value: 0.087
},{
  type: StatType.GrenadeDamage,
  value: 0.087
}]

let relic = new Gear([{
  type: StatType.GunDamage,
  value: 0.181
},{
  type: StatType.FireRate,
  value: 0.49
}], WeaponTypeDecorator(Type.Pistol))

let classModA = new ClassMod([
],[
  new Battlefront(4)
])

let classModB = new ClassMod([{
  type: StatType.ReloadSpeed,
  value: 0.22
},{
  type: StatType.FireRate,
  value: 0.25
}],[
  new Ranger(3),
  new Impact(2),
])

let skillsA = [
  new Pressure(5), // not likely to be used much?
  new Impact(5),
  //new Battlefront(5),
  new Ready(4),
  //new Onslaught(5),
]

let build: Build = new Build(
    Class.Commando,
    skillsA,
    classModA
  )

let weapons: Weapon[] = [{
  name: 'Potential Thinking', 
  manufacturer: Manufacturer.Hyperion,
  type: Type.Shotgun,
  damage: 2906,
  pellets: 6,
  fireRate: 4,
  reloadSpeed: 3.9,
  magazineSize: 10,
  elementalChance: 0.08,
  elementalDps: 2499.1,
  elementalEffect: ElementalEffect.Shock,
},{
  name: 'Redundant Spiker',
  manufacturer: Manufacturer.Maliwan,
  type: Type.Pistol,
  damage: 11179,
  pellets: 2,
  fireRate: 2.8,
  reloadSpeed: 1.5,
  magazineSize: 35,
  elementalChance: 0.216,
  elementalEffect: ElementalEffect.Slag,
  ammoPerShot: 4,
  isEtech: true
},{
  name: 'Practical Lady Fist',
  manufacturer: Manufacturer.Hyperion,
  type: Type.Pistol,
  damage: 4946,
  fireRate: 4.6,
  reloadSpeed: 2.0,
  magazineSize: 25,
  redText: RedTextEnum.LadyFist,
},{
  name: 'Flynt\'s Tinderbox',
  manufacturer: Manufacturer.Bandit,
  type: Type.Pistol,
  damage: 6430,
  fireRate: 3.3,
  reloadSpeed: 3.0,
  magazineSize: 48,
  ammoPerShot: 2,
  elementalChance: 0.258,
  elementalDps: 4604.4,
  elementalEffect: ElementalEffect.Incendiary,
  redText: RedTextEnum.GoodForStartingFires
},{
  name: 'Tactical Hornet',
  manufacturer: Manufacturer.Dahl,
  type: Type.Pistol,
  damage: 9723,
  fireRate: 12.5,
  reloadSpeed: 2,
  magazineSize: 23,
  elementalChance: 0.15,
  elementalDps: 4604.4,
  elementalEffect: ElementalEffect.Corrosive,
},{
  name: 'Slippery Root',
  manufacturer: Manufacturer.Torgue,
  type: Type.AssaultRifle,
  damage: 7093,
  fireRate: 4.6,
  reloadSpeed: 3.1,
  magazineSize: 21,
  elementalEffect: ElementalEffect.Explosive
},{
  name: 'Guileless SubMalevolent Grace',
  manufacturer: Manufacturer.Maliwan,
  type: Type.SubmachineGun,
  damage: 4394,
  fireRate: 8,
  reloadSpeed: 3.2,
  magazineSize: 27,
  elementalChance: 0.125,
  elementalDps: 4327.1,
  elementalEffect: ElementalEffect.Incendiary
},{
  name: 'Skorry Bratchny',
  manufacturer: Manufacturer.Vladof,
  type: Type.SniperRifle,
  damage: 11720,
  fireRate: 5.2,
  reloadSpeed: 3.1,
  magazineSize: 12,
  elementalChance: 0.3,
  elementalDps: 3605.9,
  elementalEffect: ElementalEffect.Incendiary,
},{
  name: 'Skookum Muckamuck',
  manufacturer: Manufacturer.Jakobs,
  type: Type.SniperRifle,
  damage: 30479,
  fireRate: 2.6,
  reloadSpeed: 4,
  magazineSize: 8,
},{
  name: 'Gentleman\'s Corinthian',
  manufacturer: Manufacturer.Maliwan,
  type: Type.SniperRifle,
  damage: 15271,
  fireRate: 1.1,
  reloadSpeed: 4.2,
  magazineSize: 5,
  elementalChance: 0.375,
  elementalDps: 3606.1,
  elementalEffect: ElementalEffect.Corrosive,
  dealsBonusElementalDamage: true
}]

let gameMode = GameModeEnum.TrueVaultHunterMode
let contexts : Context[] = [{
    build,
    badAssRanking,
    gameMode,
    relic,
    effects: [
      //new HealthEffect(1)
      new CrippledEffect()
    ],
  }]

contexts.forEach((context) => {
  let tps = new TablePrinterService(context, weapons)
  tps.printWeaponSummary()
  //tps.printCategoryMaximums()
})