import { Player } from "./domain/player/interface/player";
import { Class } from "./domain/player/value_object/class";
import { Weapon } from "./domain/weapon/interface/weapon";
import { ElementalEffect } from "./domain/weapon/value_object/elemental_effect";
import { Manufacturer } from "./domain/weapon/value_object/manufacturer";
import { Type } from "./domain/weapon/value_object/type";
import { TablePrinterService } from "./domain/utilities/service/table_printer"
import { StatType } from "./domain/player/value_object/stat_type";
import { DutyCalls, Ranger, Impact } from "./domain/player/object/skills/commando";
import { Com } from "./domain/player/object/coms/objects/com";

// TODO: TVHM and UVHM stats - this will be fairly simple; create a global
// coefficients service and add the mode to the player.

// TODO: Other class skills

// TODO: Profiles which will encapsulate the player object and allow for "Scenarios"
// where you can set things like "fight for your life", "turret deployed",
// "percentage of health"

// TODO: player needs relics/BAR
let players: Player[] = [{
    class: Class.Commando,
    stats: [], // should become BAR I think
    com: new Com([{
      type: StatType.ReloadSpeed,
      value: 0.23
    },{
      type: StatType.MagazineSize,
      value: 0.22
    }]),
    skills: [
      new Impact(5),
      new DutyCalls(5),
      new Ranger(3),
    ]
  }]

// TODO: weapons need elemental DOTs
// TODO: weapons need attributes like grenade reloads
// TODO: calculate explosive splash damage
// TODO: calculate things like explosive AR where there is no bullet damage :(
let weapons: Weapon[] = [{
  name: 'Sledge\'s Shotgun',
  manufacturer: Manufacturer.Bandit,
  type: Type.Shotgun,
  damage: 131,
  fireRate: 7.4,
  reloadSpeed: 3.4,
  magazineSize: 12,
  pellets: 12,
  ammoPerShot: 2
},{
  name: 'Filled Law',
  manufacturer: Manufacturer.Jakobs,
  type: Type.Pistol,
  damage: 673,
  fireRate: 16.7,
  reloadSpeed: 2.3,
  magazineSize: 10,
},{
  name: 'Miss Moxxi\'s Good touch',
  manufacturer: Manufacturer.Maliwan,
  type: Type.SubmachineGun,
  damage: 226,
  fireRate: 8,
  reloadSpeed: 3.2,
  magazineSize: 27,
  elementalEffect: ElementalEffect.Incendiary,
  elementalChance: 0.156,
  elementalDps: 293.6,
  stats: [{
    type: StatType.CritHitDamage,
    value: 0.7
  }]
},{
  name: 'Wild Hammer Buster',
  manufacturer: Manufacturer.Jakobs,
  type: Type.AssaultRifle,
  damage: 640,
  fireRate: 18.7,
  reloadSpeed: 3.8,
  magazineSize: 13,
},{
  name: 'Expansive Spinigun',
  manufacturer: Manufacturer.Vladof,
  type: Type.AssaultRifle,
  damage: 176,
  fireRate: 10.5,
  reloadSpeed: 3.7,
  magazineSize: 58,
  elementalEffect: ElementalEffect.Corrosive,
  elementalChance: 0.06,
  elementalDps: 133
},{
  name: 'Surgical Sloth',
  manufacturer: Manufacturer.Dahl,
  type: Type.SniperRifle,
  damage: 501,
  fireRate: 6.1,
  reloadSpeed: 4.2,
  magazineSize: 7,
  elementalEffect: ElementalEffect.Corrosive,
  elementalChance: 0.3,
  elementalDps: 81.6
  // TODO: burst while zoomed
},{
  // e-tech, so suffer 100% crit penalty
  name: 'Longitudinal Hybridfication',
  manufacturer: Manufacturer.Hyperion,
  type: Type.SniperRifle,
  damage: 1009,
  fireRate: 2,
  reloadSpeed: 4,
  magazineSize: 6,
  ammoPerShot: 2,
  elementalEffect: ElementalEffect.Shock,
  elementalChance: 0.36,
  elementalDps: 133,
  isEtech: true
},{
  // Morningstar are a special hyperion quest item that increases subsequent
  // cirtical hit damage by 20% after landing a critical hit, stacks up to 3
  name: 'Cohesion Morningstar',
  manufacturer: Manufacturer.Hyperion,
  type: Type.SniperRifle,
  damage: 917,
  fireRate: 0.9,
  reloadSpeed: 4.2,
  magazineSize: 6,
  elementalEffect: ElementalEffect.Incendiary,
  elementalChance: 0.3,
  elementalDps: 169.8
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