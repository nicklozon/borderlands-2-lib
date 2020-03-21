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
    let playerGunDamage = this.playerDamageService.getStat(StatType.GunDamage, this.weapon)
    // Is this a thing?
    let weaponGunDamage = this.getStat(StatType.GunDamage)
    let elementalEffectiveness = targetType ? this.getElementalEffectiveness(targetType, elementalEffect) : 1

    return damage * pellets * (1 + playerGunDamage + weaponGunDamage) * elementalEffectiveness
  }

  public getCritDamage() : number {
    // Rocket launcher's can't crit
    const { type } = this.weapon
    if(type === Type.RocketLauncher) return 0

    let multiplier = this.getWeaponCritMultiplier()
    let baseBonus = this.getWeaponCritBaseBonus()
    let penalty = this.getWeaponCritPenalty()
    let playerCritDamage = this.playerDamageService.getStat(StatType.CritHitDamage, this.weapon)
    let splashDamage = this.getSplashDamage()

    return this.getBaseDamage() * multiplier * (1 + baseBonus + playerCritDamage) /  (1 + penalty) + splashDamage
  }

  protected calculateDps(damage: number) : number {
    const { ammoPerShot } = this.weapon

    let reloadSpeed = this.getReloadSpeed()
    let fireRate = this.getFireRate()
    let magazineSize = this.getMagazineSize()
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
        [Type.Pistol]: 2.5
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

    let playerReloadSpeed = this.playerDamageService.getStat(StatType.ReloadSpeed, this.weapon)
    return reloadSpeed / (1 + playerReloadSpeed)
  }

  protected getFireRate() : number {
    const { fireRate } = this.weapon

    let playerFireRate = this.playerDamageService.getStat(StatType.FireRate, this.weapon)
    return fireRate * (1 + playerFireRate)
  }

  protected getMagazineSize() : number {
    const { magazineSize } = this.weapon

    let playerMagazineSize = this.playerDamageService.getStat(StatType.MagazineSize, this.weapon)
    return magazineSize / (1 + playerMagazineSize)
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
    // Explosive seems to be exclusively splash damage and additional splash damage is not calculated?
    const { elementalEffect } = this.weapon
    if(elementalEffect === ElementalEffect.Explosive) return 0

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

  protected getStat(statType: StatType) : number {
    const { stats } = this.weapon

    if(!stats) return 0

    let result: Stat[] = stats.filter((stat: Stat) => stat.type === statType)
    return result.reduce((memo: number, stat: Stat) => memo + stat.value, 0)
  }
}