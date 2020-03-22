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

    let stats = [{
      name: 'Single Shot',
      field: 'singleShot'
    },{
      name: 'Crit Shot',
      field: 'critShot'
    },{
      name: 'DPS',
      field: 'dps'
    },{
      name: 'Crit DPS',
      field: 'critDps'
    },{
      name: 'Flesh Shot',
      field: 'fleshShot'
    },{
      name: 'Armor Shot',
      field: 'armorShot'
    },{
      name: 'Shield Shot',
      field: 'shieldShot'
    },{
      name: 'Flesh DPS',
      field: 'fleshDps'
    },{
      name: 'Armor DPS',
      field: 'armorDps'
    },{
      name: 'Shield DPS',
      field: 'shieldDps'
    }]

    stats.forEach((stat) => {
      let max = weaponSummaries.sort((a, b) => b[stat.field] - a[stat.field])[0]
      tbl.addRow({stat: stat.name, name: max.name, value: max[stat.field]})
    })

    tbl.printTable()
  }

  private getWeaponSummaries() : WeaponSummary[] {
    return this.weapons.map((weapon: Weapon): WeaponSummary => {
      let ds = new DamageService(weapon, this.player)
      return {
        name: weapon.name,
        type: weapon.type,
        singleShot: Math.round(ds.getDamage()),
        critShot: Math.round(ds.getCritDamage()),
        //dps: ds.getDps(),
        //critDps: ds.getCritDps(),
        fleshShot: Math.round(ds.getDamage(TargetType.Flesh)),
        armorShot: Math.round(ds.getDamage(TargetType.Armor)),
        shieldShot: Math.round(ds.getDamage(TargetType.Shield)),
        fleshDps: `${ds.getTargetTypeDps(TargetType.Flesh)} (${ds.getElementalDps(TargetType.Flesh)})`,
        armorDps: `${ds.getTargetTypeDps(TargetType.Armor)} (${ds.getElementalDps(TargetType.Armor)})`,
        shieldDps: `${ds.getTargetTypeDps(TargetType.Shield)} (${ds.getElementalDps(TargetType.Shield)})`
      }
    })
  }
}