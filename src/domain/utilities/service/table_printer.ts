import { Table } from 'console-table-printer';
import { TargetType } from '../../enemy/value_object/target_type';
import { Player } from '../../player/interface/player';
import { Weapon } from "../../weapon/interface/weapon";
import { DamageService } from '../../weapon/service/damage_service';
import { WeaponSummary } from '../interface/weapon_summary';
import { GameModeEnum } from '../../enemy/value_object/elemental_damage_coefficients';

export class TablePrinterService {
  private player: Player
  private weapons: Weapon[]
  private mode: GameModeEnum

  constructor(player: Player, weapons: Weapon[], mode: GameModeEnum = GameModeEnum.NormalMode) {
    this.player = player
    this.weapons = weapons
    this.mode = mode
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
      name: 'Crit DPS Flesh',
      field: 'critDpsFlesh'
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
      let ds = new DamageService(weapon, this.player, this.mode)
      return {
        name: weapon.name,
        type: weapon.type,
        singleShot: Math.round(ds.getDamage()),
        critShot: Math.round(ds.getCritDamage()),
        critShotFlesh: Math.round(ds.getCritDamage(TargetType.Flesh)),
        //critShotArmor: Math.round(ds.getCritDamage(TargetType.Armor)),
        critDpsFlesh: Math.round(ds.getTargetTypeCritDps(TargetType.Flesh)),
        //critDpsArmor: Math.round(ds.getTargetTypeCritDps(TargetType.Armor)),
        dps: Math.round(ds.getDps()),
        critDps: Math.round(ds.getCritDps()),
        fleshShot: Math.round(ds.getDamage(TargetType.Flesh)),
        //armorShot: Math.round(ds.getDamage(TargetType.Armor)),
        //shieldShot: Math.round(ds.getDamage(TargetType.Shield)),
        fleshDps: this.formatDps(ds, TargetType.Flesh),
        armorDps: this.formatDps(ds, TargetType.Armor),
        shieldDps: this.formatDps(ds, TargetType.Shield)
      }
    })
  }

  private formatDps(damageService: DamageService, targetType: TargetType) : string {
    let dps = damageService.getTargetTypeDps(targetType)
    let elementalDps = damageService.getElementalDps(targetType)
    if(elementalDps) return `${dps} (${elementalDps})`
    return  `${dps}`
  }
}