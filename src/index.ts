import { Player } from "./domain/player/interface/player";
import { Class } from "./domain/player/value_object/class";
import { Weapon } from "./domain/weapon/interface/weapon";
import { ElementalEffect } from "./domain/weapon/value_object/elemental_effect";
import { Manufacturer } from "./domain/weapon/value_object/manufacturer";
import { Type } from "./domain/weapon/value_object/type";
import { TablePrinterService } from "./domain/utilities/service/table_printer"
import { StatType } from "./domain/player/value_object/stat_type";
import { DutyCalls, Impact } from "./domain/player/object/skills/commando";
import { WeaponTypeGear } from "./domain/player/object/gear/object/weapon_type_gear";
import { RedTextEnum, RedText } from "./domain/player/object/red_text";
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
  value: 0.08
},{
  type: StatType.FireRate,
  value: 0.076
},{
  type: StatType.ReloadSpeed,
  value: 0.072
},{
  type: StatType.CritHitDamage,
  value: 0.076
},{
  type: StatType.ElementalEffectChance,
  value: 0.076
},{
  type: StatType.ElementalEffectDamage,
  value: 0.072
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
  value: 0.24
},{
  type: StatType.MagazineSize,
  value: 0.26
}])

let skillsA = [
  new Impact(5),
  new DutyCalls(5),
]

let players: Player[] = [
  new Player(
    Class.Commando,
    skillsA,
    badAssRanking,
    classModA,
    relic
  )
]

let weapons: Weapon[] = [{
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
  // this is broke, stats aren't applying properly in game...
  // one level in Impact (4%) gun damage increases damage from 4281 to 4318
  // expected increase is 4452, even in Derch's excel calculator...
  // that's 78.4% of damage missing from stats...
  // hit with a single pellet is affected the same way
  name: 'Practical Fibber',
  manufacturer: Manufacturer.Hyperion,
  type: Type.Pistol,
  damage: 612,
  fireRate: 2.4,
  reloadSpeed: 4.5,
  magazineSize: 17,
  pellets: 1,
  unlistedPellets: 6,
  ammoPerShot: 1
},{
  name: 'Trick Shot Widow Maker',
  manufacturer: Manufacturer.Jakobs,
  type: Type.Pistol,
  damage: 976,
  fireRate: 16.7,
  reloadSpeed: 2.1,
  magazineSize: 9
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
  name: 'Fast Rifle',
  manufacturer: Manufacturer.Jakobs,
  type: Type.AssaultRifle,
  damage: 772,
  fireRate: 15.7,
  reloadSpeed: 3.3,
  magazineSize: 12,
},{
  name: 'Tumtum Buffalo',
  manufacturer: Manufacturer.Jakobs,
  type: Type.SniperRifle,
  damage: 2559,
  fireRate: 0.6,
  reloadSpeed: 5,
  magazineSize: 7,
  stats: [{
    type: StatType.CritHitDamage,
    value: 1.8
  }]
},{
  name: 'rock a boom',
  manufacturer: Manufacturer.Torgue,
  type: Type.RocketLauncher,
  damage: 8102,
  fireRate: 1.2,
  reloadSpeed: 7,
  magazineSize: 2,
  elementalEffect: ElementalEffect.Explosive
}]

players.forEach((player) => {
  let tps = new TablePrinterService(player, weapons)
  tps.printWeaponSummary()
  //tps.printCategoryMaximums()
})