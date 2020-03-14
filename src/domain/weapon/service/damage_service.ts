import { Weapon } from "../interface/weapon"
import { PlayerDamageService } from "../../player/service/damage_service"
import { Player } from "../../player/interface/player"
import { StatType } from "../../player/value_object/stat_type"
import { Manufacturer } from "../value_object/manufacturer"
import { Type } from "../value_object/type"
import { TargetType } from "../../enemy/value_object/target_type"
import { ElementalEffect } from "../value_object/elemental_effect"
import { Stat } from "../../player/interface/stat"

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

  public getTargetTypeDps(targetType: TargetType) {
    return this.calculateDps(this.getDamage(targetType))
  }

  public getDamage(targetType?: TargetType) : number {
    return this.getBaseDamage(targetType) + this.getSplashDamage(targetType)
  }

  protected getBaseDamage(targetType?: TargetType) : number {
    const { damage, pellets, elementalEffect } = this.weapon
    let playerWeaponDamage = this.playerDamageService.getStat(StatType.WeaponDamage)
    // Is this a thing?
    let weaponWeaponDamage = this.getStat(StatType.WeaponDamage)
    let elementalEffectiveness = targetType ? this.getElementalEffectiveness(targetType, elementalEffect) : 1

    return damage * pellets * (1 + playerWeaponDamage + weaponWeaponDamage) * elementalEffectiveness
  }

  public getCritDamage() : number {
    let multiplier = this.getWeaponCritMultiplier()
    let baseBonus = this.getWeaponCritBaseBonus()
    let penalty = this.getWeaponCritPenalty()
    let playerCritDamage = this.playerDamageService.getStat(StatType.CritHitDamage)
    let splashDamage = this.getSplashDamage()

    return this.getBaseDamage() * multiplier * (1 + baseBonus + playerCritDamage) /  (1 + penalty) + splashDamage
  }

  protected calculateDps(damage: number, targetType?: TargetType) : number {
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

    // If the weapon has CritHitDamage property, we just use that since it
    // includes any manufacturer or weapon type specific bonuses
    let weaponCritDamage = this.getStat(StatType.CritHitDamage)
    if(weaponCritDamage) return weaponCritDamage

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

  protected getElementalEffectiveness(targetType: TargetType, elementalEffect?: ElementalEffect) : number {
    if(elementalEffect === undefined) {
      if(targetType === TargetType.Armor) {
        return 0.8
      }
      return 1
    }

    const coefficients = {
      [ElementalEffect.Explosive]: {
        [TargetType.Shield]: 0.8
      },
      [ElementalEffect.Incendiary]: {
        [TargetType.Flesh]: 1.5,
        [TargetType.Armor]: 0.75,
        [TargetType.Shield]: 0.75
      },
      [ElementalEffect.Shock]: {
        [TargetType.Shield]: 2
      },
      [ElementalEffect.Corrosive]: {
        [TargetType.Flesh]: 0.9,
        [TargetType.Armor]: 1.5,
        [TargetType.Shield]: 0.75
      }
    }

    let result = coefficients[elementalEffect]?.[targetType]
    return result ?? 1
  }

  public getSplashDamage(targetType?: TargetType): number {
    return this.getBaseDamage(targetType) * this.getSplashDamageMultiplier()
  }

  protected getSplashDamageMultiplier(): number {
    const { type, dealsBonusElementalDamage } = this.weapon

    if(!dealsBonusElementalDamage) {
      return 0
    }

    if(type === Type.Pistol) {
      return 0.8
    }

    return 0.5
  }

  protected getStat(type: StatType) : number {
    const { stats } = this.weapon

    if(!stats) return 0

    let result: Stat[] = stats.filter((stat: Stat) => stat.type === type)
    return result.reduce((memo: number, stat: Stat) => memo + stat.value, 0)
  }
}