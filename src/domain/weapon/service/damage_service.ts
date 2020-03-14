import { Weapon } from "../interface/weapon"
import { PlayerDamageService } from "../../player/service/damage_service"
import { Player } from "../../player/interface/player"
import { StatType } from "../../player/value_object/stat_type"
import { Manufacturer } from "../value_object/manufacturer"
import { Type } from "../value_object/type"

export class DamageService {
  private weapon: Weapon
  private playerDamageService: PlayerDamageService

  constructor(weapon: Weapon, player: Player) {
    this.weapon = weapon
    this.playerDamageService = new PlayerDamageService(player)
  }

  public getDps() : number {
    return this.calculateDps(this.getDamage())
  }
  
  public getCritDps() : number {
    return this.calculateDps(this.getCritDamage())
  }

  public getDamage() : number {
    const { damage, pellets } = this.weapon
    let playerWeaponDamage = this.playerDamageService.getStat(StatType.WeaponDamage)

    return damage * pellets * (1 + playerWeaponDamage)
  }

  public getCritDamage() : number {
    let multiplier = this.getWeaponCritMultiplier()
    let baseBonus = this.getWeaponCritBaseBonus()
    let penalty = this.getWeaponCritPenalty()
    let playerCritDamage = this.playerDamageService.getStat(StatType.CritHitDamage)
    return this.getDamage() * multiplier * (1 + baseBonus + playerCritDamage) /  (1 + penalty)
  }

  protected calculateDps(damage: number) : number {
    const { fireRate, magazineSize, ammoPerShot } = this.weapon

    let reloadSpeed = this.getReloadSpeed()
    let clipEffectiveNumberOfShots = magazineSize / ammoPerShot
    let clipSpeed = clipEffectiveNumberOfShots / fireRate
    let totalSpeed = reloadSpeed + clipSpeed
    let totalClipDamage = damage * clipEffectiveNumberOfShots
    return Math.round(totalClipDamage / totalSpeed * 100)/100
  }

  protected getWeaponCritMultiplier() : number {
    const { manufacturer, type } = this.weapon

    let multipliers = {
      [Manufacturer.Jakobs]: {
        [Type.Shotgun]: 2.3,
        [Type.AssaultRifle]: 2.3,
        [Type.Pistol]: 2.3
      }
    }

    let result = multipliers[manufacturer]?.[type]
    return result ?? 2
  }

  protected getWeaponCritBaseBonus() : number {
    const { manufacturer, type } = this.weapon

    if(type === Type.SniperRifle) {
      if(manufacturer === Manufacturer.Jakobs) {
        return 1.6
      }

      return 1
    }

    return 0
  }

  protected getWeaponCritPenalty() : number {
    const { manufacturer, type } = this.weapon

    if(manufacturer === Manufacturer.Jakobs) {
      return 0
    }

    if(type === Type.AssaultRifle) {
      return 0.2
    }

    return 0
  }

  protected getReloadSpeed() : number {
    const { reloadSpeed } = this.weapon

    let playerReloadSpeed = this.playerDamageService.getStat(StatType.ReloadSpeed)
    return reloadSpeed / (1 + playerReloadSpeed)
  }
}