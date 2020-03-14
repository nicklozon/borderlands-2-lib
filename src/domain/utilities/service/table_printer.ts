import { Table } from 'console-table-printer';
import { TargetType } from '../../enemy/value_object/target_type';
import { Player } from '../../player/interface/player';
import { Weapon } from "../../weapon/interface/weapon";
import { DamageService } from '../../weapon/service/damage_service';
import { WeaponSummary } from '../interface/weapon_summary';

export class TablePrinterService {
  private player: Player
  private weapons: Weapon[]

  constructor(player: Player, weapons: Weapon[]) {
    this.player = player
    this.weapons = weapons
  }

  public printWeaponSummary() {
    let tbl = new Table()
    let weaponSummaries = this.getWeaponSummaries()
    tbl.addRows(weaponSummaries)
    tbl.printTable()
  }

  public printCategoryMaximums() {
    let tbl = new Table()
    let weaponSummaries = this.getWeaponSummaries()

    let maxSingleShot = weaponSummaries.sort((a, b) => b.singleShot - a.singleShot)[0]
    tbl.addRow({stat: 'Single Shot', name: maxSingleShot.name, value: maxSingleShot.singleShot})
    let maxCritShot = weaponSummaries.sort((a, b) => b.critShot - a.critShot)[0]
    tbl.addRow({stat: 'Crit Shot', name: maxCritShot.name, value: maxCritShot.critShot})
    let maxDps = weaponSummaries.sort((a, b) => b.dps - a.dps)[0]
    tbl.addRow({stat: 'DPS', name: maxDps.name, value: maxDps.dps})
    let maxCritDps = weaponSummaries.sort((a, b) => b.critDps - a.critDps)[0]
    tbl.addRow({stat: 'Crit DPS', name: maxCritDps.name, value: maxCritDps.critDps})
    let maxFleshDps = weaponSummaries.sort((a, b) => b.fleshDps - a.fleshDps)[0]
    tbl.addRow({stat: 'Flesh DPS', name: maxFleshDps.name, value: maxFleshDps.fleshDps})
    let maxArmorDps = weaponSummaries.sort((a, b) => b.armorDps - a.armorDps)[0]
    tbl.addRow({stat: 'Armor DPS', name: maxArmorDps.name, value: maxArmorDps.armorDps})
    let maxShieldDps = weaponSummaries.sort((a, b) => b.shieldDps - a.shieldDps)[0]
    tbl.addRow({stat: 'Shield DPS', name: maxShieldDps.name, value: maxShieldDps.shieldDps})

    tbl.printTable()
  }

  private getWeaponSummaries() : WeaponSummary[] {
    return this.weapons.map((weapon: Weapon): WeaponSummary => {
      let ds = new DamageService(weapon, this.player)
      return {
        name: weapon.name,
        singleShot: Math.round(ds.getDamage()),
        critShot: Math.round(ds.getCritDamage()),
        dps: ds.getDps(),
        critDps: ds.getCritDps(),
        fleshDps: ds.getTargetTypeDps(TargetType.Flesh),
        armorDps: ds.getTargetTypeDps(TargetType.Armor),
        shieldDps: ds.getTargetTypeDps(TargetType.Shield),
      }
    })
  }
}