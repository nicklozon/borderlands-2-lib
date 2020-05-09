import { Table } from 'console-table-printer';
import { TargetType } from '../../enemy/value_object/target_type';
import { Weapon } from "../../weapon/interface/weapon";
import { DamageService } from '../../weapon/service/damage_service';
import { WeaponSummary } from '../interface/weapon_summary';
import { Context } from '../../context';

export class TablePrinterService {
  private context: Context
  private weapons: Weapon[]

  constructor(context: Context, weapons: Weapon[]) {
    this.context = context
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
      name: 'DPS',
      field: 'dps'
    },{
      name: 'Crit Shot',
      field: 'critShot'
    },{
      name: 'Crit DPS',
      field: 'critDps'
    },{
      name: 'Flesh Shot',
      field: 'fleshShot'
    },{
      name: 'Flesh DPS',
      field: 'fleshDps'
    },{
      name: 'Flesh Crit Shot',
      field: 'fleshCritShot'
    },{
      name: 'Flesh Crit DPS',
      field: 'fleshCritDps'
    },{
      name: 'Armor Shot',
      field: 'armorShot'
    },{
      name: 'Armor DPS',
      field: 'armorDps'
    },{
      name: 'Armor Crit Shot',
      field: 'armorCritShot'
    },{
      name: 'Armor Crit DPS',
      field: 'armorCritDps'
    },{
      name: 'Shield Shot',
      field: 'shieldShot'
    },{
      name: 'Shield DPS',
      field: 'shieldDps'
    },{
      name: 'Shield Crit Shot',
      field: 'shieldCritShot'
    },{
      name: 'Shield Crit DPS',
      field: 'shieldCritDps'
    }]

    stats.forEach((stat) => {
      let max = weaponSummaries.sort((a, b) => b[stat.field] - a[stat.field])[0]
      tbl.addRow({stat: stat.name, name: max.name, value: max[stat.field]})
    })

    tbl.printTable()
  }

  private getWeaponSummaries(): WeaponSummary[] {
    return this.weapons.map((weapon: Weapon): WeaponSummary => {
      let ds = new DamageService(weapon, this.context)
      return {
        name: weapon.name,
        type: weapon.type,
        //singleShot: Math.round(ds.getDamage()),
        //dps: Math.round(ds.getDps()),
        //critShot: Math.round(ds.getCritDamage()),
        //critDps: Math.round(ds.getCritDps()),
        fleshShot: Math.round(ds.getDamage(TargetType.Flesh)),
        fleshDps: Math.round(ds.getTargetTypeDps(TargetType.Flesh)),
        fleshCritShot: Math.round(ds.getCritDamage(TargetType.Flesh)),
        fleshCritDps: Math.round(ds.getTargetTypeCritDps(TargetType.Flesh)),
        armorShot: Math.round(ds.getDamage(TargetType.Armor)),
        armorDps: Math.round(ds.getTargetTypeDps(TargetType.Armor)),
        armorCritShot: Math.round(ds.getCritDamage(TargetType.Armor)),
        armorCritDps: Math.round(ds.getTargetTypeCritDps(TargetType.Armor)),
        shieldShot: Math.round(ds.getDamage(TargetType.Shield)),
        shieldDps: Math.round(ds.getTargetTypeDps(TargetType.Shield)),
        shieldCritShot: Math.round(ds.getCritDamage(TargetType.Shield)),
        shieldCritDps: Math.round(ds.getTargetTypeCritDps(TargetType.Shield)),
      }
    })
  }

  private formatDps(damageService: DamageService, targetType: TargetType): string {
    let dps = damageService.getTargetTypeDps(targetType)
    let elementalDps = damageService.getElementalDps(targetType)
    if(elementalDps) return `${dps} (${elementalDps})`
    return  `${dps}`
  }
}